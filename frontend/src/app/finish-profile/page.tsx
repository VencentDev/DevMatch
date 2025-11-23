"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { FinishProfileRequest } from "@/lib/types/finishProfile"
import { submitFinishProfile } from "@/lib/api/finishProfile"
import { toast } from "sonner"
import { StepFour } from "../components/finish-profile/step-four"
import { StepOne } from "../components/finish-profile/step-one"
import { StepThree } from "../components/finish-profile/step-three"
import { StepTwo } from "../components/finish-profile/step-two"

function ProfileSetupPage(): React.ReactElement {
	const [currentStep, setCurrentStep] = useState(1)
	const [skillInput, setSkillInput] = useState("")
	const [formData, setFormData] = useState<FinishProfileRequest>({
		role: "",
		fullName: "",
		country: "",
		address: "",
		phone: "",
		industry: "",
		title: "",
		skills: [],
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const nextStep = () => {
		if (currentStep === 2 && formData.role === "role_client") {
			setCurrentStep(4)
		} else if (currentStep < 4) {
			setCurrentStep(currentStep + 1)
		}
	}

	const prevStep = () => {
		if (currentStep === 4 && formData.role === "role_client") {
			setCurrentStep(2)
		} else if (currentStep > 1) {
			setCurrentStep(currentStep - 1)
		}
	}

	const handleFinish = async () => {
		try {
			const result = await submitFinishProfile(formData)

			if (result.success) {
				toast.success("Profile completed successfully!", {
					position: "top-center",
				})
				window.location.href = "/feed"
			} else {
				toast.error(
					result.error || "Failed to complete profile. Please try again.",
					{
						position: "bottom-right",
					},
				)
			}
		} catch (error) {
			toast.error("An unexpected error occurred. Please try again later.", {
				position: "bottom-right",
			})
			console.error("Error completing profile:", error)
		}
	}

	return (
		<div className="min-h-screen bg-black text-white flex flex-col">
			{/* Navigation */}
			<div className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/10">
				<Link
					href="/home-page"
					className="text-2xl font-bold flex items-center gap-2"
				>
					<div className="flex items-center gap-2 font-bold text-xl text-white">
						<div className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">
							DM
						</div>
						<div className="text-2xl font-bold bg-linear-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
							DevMatch
						</div>
					</div>
				</Link>
				<div className="text-gray-400">Step {currentStep} of 4</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex items-center justify-center px-4 py-12">
				<div className="w-full max-w-2xl">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
							Complete Your Profile
						</h1>
						<p className="text-gray-400 text-lg">Step {currentStep} of 4</p>
					</div>

					{/* Step Components */}
					{currentStep === 1 && (
						<StepOne
							formData={formData}
							handleInputChange={handleInputChange}
							setFormData={setFormData}
						/>
					)}
					{currentStep === 2 && (
						<StepTwo
							formData={formData}
							setFormData={setFormData}
						/>
					)}
					{currentStep === 3 && formData.role === "role_freelancer" && (
						<StepThree
							formData={formData}
							skillInput={skillInput}
							setSkillInput={setSkillInput}
							setFormData={setFormData}
						/>
					)}
					{currentStep === 4 && <StepFour formData={formData} />}

					{/* Navigation Buttons */}
					<div className="flex justify-between mt-12 gap-4">
						<button
							onClick={prevStep}
							disabled={currentStep === 1}
							className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
						>
							<ArrowLeft size={18} />
							Back
						</button>

						{currentStep < 4 ? (
							<button
								onClick={nextStep}
								disabled={
									(currentStep === 1 &&
										(!formData.fullName ||
											!formData.country ||
											!formData.address ||
											!formData.phone)) ||
									(currentStep === 2 && !formData.role) ||
									(currentStep === 3 &&
										(!formData.industry ||
											!formData.title ||
											(formData.skills?.length || 0) === 0))
								}
								className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium group"
							>
								Next
								<ArrowRight
									size={18}
									className="group-hover:translate-x-1 transition-transform"
								/>
							</button>
						) : (
							<button
								onClick={handleFinish}
								className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors flex items-center gap-2 font-medium group"
							>
								Finish
								<ArrowRight
									size={18}
									className="group-hover:translate-x-1 transition-transform"
								/>
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Floating Background Elements */}
			<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
				<div className="absolute top-40 right-20 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
				<div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
			</div>
		</div>
	)
}

export default ProfileSetupPage
