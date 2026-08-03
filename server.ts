import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { getAiAdvisoryReply, analyzePaymentReport } from "./server/services/ai";
import {
  sendAuditBookingEmail,
  sendContactFormEmail,
  sendGenericEmail,
  sendTestEmail,
  isSmtpConfigured,
  getSmtpConfig,
  saveSmtpConfig
} from "./server/services/emailService";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "ChurnFix Advisory API", timestamp: new Date().toISOString() });
  });

  // AI Audit Assistant API (supports /api/gemini/assistant, /api/gemini/audit-assistant, and /api/messages)
  const handleAiAssistant = async (req: express.Request, res: express.Response) => {
    try {
      const result = await getAiAdvisoryReply(req.body || {});
      return res.json(result);
    } catch (error: any) {
      console.error("Error in AI Advisory Assistant route:", error);
      return res.status(500).json({ error: "Failed to process advisory request." });
    }
  };

  app.post("/api/gemini/assistant", handleAiAssistant);
  app.post("/api/gemini/audit-assistant", handleAiAssistant);
  app.post("/api/messages", handleAiAssistant);

  // AI Payment Report Analysis API
  app.post("/api/gemini/analyze-report", async (req: express.Request, res: express.Response) => {
    try {
      const { csvText, companyName } = req.body || {};
      const analysis = await analyzePaymentReport(csvText, companyName);
      return res.json({ analysis });
    } catch (error: any) {
      console.error("Error analyzing report route:", error);
      return res.status(500).json({ error: "Failed to process payment report analysis." });
    }
  });

  // SMTP Status Endpoint
  app.get("/api/smtp/status", (_req, res) => {
    const configured = isSmtpConfigured();
    const config = getSmtpConfig();
    return res.json({
      configured,
      config: {
        host: config.host,
        port: config.port,
        user: config.user,
        encryption: config.encryption,
        fromEmail: config.fromEmail,
        fromName: config.fromName,
        hasPassword: Boolean(config.pass),
      },
    });
  });

  // SMTP Config Save Endpoint
  app.post("/api/smtp/config", async (req, res) => {
    try {
      const { host, port, user, pass, encryption, fromEmail, fromName } = req.body || {};
      if (!host || !user || !pass) {
        return res.status(400).json({
          success: false,
          message: "Host, Username, and Password are required for SMTP setup.",
        });
      }

      const result = await saveSmtpConfig({
        host: String(host).trim(),
        port: Number(port) || 587,
        user: String(user).trim(),
        pass: String(pass),
        encryption: (encryption || "tls") as "tls" | "ssl" | "none",
        fromEmail: String(fromEmail || user).trim(),
        fromName: String(fromName || "ChurnFix Advisory").trim(),
      });

      if (!result.success) {
        return res.status(400).json(result);
      }
      return res.json(result);
    } catch (err: any) {
      console.error("Error saving SMTP config:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "Failed to update SMTP configuration.",
      });
    }
  });

  // SMTP Test Email Endpoint
  app.post("/api/smtp/test", async (req, res) => {
    try {
      const { targetEmail } = req.body || {};
      const recipient = targetEmail || "ashleylalfam001@gmail.com";
      const result = await sendTestEmail(recipient);
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.error || "SMTP test failed.",
        });
      }
      return res.json({
        success: true,
        message: `Test email successfully sent to ${recipient}`,
        messageId: result.messageId,
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: err.message || "Error running SMTP test.",
      });
    }
  });

  // Generic Email Dispatch Endpoint (/api/send-email)
  app.post("/api/send-email", async (req, res) => {
    try {
      const { to, subject, html, text, replyTo } = req.body || {};

      if (!to || !subject || (!html && !text)) {
        return res.status(400).json({
          success: false,
          error: "Missing required parameters: 'to', 'subject', and email content ('html' or 'text').",
        });
      }

      if (!isSmtpConfigured()) {
        return res.status(503).json({
          success: false,
          error: "SMTP server is not configured in environment variables or application settings.",
        });
      }

      const result = await sendGenericEmail({ to, subject, html, text, replyTo });

      if (!result.success) {
        return res.status(502).json({
          success: false,
          error: result.error || "Failed to deliver email via Nodemailer SMTP.",
        });
      }

      return res.json({
        success: true,
        message: "Email successfully dispatched via Nodemailer SMTP.",
        messageId: result.messageId,
      });
    } catch (err: any) {
      console.error("[/api/send-email Error]:", err);
      return res.status(500).json({
        success: false,
        error: "Internal server error processing email dispatch.",
      });
    }
  });

  // Audit Booking endpoint
  app.post("/api/audit-booking", async (req, res) => {
    try {
      const booking = req.body || {};
      const bookingId = `AUD-${Math.floor(100000 + Math.random() * 900000)}`;

      if (!booking.fullName || !booking.email || !booking.companyName) {
        return res.status(400).json({
          success: false,
          message: "Please fill in all required fields: Full Name, Work Email, and Company Name.",
        });
      }

      const smtpConfigured = isSmtpConfigured();
      let emailResult: { success: boolean; messageId?: string; error?: string } = { success: false, error: 'SMTP not configured' };

      if (smtpConfigured) {
        emailResult = await sendAuditBookingEmail(booking);
      }

      if (smtpConfigured && !emailResult.success) {
        return res.status(502).json({
          success: false,
          smtpConfigured: true,
          bookingId,
          error: emailResult.error || "Failed to deliver email via SMTP.",
          message: `Your booking details were saved, but email delivery via SMTP failed (${emailResult.error}). Please retry or verify SMTP credentials.`,
        });
      }

      if (!smtpConfigured) {
        return res.status(503).json({
          success: false,
          smtpConfigured: false,
          bookingId,
          error: "SMTP credentials not configured on server.",
          message: "SMTP email service is not configured. Please configure SMTP in server settings to enable automatic email delivery to ashleylalfam001@gmail.com.",
        });
      }

      return res.json({
        success: true,
        smtpConfigured: true,
        message: "Payment Recovery Audit request submitted and delivered to ashleylalfam001@gmail.com!",
        bookingId,
        receivedData: booking,
      });
    } catch (err: any) {
      console.error("Error in audit booking endpoint:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "An error occurred while processing your audit request.",
      });
    }
  });

  // Contact Us endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = req.body || {};

      if (!contactData.name || !contactData.email || !contactData.message) {
        return res.status(400).json({
          success: false,
          message: "Please complete all required fields: Name, Email, and Message.",
        });
      }

      const smtpConfigured = isSmtpConfigured();
      let emailResult: { success: boolean; messageId?: string; error?: string } = { success: false, error: 'SMTP not configured' };

      if (smtpConfigured) {
        emailResult = await sendContactFormEmail(contactData);
      }

      if (smtpConfigured && !emailResult.success) {
        return res.status(502).json({
          success: false,
          smtpConfigured: true,
          error: emailResult.error || "Failed to deliver email via SMTP.",
          message: `Failed to deliver email via SMTP (${emailResult.error}). Please check SMTP settings or try again.`,
        });
      }

      if (!smtpConfigured) {
        return res.status(503).json({
          success: false,
          smtpConfigured: false,
          error: "SMTP credentials missing.",
          message: "SMTP email delivery is not yet configured on the server. Please complete the SMTP Setup Wizard to enable email delivery to ashleylalfam001@gmail.com.",
        });
      }

      return res.json({
        success: true,
        smtpConfigured: true,
        message: "Your message was sent successfully to ashleylalfam001@gmail.com!",
      });
    } catch (err: any) {
      console.error("Error in contact endpoint:", err);
      return res.status(500).json({
        success: false,
        message: err.message || "An error occurred while sending your contact message.",
      });
    }
  });

  // Vite middleware for development vs Static files for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ChurnFix Advisory Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
