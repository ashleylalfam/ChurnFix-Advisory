import React, { useState } from 'react';
import { Calendar, Clock, Video, CheckCircle2, ShieldCheck, User } from 'lucide-react';

export const ScheduleMeetingView: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2026-08-05');
  const [selectedTime, setSelectedTime] = useState('14:00 EST');
  const [confirmed, setConfirmed] = useState(false);

  const availableSlots = [
    '09:00 EST', '10:30 EST', '13:00 EST', '14:00 EST', '15:30 EST', '17:00 EST'
  ];

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
          <Calendar className="w-3.5 h-3.5" />
          Direct Strategy Session
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Schedule 60-Min Strategy Review</h2>
        <p className="text-slate-500 text-xs mt-1">
          Select a date and time to review your audit findings, retry logic parameters, and dunning sequences directly with Ashley Lalfam.
        </p>
      </div>

      {confirmed ? (
        <div className="text-center py-12 space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto border border-blue-200">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Strategy Meeting Confirmed!</h3>
          <p className="text-slate-600 text-xs max-w-md mx-auto leading-relaxed">
            Meeting scheduled for <strong className="text-blue-700">{selectedDate} at {selectedTime}</strong> with Founder Ashley Lalfam. Google Meet video link sent to your work email.
          </p>
          <button
            onClick={() => setConfirmed(false)}
            className="mt-2 px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-xs"
          >
            Reschedule Meeting
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Calendar Date Picker */}
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              1. Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-600" />
                Meeting Host & Agenda
              </div>
              <p>• Lead Host: Ashley Lalfam (Founder)</p>
              <p>• Review gateway decline codes</p>
              <p>• Finalize exponential retry parameters</p>
            </div>
          </div>

          {/* Time Slot Picker */}
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              2. Select Time (EST)
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {availableSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-3 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedTime === time
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-blue-50/30'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              onClick={handleConfirm}
              className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer mt-4"
            >
              Confirm Meeting on {selectedDate} at {selectedTime}
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
