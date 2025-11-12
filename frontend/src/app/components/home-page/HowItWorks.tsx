"use client"

import type React from "react"

import { useState } from "react"
import { Briefcase, FileText, CreditCard, FolderOpen, Users, CheckCircle } from "lucide-react"

interface WorkCard {
  icon: React.ReactNode
  title: string
  description: string
}

const freelancerSteps: WorkCard[] = [
  {
    icon: <Briefcase className="w-12 h-12 text-violet-400" />,
    title: "Create Your Profile",
    description:
      "Build a compelling profile showcasing your skills, experience, and portfolio. Browse curated projects aligned with your expertise and career goals.",
  },
  {
    icon: <FileText className="w-12 h-12 text-violet-400" />,
    title: "Submit Winning Proposals",
    description:
      "Craft tailored proposals that highlight your unique value. Stand out from competition with a clear roadmap and competitive pricing strategy.",
  },
  {
    icon: <CreditCard className="w-12 h-12 text-violet-400" />,
    title: "Get Paid Seamlessly",
    description:
      "Receive secure payments upon project completion. Build long-term relationships with satisfied clients and grow your freelance business.",
  },
]

const clientSteps: WorkCard[] = [
  {
    icon: <FolderOpen className="w-12 h-12 text-violet-400" />,
    title: "Post & Browse Talent",
    description:
      "List your project with detailed requirements and filter applications by matching skills. Find the perfect freelancer for your specific needs instantly.",
  },
  {
    icon: <Users className="w-12 h-12 text-violet-400" />,
    title: "Review & Hire",
    description:
      "Compare proposals, review portfolios, and conduct interviews. Make confident hiring decisions based on real expertise and proven track records.",
  },
  {
    icon: <CheckCircle className="w-12 h-12 text-violet-400" />,
    title: "Pay Upon Completion",
    description:
      "Release payment only when work is delivered to your satisfaction. Ensure quality and maintain full control throughout the project lifecycle.",
  },
]

export default function HowItWorks(): React.ReactElement {
  const [isFreelancer, setIsFreelancer] = useState(true)
  const steps = isFreelancer ? freelancerSteps : clientSteps

  return (
    <section className="py-4 px-4 md:px-8 lg:px-16 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 text-lg">Simple, transparent, and fair for everyone</p>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center mb-16">
          <div className="relative inline-flex bg-white/10 backdrop-blur-md p-1 rounded-full border border-violet-500/30 hover:border-violet-500/60 transition-colors">
            <button
              onClick={() => setIsFreelancer(true)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                isFreelancer
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/50"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Freelancers
            </button>
            <button
              onClick={() => setIsFreelancer(false)}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                !isFreelancer
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-600/50"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Clients
            </button>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative animate-fade-in"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s backwards`,
              }}
            >
              {/* Card */}
              <div className="relative h-full bg-linear-to-br from-white/5 to-white/0 backdrop-blur-md border border-violet-500/20 rounded-2xl p-8 hover:border-violet-500/50 transition-all duration-300 overflow-hidden">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-linear-to-br from-violet-600/0 to-violet-600/0 group-hover:from-violet-600/10 group-hover:to-violet-600/5 transition-all duration-300 rounded-2xl" />

                {/* Step number */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center">
                  <span className="text-violet-300 font-bold">{index + 1}</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon container */}
                  <div className="mb-6 p-4 bg-violet-600/10 rounded-xl w-fit group-hover:bg-violet-600/20 transition-colors duration-300">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Left border animation on hover */}
                  <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-violet-400 to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 rounded-full" />
                </div>
              </div>

              {/* Connector line (except last card) */}
              {index < 2 && (
                <div className="hidden md:block absolute -right-4 top-1/2 w-8 h-0.5 bg-linear-to-r from-violet-600/50 to-transparent transform -translate-y-1/2 translate-x-full" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
