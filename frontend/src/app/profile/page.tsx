"use client"

import AccountHeader from "@/app/components/account-header"
import ProfileSidebar from "@/app/components/profile/profile-sidebar"
import ProfileHeader from "@/app/components/profile/profile-header"
import ProfileAbout from "@/app/components/profile/profile-about"
import SkillsSection from "@/app/components/profile/skills-section"
import EducationSection from "@/app/components/profile/education-section"
import CertificationsSection from "@/app/components/profile/certifications-section"
import ExperienceSection from "@/app/components/profile/experience-section"

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
