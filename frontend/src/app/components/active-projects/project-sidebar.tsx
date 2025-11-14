"use client"

import type React from "react"
import { Search } from 'lucide-react'
import { useState } from "react"

interface Project {
  id: string
  clientName: string
  clientAvatar: string
  lastMessage: string
  unreadCount: number
  timestamp: string
}

// Mock data
const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    clientName: "Sarah Johnson",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "Can you update the dashboard styling?",
    unreadCount: 2,
    timestamp: "2m ago",
  },
  {
    id: "2",
    clientName: "Mike Chen",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    lastMessage: "Thanks for the quick fix!",
    unreadCount: 0,
    timestamp: "1h ago",
  },
  {
    id: "3",
    clientName: "Emma Davis",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    lastMessage: "When can we schedule a call?",
    unreadCount: 1,
    timestamp: "3h ago",
  },
  {
    id: "4",
    clientName: "Alex Rodriguez",
    clientAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    lastMessage: "The API integration looks great",
    unreadCount: 0,
    timestamp: "1d ago",
  },
]

interface ProjectsSidebarProps {
  selectedProjectId: string
  onSelectProject: (id: string) => void
}

export default function ProjectsSidebar({ selectedProjectId, onSelectProject }: ProjectsSidebarProps): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProjects = MOCK_PROJECTS.filter((project) =>
    project.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-violet-500/20">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-violet-500/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
          />
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto">
        {filteredProjects.length > 0 ? (
          <div className="space-y-1 p-2">
            {filteredProjects.map((project) => (
              <button
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-lg transition-all text-left ${
                  selectedProjectId === project.id
                    ? "bg-violet-500/20 border border-violet-500/40"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                {/* Avatar */}
                <img
                  src={project.clientAvatar || "/placeholder.svg"}
                  alt={project.clientName}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white text-sm truncate">{project.clientName}</h3>
                    {project.unreadCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-violet-500 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                        {project.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-xs truncate">{project.lastMessage}</p>
                  <p className="text-white/30 text-xs mt-1">{project.timestamp}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-white/40 text-sm">
            No projects found
          </div>
        )}
      </div>
    </div>
  )
}
