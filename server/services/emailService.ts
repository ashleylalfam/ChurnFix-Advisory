import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export interface SmtpConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  encryption: 'tls' | 'ssl' | 'none';
  fromEmail: string;
  fromName: string;
}

export interface AuditBookingData {
  fullName: string;
  companyName: string;
  email: string;
  phoneNumber?: string;
  website: string;
  subscriptionPlatform?: string;
  mrrRange: string;
  monthlyActiveCustomers?: string;
  currentGateway: string;
  estimatedInvoluntaryChurn: string;
  primaryPainPoint?: string;
  notes?: string;
  dateSubmitted?: string;
  timeSubmitted?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
  dateSubmitted?: string;
  timeSubmitted?: string;
}

const CONFIG_FILE_PATH = path.join(process.cwd(), 'smtp-config.json');

/**
 * Get active SMTP credentials from environment variables or local persistent config
 */
export function getSmtpConfig(): SmtpConfig {
  // Check local file override first
  if (fs.existsSync(CONFIG_FILE_PATH)) {
    try {
      const fileData = fs.readFileSync(CONFIG_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (parsed.host && parsed.user) {
        return {
          host: parsed.host || '',
          port: Number(parsed.port) || 587,
          user: parsed.user || '',
          pass: parsed.pass || '',
          encryption: parsed.encryption || 'tls',
          fromEmail: parsed.fromEmail || 'ashley@churnfix.com',
          fromName: parsed.fromName || 'ChurnFix Advisory',
        };
      }
    } catch (e) {
      console.error('[SMTP Config] Error reading smtp-config.json:', e);
    }
  }

  // Fallback to environment variables
  const encryptionVal = (process.env.SMTP_ENCRYPTION || (process.env.SMTP_SECURE === 'true' ? 'ssl' : 'tls')) as 'tls' | 'ssl' | 'none';
  return {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    encryption: encryptionVal,
    fromEmail: process.env.SMTP_FROM_EMAIL || 'ashley@churnfix.com',
    fromName: process.env.SMTP_FROM_NAME || 'ChurnFix Advisory',
  };
}

/**
 * Save SMTP configuration securely to local persistent file & update runtime env
 */
export async function saveSmtpConfig(config: SmtpConfig): Promise<{ success: boolean; message: string }> {
  try {
    // Validate connection before saving
    const transporter = createTransporterFromConfig(config);
    await transporter.verify();

    // Persist to JSON file
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2), 'utf-8');

    // Update runtime env
    process.env.SMTP_HOST = config.host;
    process.env.SMTP_PORT = String(config.port);
    process.env.SMTP_USER = config.user;
    process.env.SMTP_PASS = config.pass;
    process.env.SMTP_ENCRYPTION = config.encryption;
    process.env.SMTP_FROM_EMAIL = config.fromEmail;
    process.env.SMTP_FROM_NAME = config.fromName;

    return { success: true, message: 'SMTP configuration validated and saved successfully.' };
  } catch (err: any) {
    console.error('[SMTP Verification Error]:', err);
    return {
      success: false,
      message: `Failed to connect to SMTP server: ${err.message || 'Invalid credentials or host timeout'}`,
    };
  }
}

/**
 * Check if SMTP credentials are provided
 */
export function isSmtpConfigured(): boolean {
  const config = getSmtpConfig();
  return Boolean(config.host && config.user && config.pass);
}

/**
 * Helper to build Nodemailer Transporter
 */
function createTransporterFromConfig(config: SmtpConfig) {
  const isSecure = config.encryption === 'ssl' || config.port === 465;
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: isSecure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents self-signed cert issues
    },
  });
}

export function getTransporter() {
  const config = getSmtpConfig();
  if (!config.host || !config.user || !config.pass) {
    throw new Error('SMTP_NOT_CONFIGURED: SMTP credentials are missing. Please complete the SMTP setup wizard.');
  }
  return createTransporterFromConfig(config);
}

const DESTINATION_EMAIL = 'ashleylalfam001@gmail.com';

/**
 * Send HTML Email for "Book a Free Payment Audit"
 */
export async function sendAuditBookingEmail(data: AuditBookingData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getTransporter();
    const config = getSmtpConfig();

    const now = new Date();
    const dateStr = data.dateSubmitted || now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = data.timeSubmitted || now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Payment Recovery Audit Booking</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #020617; padding: 28px 32px; border-bottom: 3px solid #10b981;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">ChurnFix <span style="color: #34d399;">Advisory</span></span>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">Incoming Free Payment Audit Request</p>
                  </td>
                  <td align="right">
                    <span style="background-color: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 20px; font-family: monospace;">
                      3x ROI Guaranteed
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 8px 0; font-size: 22px; font-weight: 800; color: #0f172a;">New Audit Booking Submitted</h2>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                A new client has requested a Payment Recovery Audit for <strong>${escapeHtml(data.companyName)}</strong>. Details are below:
              </p>

              <!-- Client Info Table -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                <tr style="background-color: #f8fafc;">
                  <td colspan="2" style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #020617; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0;">
                    Client & Contact Information
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; width: 40%; border-bottom: 1px solid #f1f5f9;">Full Name:</td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.fullName)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Company Name:</td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.companyName)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Work Email:</td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #2563eb; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(data.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Phone Number:</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.phoneNumber || 'Not provided')}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Website URL:</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #2563eb;"><a href="${formatUrl(data.website)}" target="_blank" style="color: #2563eb; text-decoration: none;">${escapeHtml(data.website)}</a></td>
                </tr>
              </table>

              <!-- Payment & Revenue Metrics Table -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                <tr style="background-color: #f8fafc;">
                  <td colspan="2" style="padding: 12px 16px; font-size: 12px; font-weight: 700; color: #020617; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0;">
                    Payment Architecture & Revenue Metrics
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; width: 40%; border-bottom: 1px solid #f1f5f9;">Monthly Recurring Revenue (MRR):</td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #059669; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.mrrRange)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Monthly Active Customers:</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.monthlyActiveCustomers || 'Not specified')}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Payment Processor / Gateway:</td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.currentGateway)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Subscription Platform:</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.subscriptionPlatform || data.currentGateway)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Current Churn Rate:</td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #dc2626; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.estimatedInvoluntaryChurn)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Primary Recovery Goal / Pain Point:</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #0f172a;">${escapeHtml(data.primaryPainPoint || 'General payment recovery audit')}</td>
                </tr>
              </table>

              ${data.notes ? `
              <!-- Additional Notes -->
              <div style="margin-bottom: 24px; padding: 16px; background-color: #f1f5f9; border-left: 4px solid #10b981; border-radius: 8px;">
                <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Additional Notes from Client:</p>
                <p style="margin: 0; font-size: 13px; color: #1e293b; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(data.notes)}</p>
              </div>
              ` : ''}

              <!-- Meta Footer -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="border-t: 1px solid #e2e8f0; pt: 16px; font-size: 12px; color: #94a3b8; font-family: monospace;">
                <tr>
                  <td>Submitted Date: <strong>${dateStr}</strong></td>
                  <td align="right">Submitted Time: <strong>${timeStr}</strong></td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b;">
              This notification was generated automatically by <strong>ChurnFix Advisory Platform</strong>.<br>
              Direct contact: <a href="mailto:ashleylalfam001@gmail.com" style="color: #2563eb; text-decoration: none;">ashleylalfam001@gmail.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const mailOptions = {
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: DESTINATION_EMAIL,
      replyTo: data.email,
      subject: `[Audit Request] New Payment Recovery Audit - ${data.companyName}`,
      html: htmlContent,
      text: `New Payment Recovery Audit Booking from ${data.fullName} (${data.companyName}):
Work Email: ${data.email}
Phone: ${data.phoneNumber || 'N/A'}
Website: ${data.website}
MRR: ${data.mrrRange}
Gateway: ${data.currentGateway}
Churn Rate: ${data.estimatedInvoluntaryChurn}
Submitted: ${dateStr} at ${timeStr}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[SMTP] Audit Booking email delivered successfully. Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('[SMTP Error] Failed to send audit booking email:', error);
    return { success: false, error: error.message || 'Failed to dispatch email via SMTP' };
  }
}

/**
 * Send HTML Email for "Contact Us" Form
 */
export async function sendContactFormEmail(data: ContactFormData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getTransporter();
    const config = getSmtpConfig();

    const now = new Date();
    const dateStr = data.dateSubmitted || now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const timeStr = data.timeSubmitted || now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message - ChurnFix Advisory</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #334155;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background-color: #020617; padding: 28px 32px; border-bottom: 3px solid #38bdf8;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">ChurnFix <span style="color: #38bdf8;">Advisory</span></span>
                    <p style="margin: 4px 0 0 0; font-size: 11px; color: #94a3b8; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">Incoming Direct Contact Message</p>
                  </td>
                  <td align="right">
                    <span style="background-color: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 20px; font-family: monospace;">
                      Founder Inbox
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 32px;">
              <h2 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 800; color: #0f172a;">New Message from ${escapeHtml(data.name)}</h2>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #64748b; line-height: 1.5;">
                You have received a direct inquiry via the ChurnFix Advisory contact form.
              </p>

              <!-- User Info Table -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                <tr style="background-color: #f8fafc;">
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; width: 35%; border-bottom: 1px solid #f1f5f9;">Sender Name:</td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.name)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Email Address:</td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #2563eb; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(data.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b; border-bottom: 1px solid #f1f5f9;">Company / Website:</td>
                  <td style="padding: 12px 16px; font-size: 13px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${escapeHtml(data.company || 'Not specified')}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 600; color: #64748b;">Subject:</td>
                  <td style="padding: 12px 16px; font-size: 13px; font-weight: 700; color: #0f172a;">${escapeHtml(data.subject || 'General Advisory Inquiry')}</td>
                </tr>
              </table>

              <!-- Message Content -->
              <div style="margin-bottom: 24px; padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
                <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Message Body:</p>
                <div style="font-size: 14px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
              </div>

              <!-- Meta Footer -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 12px; color: #94a3b8; font-family: monospace;">
                <tr>
                  <td>Date: <strong>${dateStr}</strong></td>
                  <td align="right">Time: <strong>${timeStr}</strong></td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 32px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b;">
              ChurnFix Advisory Contact Integration • Delivered to <a href="mailto:ashleylalfam001@gmail.com" style="color: #2563eb; text-decoration: none;">ashleylalfam001@gmail.com</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const mailOptions = {
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: DESTINATION_EMAIL,
      replyTo: data.email,
      subject: `[Contact Form] ${data.subject || 'New Message'} from ${data.name}`,
      html: htmlContent,
      text: `New Contact Form Message from ${data.name} (${data.email}):
Company: ${data.company || 'N/A'}
Subject: ${data.subject || 'General Inquiry'}
Message:
${data.message}

Submitted: ${dateStr} at ${timeStr}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[SMTP] Contact form email delivered successfully. Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error('[SMTP Error] Failed to send contact form email:', error);
    return { success: false, error: error.message || 'Failed to dispatch email via SMTP' };
  }
}

export interface GenericEmailData {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
}

/**
 * Send Generic Email utilizing Nodemailer and validating SMTP configuration
 */
export async function sendGenericEmail(data: GenericEmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!isSmtpConfigured()) {
      return {
        success: false,
        error: 'SMTP credentials are not configured in environment variables or application settings.',
      };
    }

    if (!data.to || !data.subject || (!data.html && !data.text)) {
      return {
        success: false,
        error: 'Missing required parameters: "to", "subject", and email content ("html" or "text").',
      };
    }

    const transporter = getTransporter();
    const config = getSmtpConfig();

    const mailOptions = {
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: data.to,
      replyTo: data.replyTo,
      subject: data.subject,
      html: data.html,
      text: data.text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('[SMTP] Generic email delivered successfully. Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error('[SMTP Error] Failed to send generic email:', err);

    // Ensure credentials are redacted from error output sent to client
    const rawError = err.message || 'Failed to dispatch email via Nodemailer';
    const smtpConfig = getSmtpConfig();
    let sanitizedError = rawError;
    if (smtpConfig.pass) {
      sanitizedError = sanitizedError.replace(new RegExp(smtpConfig.pass, 'g'), '*****');
    }
    if (process.env.SMTP_PASS) {
      sanitizedError = sanitizedError.replace(new RegExp(process.env.SMTP_PASS, 'g'), '*****');
    }

    return {
      success: false,
      error: sanitizedError,
    };
  }
}

/**
 * Send Test Email to verify SMTP configuration
 */
export async function sendTestEmail(targetEmail: string = DESTINATION_EMAIL): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const transporter = getTransporter();
    const config = getSmtpConfig();

    const info = await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: targetEmail,
      subject: `[SMTP Test] ChurnFix Advisory Integration Verification`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
          <h2 style="color: #059669; margin-top: 0;">✅ SMTP Integration Operational!</h2>
          <p style="color: #334155;">This test email confirms that your SMTP server is correctly configured and ready to deliver incoming form submissions.</p>
          <ul style="color: #475569; font-size: 13px;">
            <li><strong>SMTP Host:</strong> ${config.host}</li>
            <li><strong>Port:</strong> ${config.port} (${config.encryption})</li>
            <li><strong>Sender:</strong> ${config.fromName} (${config.fromEmail})</li>
            <li><strong>Target Inbox:</strong> ${targetEmail}</li>
          </ul>
        </div>
      `,
    });

    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    return { success: false, error: err.message || 'SMTP test failed' };
  }
}

function escapeHtml(str?: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatUrl(url?: string): string {
  if (!url) return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return escapeHtml(url);
  }
  return `https://${escapeHtml(url)}`;
}
