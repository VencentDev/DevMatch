"use client"

import type React from "react"
import { useState } from "react"
import { Send, Plus } from "lucide-react"

interface Message {
	id: string
	sender: "user" | "client"
	content: string
	timestamp: string
	senderName: string
}

interface ChatWindowProps {
	projectId: string
}

// Mock messages for different projects
const MOCK_MESSAGES: Record<string, Message[]> = {
	"1": [
		{
			id: "1",
			sender: "client",
			content: "Hi! I wanted to discuss the new dashboard design",
			timestamp: "10:30 AM",
			senderName: "Sarah Johnson",
		},
		{
			id: "2",
			sender: "user",
			content:
				"I've started working on the styling updates. Should have something to show by tomorrow.",
			timestamp: "10:35 AM",
			senderName: "You",
		},
		{
			id: "3",
			sender: "client",
			content: "Great! Can you update the dashboard styling?",
			timestamp: "11:00 AM",
			senderName: "Sarah Johnson",
		},
		{
			id: "4",
			sender: "user",
			content: "Absolutely, I'll prioritize that today.",
			timestamp: "11:05 AM",
			senderName: "You",
		},
	],
	"2": [
		{
			id: "1",
			sender: "client",
			content: "Thanks for fixing the API issue so quickly!",
			timestamp: "2:30 PM",
			senderName: "Mike Chen",
		},
		{
			id: "2",
			sender: "user",
			content:
				"No problem! It was a quick fix. Let me know if you need anything else.",
			timestamp: "2:35 PM",
			senderName: "You",
		},
		{
			id: "3",
			sender: "client",
			content: "Thanks for the quick fix!",
			timestamp: "2:40 PM",
			senderName: "Mike Chen",
		},
	],
	"3": [
		{
			id: "1",
			sender: "client",
			content: "When can we schedule a call?",
			timestamp: "3:15 PM",
			senderName: "Emma Davis",
		},
	],
	"4": [
		{
			id: "1",
			sender: "client",
			content: "The API integration looks great",
			timestamp: "Yesterday",
			senderName: "Alex Rodriguez",
		},
	],
}

export default function ChatWindow({
	projectId,
}: ChatWindowProps): React.ReactElement {
	const [messageInput, setMessageInput] = useState("")
	const messages = MOCK_MESSAGES[projectId] || []

	const handleSendMessage = () => {
		if (messageInput.trim()) {
			// Handle sending message
			setMessageInput("")
		}
	}

	return (
		<div className="flex flex-col h-full">
			{/* Messages Container */}
			<div className="flex-1 overflow-y-auto p-6 space-y-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.sender === "user" ? "justify-end" : "justify-start"
						}`}
					>
						<div
							className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
								message.sender === "user"
									? "bg-violet-500/20 border border-violet-500/40 text-white"
									: "bg-white/5 border border-white/10 text-white"
							}`}
						>
							<p className="text-sm">{message.content}</p>
							<p
								className={`text-xs mt-2 ${
									message.sender === "user"
										? "text-violet-300/60"
										: "text-white/40"
								}`}
							>
								{message.timestamp}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Message Input */}
			<div className="border-t border-violet-500/20 p-4 space-y-4">
				<div className="flex gap-3">
					{/* Attach File Button */}
					<button className="shrink-0 w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 text-violet-400 flex items-center justify-center transition-colors border border-violet-500/20 hover:border-violet-500/40">
						<Plus size={20} />
					</button>

					{/* Message Input */}
					<input
						type="text"
						value={messageInput}
						onChange={(e) => setMessageInput(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
						placeholder="Type your message..."
						className="w-full max-w-xs sm:max-w-md md:max-w-lg flex-1 bg-white/5 border border-violet-500/20 rounded-lg px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
					/>

					{/* Send Button */}
					<button
						onClick={handleSendMessage}
						className="shrink-0 w-10 h-10 rounded-lg bg-violet-500 hover:bg-violet-600 text-white flex items-center justify-center transition-colors"
					>
						<Send size={20} />
					</button>
				</div>
			</div>
		</div>
	)
}
