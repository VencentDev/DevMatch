"use client"

import { useState } from "react"
import Image from "next/image"
import { Camera, Edit, Star } from 'lucide-react'

export default function ProfileHeader() {
	const [isEditing, setIsEditing] = useState(false)

	return (
		<div className="space-y-4">
			{/* Cover Photo */}
			<div className="relative h-48 bg-linear-to-r from-violet-600/20 to-violet-500/10 rounded-lg overflow-hidden border border-violet-500/20 group cursor-pointer">
				<div className="w-full h-full bg-black/40" />
				<button className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
					<Camera size={18} className="text-white" />
				</button>
			</div>

			{/* Profile Info */}
			<div className="flex items-start justify-between">
				<div className="flex items-end gap-4">
					{/* Avatar */}
					<div className="relative -mt-16">
						<div className="w-32 h-32 bg-linear-to-br from-violet-500 to-violet-700 rounded-lg border-4 border-black flex items-center justify-center text-4xl font-bold text-white">
							JD
						</div>
						<button className="absolute bottom-2 right-2 p-2 bg-violet-500 hover:bg-violet-600 rounded-lg text-white transition-colors">
							<Camera size={16} />
						</button>
					</div>

					{/* Name and Title */}
					<div className="pb-4">
						<div className="flex items-center gap-2 mb-2">
							<h1 className="text-3xl font-bold text-white">John Doe</h1>
							<span className="px-3 py-1 bg-violet-500/20 border border-violet-500/50 rounded-full text-xs font-semibold text-violet-300">
								Pro
							</span>
						</div>
						<div className="flex items-center gap-2">
							<p className="text-lg text-white/60">Senior Frontend Developer</p>
							<div className="flex items-center gap-1 bg-violet-600/20 rounded-full px-2 py-1">
								<Star size={14} className="text-yellow-400 fill-yellow-400" />
								<span className="text-xs font-semibold text-white">4.8</span>
							</div>
						</div>
					</div>
				</div>

				{/* Edit Button */}
				<button
					onClick={() => setIsEditing(!isEditing)}
					className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-sm transition-colors font-medium"
				>
					<Edit size={16} />
					Edit Profile
				</button>
			</div>
		</div>
	)
}
