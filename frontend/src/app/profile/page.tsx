"use client"

import { useState } from "react"
import { Pencil, Plus, X, Star } from 'lucide-react'
import ProfileSidebar from "@/components/profile/profile-sidebar"
import ProfileHeader from "@/components/profile/profile-header"
import ProfileAbout from "@/components/profile/profile-about"
import SkillsSection from "@/components/profile/skills-section"
import EducationSection from "@/components/profile/education-section"
import CertificationsSection from "@/components/profile/certifications-section"
import ExperienceSection from "@/components/profile/experience-section"

export default function ProfilePage() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Main layout with sidebar */}
			<div className="flex">
				{/* Sidebar Navigation */}
				<ProfileSidebar />

				{/* Main Content */}
				<div className="flex-1 ml-64 pt-20">
					<div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
						{/* Profile Header with Cover and Avatar */}
						<ProfileHeader />

						{/* About Section */}
						<ProfileAbout />

						{/* Skills Section */}
						<SkillsSection />

						{/* Experience Section */}
						<ExperienceSection />

						{/* Education Section */}
						<EducationSection />

						{/* Certifications Section */}
						<CertificationsSection />
					</div>
				</div>
			</div>
		</div>
	)
}
