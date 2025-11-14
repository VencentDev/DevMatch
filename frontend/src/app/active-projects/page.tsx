"use client"

import { useState } from "react"
import { Menu, X } from 'lucide-react'
import AccountHeader from "../components/account-header"
import ProjectsSidebar from "../components/active-projects/project-sidebar"
import ChatWindow from "../components/active-projects/chat-window"
import ProjectDetails from "../components/active-projects/project-details"

export default function ActiveProjectsPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("1")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      <AccountHeader />

      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="h-[calc(100vh-120px)] flex gap-0">
          {/* Left Column - Projects Sidebar */}
          <div
            className={`fixed left-0 top-20 bottom-0 w-80 lg:relative lg:w-72 lg:top-auto bg-black border-r border-violet-500/20 flex flex-col z-40 transition-transform duration-300 ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          >
            <ProjectsSidebar selectedProjectId={selectedProjectId} onSelectProject={(id) => {
              setSelectedProjectId(id)
              setSidebarOpen(false)
            }} />
          </div>

          {/* Mobile toggle button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-32 left-4 z-50 w-12 h-12 rounded-full bg-violet-500 hover:bg-violet-600 text-white flex items-center justify-center transition-all"
            aria-label="Toggle projects menu"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
              aria-hidden="true"
            />
          )}

          {/* Middle Column - Chat Window */}
          <div className="flex-1 min-w-0 border-r border-violet-500/20 flex flex-col">
            <ChatWindow projectId={selectedProjectId} />
          </div>

          {/* Right Column - Project Details */}
          <div className="w-80 hidden lg:flex flex-col border-l border-violet-500/20 overflow-y-auto">
            <ProjectDetails projectId={selectedProjectId} />
          </div>
        </div>
      </main>
    </div>
  )
}
