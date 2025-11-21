"use client"

import { useState } from "react"
import { Pencil, Plus, X, Star } from 'lucide-react'
import AccountHeader from "@/app/components/account-header"
import ProfileSidebar from "@/app/components/profile/profile-sidebar"
import ProfileHeader from "@/app/components/profile/profile-header"
import ProfileAbout from "@/app/components/profile/profile-about"
import SkillsSection from "@/app/components/profile/(freelancer)/skills/skills-section"
import EducationSection from "@/app/components/profile/(freelancer)/education/education-section"
import CertificationsSection from "@/app/components/profile/(freelancer)/certification/certifications-section"
import ExperienceSection from "@/app/components/profile/(freelancer)/experience/experience-section"

export default function ProfilePage() {
	return (
		<div className="min-h-screen bg-black text-white">
			<AccountHeader />

			{/* Main layout with sidebar */}
			<div className="flex pt-20">
				{/* Sidebar Navigation */}
				<ProfileSidebar />

				{/* Main Content */}
				<div className="flex-1 ml-64 px-6 py-8 overflow-y-auto">
					<div className="max-w-4xl mx-auto space-y-6">
						{/* Profile Header with Cover and Avatar */}
						<ProfileHeader />

						<div className="grid grid-cols-2 gap-6">
							<ProfileAbout />
							<SkillsSection />
						</div>

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
