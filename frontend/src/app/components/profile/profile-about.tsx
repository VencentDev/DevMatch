"use client"

import { useState } from "react"
import { Edit, Star } from 'lucide-react'

export default function ProfileAbout() {
	const [isEditing, setIsEditing] = useState(false)
	const [bio, setBio] = useState(
		"Passionate frontend developer with 8+ years of experience building scalable web applications. Specialized in React, TypeScript, and modern web technologies.",
	)
	const averageRating = 4.8

	return (
		<div className="bg-gradient-to-br from-violet-600/10 to-violet-600/5 rounded-lg p-6">
			<div className="flex items-center justify-between mb-4">
				<div className="flex items-center gap-2">
					<h2 className="text-xl font-bold text-white">About</h2>
					<div className="flex items-center gap-1 bg-violet-600/20 rounded-full px-2 py-1">
						<Star size={14} className="text-yellow-400 fill-yellow-400" />
						<span className="text-xs font-semibold text-white">{averageRating}</span>
					</div>
				</div>
				<button
					onClick={() => setIsEditing(!isEditing)}
					className="p-2 hover:bg-violet-500/20 rounded-lg transition-colors text-white/60 hover:text-white"
				>
					<Edit size={18} />
				</button>
			</div>

			{isEditing ? (
				<div className="space-y-3">
					<textarea
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						className="w-full px-4 py-3 bg-black/40 border border-violet-500/20 rounded-lg focus:border-violet-500/50 focus:outline-none transition-colors text-white placeholder-white/40 resize-none h-28"
						placeholder="Tell us about yourself..."
					/>
					<div className="flex gap-2">
						<button
							onClick={() => setIsEditing(false)}
							className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium"
						>
							Save
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-violet-500/20 rounded-lg transition-colors font-medium text-white/80"
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<p className="text-white/70 leading-relaxed">{bio}</p>
			)}
		</div>
	)
}
