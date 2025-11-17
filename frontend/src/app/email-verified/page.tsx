import { CheckCircle2 } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        {/* Large Check Circle Icon */}
        <div className="relative">
          <CheckCircle2 
            className="w-32 h-32"
            strokeWidth={1.5}
            style={{ color: 'oklch(0.704 0.089 263.902)' }}
          />
          {/* Subtle glow effect */}
          <div className="absolute inset-0 blur-2xl opacity-30" style={{ backgroundColor: 'oklch(0.704 0.089 263.902)' }} />
        </div>

        {/* Success Message */}
        <div className="space-y-3">
          <h1 style={{ color: 'oklch(0.704 0.089 263.902)' }}>
            Email Verified Successfully
          </h1>
          <p style={{ color: 'oklch(0.704 0.089 263.902)' }}>
            Your email address has been verified. You can now access all features of your account.
          </p>
        </div>

        {/* Optional Action Button */}
        <button className="mt-4 px-8 py-3 text-white rounded-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: 'oklch(0.704 0.089 263.902)' }}>
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}