"use client"
import { ArrowRight } from "lucide-react"
import type React from "react"

export default function HeroSection(): React.ReactElement {
  return (
    <div
      className="min-h-screen flex flex-col justify-center px-4 relative overflow-hidden pt-24"
      style={{
        backgroundImage: "url(/hero-background.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Hero Content */}
      <div className="max-w-4xl space-y-8 relative z-10">
        {/* Subheading Badge */}

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Find Your Perfect
            <br />
            <span className="bg-linear-to-r from-violet-400 via-violet-500 to-violet-600 bg-clip-text text-transparent">
              Dev Match
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
            Connect with opportunities that align with your skills, experience, and career aspirations. Let intelligent
            matching algorithms guide your next move.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <button className="px-8 py-3 border border-violet-400/50 text-white  font-semibold rounded-full">
            Developer Matching Platform
          </button>
          <button className="px-8 py-3 bg-linear-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
            Get Started
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Trust Badge */}
        <div className="pt-8">
          <p className="text-white/40 text-sm">Join 10,000+ developers already using DevMatch</p>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-violet-500/50 to-transparent" />
    </div>
  )
}
