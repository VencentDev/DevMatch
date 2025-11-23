"use client"

import type React from "react"
import { useState } from "react"
import { Send, Plus } from "lucide-react"
import ReviewModal from "./review-modal"

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
		{
			id: "5",
			sender: "user",
			content: "Absolutely, asdasd",
			timestamp: "11:05 AM",
			senderName: "You",
		},
		{
			id: "6",
			sender: "client",
			content: "Absolutely, asdasd",
			timestamp: "11:05 AM",
			senderName: "Sarah Johnson",
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

// Mock project data with status
const MOCK_PROJECTS: Record<
	string,
	{ clientName: string; budget: number; deadline: string; status: string }
> = {
	"1": {
		clientName: "Sarah Johnson",
		budget: 2500,
		deadline: "2024-12-25",
		status: "In Progress",
	},
	"2": {
		clientName: "Mike Chen",
		budget: 1800,
		deadline: "2024-12-15",
		status: "Rate/Review",
	},
	"3": {
		clientName: "Emma Davis",
		budget: 1500,
		deadline: "2024-12-20",
		status: "Completed",
	},
	"4": {
		clientName: "Alex Rodriguez",
		budget: 5000,
		deadline: "2025-01-15",
		status: "In Progress",
	},
}

export default function ChatWindow({
	projectId,
}: ChatWindowProps): React.ReactElement {
	const [messageInput, setMessageInput] = useState("")
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
	const messages = MOCK_MESSAGES[projectId] || []
	const project = MOCK_PROJECTS[projectId]

	const handleReviewSubmit = (rating: number, comment: string) => {
		console.log("Review submitted:", { rating, comment })
		setIsReviewModalOpen(false)
		// Handle review submission here
	}

	const handleSendMessage = () => {
		if (messageInput.trim()) {
			// Handle sending message
			setMessageInput("")
		}
	}

	const formatBudget = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount)
	}

	const formatDeadline = (date: string) => {
		return new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		})
	}

	const isReadOnly = project?.status === "Rate/Review"
	const isCompleted = project?.status === "Completed"

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="p-4 border-b border-violet-500/20 bg-black/80 flex items-center justify-between">
				{/* Client Name */}
				<h2 className="text-lg font-bold text-white">{project.clientName}</h2>

				{/* Budget and Deadline (visible only on small screens) */}
				<div className="lg:hidden text-sm text-white/60 sm:flex sm:gap-4">
					<p className="text-green-500">
						Budget: {formatBudget(project.budget)}
					</p>
					<p className="text-yellow-500">
						Deadline: {formatDeadline(project.deadline)}
					</p>
				</div>
			</div>

			{/* Messages Container */}
			<div className="flex-1 overflow-y-auto p-6 space-y-4">
				{isReadOnly && (
					<div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-sm">
						<div className="bg-black/95 border border-violet-500/30 rounded-sm p-6 text-center space-y-4 max-w-sm">
							<p className="text-white/60 text-sm">
								Congratulations on Finishing your project! Please provide your
								review and feedback below.
							</p>
							<button
								onClick={() => setIsReviewModalOpen(true)}
								className="px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-sm transition-colors font-medium"
							>
								Leave a Review
							</button>
						</div>
					</div>
				)}
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.sender === "user" ? "justify-end" : "justify-start"
						}`}
					>
						<div
							className={`max-w-xs lg:max-w-md px-4 py-3 rounded-sm ${
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

			{/* Message Input Section */}
			<div className="border-t border-violet-500/20 p-4 space-y-4">
				{isCompleted ? (
					// Completion reminder for completed projects
					<div className="bg-linear-to-r from-green-500/10 to-green-500/5 border border-green-500/30 rounded-sm p-4 space-y-2">
						<p className="text-sm font-semibold text-green-300">
							Conversation Completion Notice
						</p>
						<p className="text-xs text-green-200/70">
							This project is completed. The conversation history will be
							automatically deleted after 30 days from the completion date.
						</p>
					</div>
				) : isReadOnly ? (
					// Review prompt for Rate/Review status
					<div className="bg-linear-to-r from-violet-500/10 to-violet-500/5 border border-violet-500/30 rounded-sm p-4 space-y-3">
						<p className="text-sm font-semibold text-violet-300">
							Share Your Feedback
						</p>
						<p className="text-xs text-violet-200/70">
							Help us improve by rating your experience and providing
							constructive feedback.
						</p>
					</div>
				) : (
					// Normal message input for In Progress status
					<>
						<div className="flex gap-3">
							{/* Attach File Button */}
							<button className="shrink-0 w-10 h-10 rounded-sm bg-white/5 hover:bg-white/10 text-violet-400 flex items-center justify-center transition-colors border border-violet-500/20 hover:border-violet-500/40">
								<Plus size={20} />
							</button>

							{/* Message Input */}
							<input
								type="text"
								value={messageInput}
								onChange={(e) => setMessageInput(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
								placeholder="Type your message..."
								className="w-full max-w-xs sm:max-w-md md:max-w-lg flex-1 bg-white/5 border border-violet-500/20 rounded-sm px-4 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
							/>

							{/* Send Button */}
							<button
								onClick={handleSendMessage}
								className="shrink-0 w-10 h-10 rounded-sm bg-violet-500 hover:bg-violet-600 text-white flex items-center justify-center transition-colors"
							>
								<Send size={20} />
							</button>
						</div>
					</>
				)}
			</div>

			{/* Review Modal */}
			<ReviewModal
				clientName={project?.clientName || "Client"}
				isOpen={isReviewModalOpen}
				onClose={() => setIsReviewModalOpen(false)}
				onSubmit={handleReviewSubmit}
			/>
		</div>
	)
}
