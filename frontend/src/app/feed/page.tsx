"use client"

import { useState, useEffect } from "react"
import FeedHeader from "@/app/components/feed/feed-header"
import ProjectCard from "@/app/components/feed/project-card"

const MOCK_PROJECTS = [
  {
    id: "1",
    title: "Build a React Dashboard with Real-time Analytics",
    description: "Need a modern dashboard component with real-time data visualization and interactive charts.",
    budget: "$1,500 - $2,500",
    skills: ["React", "TypeScript", "Chart.js", "Tailwind CSS"],
    deadline: "Due in 2 weeks",
    postedBy: "TechStartup Inc.",
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    description: "Looking for a talented designer to create beautiful and intuitive mobile app designs.",
    budget: "$800 - $1,200",
    skills: ["Figma", "UI Design", "UX Research", "Mobile Design"],
    deadline: "Due in 3 weeks",
    postedBy: "Digital Agency",
  },
  {
    id: "3",
    title: "Backend API Development with Node.js",
    description: "Develop a scalable REST API for our e-commerce platform with authentication and payment integration.",
    budget: "$2,000 - $3,500",
    skills: ["Node.js", "Express", "MongoDB", "AWS"],
    deadline: "Due in 1 month",
    postedBy: "E-commerce Co.",
  },
  {
    id: "4",
    title: "Next.js Website Redesign",
    description: "Redesign our company website with modern best practices and improved SEO optimization.",
    budget: "$1,200 - $2,000",
    skills: ["Next.js", "React", "SEO", "Performance Optimization"],
    deadline: "Due in 2 weeks",
    postedBy: "Consulting Firm",
  },
  {
    id: "5",
    title: "Database Optimization and Migration",
    description: "Optimize and migrate our legacy database system to a modern cloud-based solution.",
    budget: "$3,000 - $5,000",
    skills: ["PostgreSQL", "AWS", "Database Design", "DevOps"],
    deadline: "Due in 1 month",
    postedBy: "Enterprise Solutions",
  },
  {
    id: "6",
    title: "Full Stack Chat Application",
    description: "Create a real-time chat application with user authentication and message storage.",
    budget: "$2,500 - $4,000",
    skills: ["React", "Node.js", "Socket.io", "MongoDB"],
    deadline: "Due in 3 weeks",
    postedBy: "SaaS Startup",
  },
]

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("best-matches")
  const [projects] = useState(MOCK_PROJECTS)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setIsVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const filteredProjects = activeTab === "best-matches" ? projects.slice(0, 3) : projects

  return (
    <main className="bg-black text-white min-h-screen">
      <FeedHeader />

      {/* Main Content */}
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-2">Available Projects</h1>
            <p className="text-white/60">Find projects that match your skills and expertise</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 border-b border-white/10">
            <button
              onClick={() => setActiveTab("best-matches")}
              className={`px-4 py-3 font-medium transition-all border-b-2 ${
                activeTab === "best-matches"
                  ? "text-violet-400 border-b-violet-500"
                  : "text-white/60 border-b-transparent hover:text-white/80"
              }`}
            >
              Best Matches
            </button>
            <button
              onClick={() => setActiveTab("most-recent")}
              className={`px-4 py-3 font-medium transition-all border-b-2 ${
                activeTab === "most-recent"
                  ? "text-violet-400 border-b-violet-500"
                  : "text-white/60 border-b-transparent hover:text-white/80"
              }`}
            >
              Most Recent
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                style={{
                  animation: isVisible ? `fadeInUp 0.5s ease-out ${idx * 0.1}s forwards` : "none",
                  opacity: 0,
                }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60">No projects found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        :global(.animate-fade-in) {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  )
}
