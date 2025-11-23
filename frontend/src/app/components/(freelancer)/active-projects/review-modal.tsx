"use client"

import type React from "react"
import { useState } from "react"
import { X, Star } from "lucide-react"

interface ReviewModalProps {
	clientName: string
	isOpen: boolean
	onClose: () => void
	onSubmit: (rating: number, comment: string) => void
}

export default function ReviewModal({
	clientName,
	isOpen,
	onClose,
	onSubmit,
}: ReviewModalProps): React.ReactElement | null {
	const [rating, setRating] = useState(0)
	const [hoveredRating, setHoveredRating] = useState(0)
	const [comment, setComment] = useState("")

	const handleSubmit = () => {
		if (rating > 0) {
			onSubmit(rating, comment)
			setRating(0)
			setComment("")
		}
	}

	if (!isOpen) return null

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
			<div className="bg-linear-to-b from-white/10 to-white/5 border border-violet-500/30 rounded-xl max-w-md w-full p-6 space-y-6">
				{/* Header */}
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-bold text-white">Review {clientName}</h2>
					<button
						onClick={onClose}
						className="p-1 hover:bg-white/10 rounded-lg transition-colors"
						aria-label="Close modal"
					>
						<X
							size={20}
							className="text-white/60"
						/>
					</button>
				</div>

				{/* Rating Section */}
				<div className="space-y-3">
					<label className="block text-sm font-semibold text-white">
						How would you rate this project?
					</label>
					<div className="flex gap-3 justify-center">
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								onClick={() => setRating(star)}
								onMouseEnter={() => setHoveredRating(star)}
								onMouseLeave={() => setHoveredRating(0)}
								className="transition-transform hover:scale-110"
								aria-label={`Rate ${star} stars`}
							>
								<Star
									size={32}
									className={`transition-colors ${
										star <= (hoveredRating || rating)
											? "fill-yellow-400 text-yellow-400"
											: "text-white/30"
									}`}
								/>
							</button>
						))}
					</div>
					{rating > 0 && (
						<p className="text-center text-sm text-violet-300">
							{rating} out of 5 stars
						</p>
					)}
				</div>

				{/* Comment Section */}
				<div className="space-y-2">
					<label className="block text-sm font-semibold text-white">
						Leave a comment (optional)
					</label>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Share your feedback about the work quality and professionalism..."
						className="w-full h-24 bg-white/5 border border-violet-500/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all resize-none"
					/>
				</div>

				{/* Buttons */}
				<div className="flex gap-3">
					<button
						onClick={onClose}
						className="flex-1 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors font-medium"
					>
						Cancel
					</button>
					<button
						onClick={handleSubmit}
						disabled={rating === 0}
						className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
							rating > 0
								? "bg-violet-500 hover:bg-violet-600 text-white"
								: "bg-violet-500/30 text-white/50 cursor-not-allowed"
						}`}
					>
						Submit Review
					</button>
				</div>
			</div>
		</div>
	)
}
