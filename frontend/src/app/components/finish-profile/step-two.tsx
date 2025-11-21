import React from "react"

interface StepTwoProps {
	formData: {
		fullName: string
		country: string
		address: string
		phoneNumber: string
		phoneFormat: string
		userType: string
		industry: string
		title: string
		skills: string[]
	}
	setFormData: React.Dispatch<
		React.SetStateAction<{
			fullName: string
			country: string
			address: string
			phoneNumber: string
			phoneFormat: string
			userType: string
			industry: string
			title: string
			skills: string[]
		}>
	>
}

export const StepTwo: React.FC<StepTwoProps> = ({ formData, setFormData }) => {
	return (
		<div className="space-y-6">
			<p className="text-gray-400 text-center mb-8">
				Select your role on DevMatch
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<button
					onClick={() =>
						setFormData((prev) => ({ ...prev, userType: "freelancer" }))
					}
					className={`p-8 rounded-lg border-2 transition-all ${
						formData.userType === "freelancer"
							? "border-violet-600 bg-violet-600/10"
							: "border-white/10 bg-white/5 hover:border-white/20"
					}`}
				>
					<div className="text-3xl mb-4">💼</div>
					<h3 className="text-xl font-bold mb-2">Freelancer</h3>
					<p className="text-gray-400 text-sm">
						Offer your skills and find projects
					</p>
				</button>

				<button
					onClick={() =>
						setFormData((prev) => ({ ...prev, userType: "client" }))
					}
					className={`p-8 rounded-lg border-2 transition-all ${
						formData.userType === "client"
							? "border-violet-600 bg-violet-600/10"
							: "border-white/10 bg-white/5 hover:border-white/20"
					}`}
				>
					<div className="text-3xl mb-4">🎯</div>
					<h3 className="text-xl font-bold mb-2">Client</h3>
					<p className="text-gray-400 text-sm">Post projects and hire talent</p>
				</button>
			</div>
		</div>
	)
}
