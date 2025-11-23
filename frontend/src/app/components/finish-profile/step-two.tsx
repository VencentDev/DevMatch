import React from "react"
import { FinishProfileRequest } from "@/lib/types/finishProfile"

interface StepTwoProps {
	formData: FinishProfileRequest
	setFormData: React.Dispatch<React.SetStateAction<FinishProfileRequest>>
}

export const StepTwo: React.FC<StepTwoProps> = ({ formData, setFormData }) => {
	const handleRoleSelection = (role: string) => {
		setFormData((prev) => ({ ...prev, role: role }))
	}

	return (
		<div className="space-y-6">
			<p className="text-gray-400 text-center mb-8">
				Select your role on DevMatch
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<button
					onClick={() => handleRoleSelection("role_freelancer")}
					className={`p-8 rounded-lg border-2 transition-all ${
						formData.role === "role_freelancer"
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
					onClick={() => handleRoleSelection("role_client")}
					className={`p-8 rounded-lg border-2 transition-all ${
						formData.role === "role_client"
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
