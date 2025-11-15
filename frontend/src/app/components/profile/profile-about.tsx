"use client"

import { useState } from "react"
import { Edit } from 'lucide-react'

export default function ProfileAbout() {
	const [isEditing, setIsEditing] = useState(false)
	const [bio, setBio] = useState(
		"Passionate frontend developer with 8+ years of experience building scalable web applications. Specialized in React, TypeScript, and modern web technologies.",
	)

	return (
		<div className="bg-card border border-border rounded-xl p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold text-foreground">About</h2>
				<button
					onClick={() => setIsEditing(!isEditing)}
					className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
				>
					<Edit size={18} />
				</button>
			</div>

			{isEditing ? (
				<div className="space-y-3">
					<textarea
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:border-primary focus:outline-none transition-colors text-foreground placeholder-muted-foreground resize-none h-28"
						placeholder="Tell us about yourself..."
					/>
					<div className="flex gap-2">
						<button
							onClick={() => setIsEditing(false)}
							className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium"
						>
							Save
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-border rounded-lg transition-colors font-medium text-foreground"
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<p className="text-muted-foreground leading-relaxed">{bio}</p>
			)}
		</div>
	)
}
