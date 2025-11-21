import { FinishProfileRequest } from "@/lib/types/finishProfile"
import React from "react"

interface StepFourProps {
	formData: FinishProfileRequest
}

export const StepFour: React.FC<StepFourProps> = ({ formData }) => {
	return (
		<div className="space-y-6">
			<div className="bg-white/5 border border-white/10 rounded-lg p-8 space-y-6">
				{/* Personal Information */}
				<div className="border-b border-white/10 pb-6">
					<h3 className="text-sm font-medium text-gray-400 mb-2">
						Personal Information
					</h3>
					<div className="space-y-2 text-white">
						<p>
							<span className="text-gray-500">Full Name:</span>{" "}
							{formData.fullName}
						</p>
						<p>
							<span className="text-gray-500">Country:</span> {formData.country}
						</p>
						<p>
							<span className="text-gray-500">Address:</span> {formData.address}
						</p>
						<p>
							<span className="text-gray-500">Phone:</span> {formData.phone}
						</p>
					</div>
				</div>

				{/* Account Type */}
				<div className="border-b border-white/10 pb-6">
					<h3 className="text-sm font-medium text-gray-400 mb-2">
						Account Type
					</h3>
					<p className="text-white capitalize">{formData.userType}</p>
				</div>

				{/* Professional Information (Only for Freelancers) */}
				{formData.userType === "freelancer" && (
					<div>
						<h3 className="text-sm font-medium text-gray-400 mb-2">
							Professional Information
						</h3>
						<div className="space-y-2 text-white">
							<p>
								<span className="text-gray-500">Industry:</span>{" "}
								{formData.industry}
							</p>
							<p>
								<span className="text-gray-500">Title:</span> {formData.title}
							</p>
							<div>
								<span className="text-gray-500 block mb-2">Skills:</span>
								<div className="flex flex-wrap gap-2">
									{formData.skills?.map((skill) => (
										<span
											key={skill}
											className="bg-violet-600/20 border border-violet-600/50 rounded-full px-3 py-1 text-sm"
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
