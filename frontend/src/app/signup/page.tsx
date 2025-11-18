"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function SignupPage(): React.ReactElement {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		agreedToTerms: false,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		setErrorMessage("")
		setSuccessMessage("")

		// Frontend validation
		if (
			!formData.username ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword
		) {
			setErrorMessage("All fields are required.")
			setIsLoading(false)
			return
		}

		if (formData.password !== formData.confirmPassword) {
			setErrorMessage("Passwords do not match.")
			setIsLoading(false)
			return
		}

		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
		if (!passwordRegex.test(formData.password)) {
			setErrorMessage(
				"Password must be at least 8 characters long, include 1 uppercase letter, 1 number, and 1 special character.",
			)
			setIsLoading(false)
			return
		}

		try {
			const response = await fetch("http://localhost:8080/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					username: formData.username,
					email: formData.email,
					password: formData.password,
					confirmPassword: formData.confirmPassword,
				}),
			})

			if (response.ok) {
				const data = await response.json()
				setSuccessMessage(
					data.message || "Signup successful! Please verify your email.",
				)
			} else {
				const errorData = await response.json()
				setErrorMessage(errorData.error || "An error occurred during signup.")
			}
		} catch (error) {
			setErrorMessage(
				"Failed to connect to the server. Please try again later.",
			)
		} finally {
			setIsLoading(false)
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
				<div className="text-gray-400">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-white hover:text-violet-400 transition-colors"
					>
						Log in
					</Link>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex items-center justify-center px-4 py-12">
				<div className="w-full max-w-md">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
							Join DevMatch
						</h1>
						<p className="text-gray-400 text-lg">
							Connect with the perfect match for your next project
						</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className="space-y-4 mb-6"
					>
						{/* Username */}
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium mb-2"
							>
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								value={formData.username}
								onChange={handleInputChange}
								placeholder="john_doe"
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
								required
							/>
						</div>

						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium mb-2"
							>
								Email Address
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								placeholder="you@example.com"
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
								required
							/>
						</div>

						{/* Password */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium mb-2"
							>
								Password
							</label>
							<div className="relative">
								<input
									type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
									id="password"
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									placeholder="••••••••"
									className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
									className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
								>
									{showPassword ? "Hide" : "Show"}
								</button>
							</div>
						</div>

						{/* Confirm Password */}
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-sm font-medium mb-2"
							>
								Confirm Password
							</label>
							<input
								type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
								id="confirmPassword"
								name="confirmPassword"
								value={formData.confirmPassword}
								onChange={handleInputChange}
								placeholder="••••••••"
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
								required
							/>
						</div>

						{/* Terms Checkbox */}
						<div className="flex items-start gap-3 pt-2">
							<input
								type="checkbox"
								id="terms"
								name="agreedToTerms"
								checked={formData.agreedToTerms}
								onChange={handleInputChange}
								className="mt-1 w-5 h-5 rounded border border-white/10 bg-white/5 cursor-pointer accent-violet-600"
								required
							/>
							<label
								htmlFor="terms"
								className="text-sm text-gray-400 cursor-pointer"
							>
								I agree to the{" "}
								<Link
									href="#"
									className="text-violet-400 hover:text-violet-300 transition-colors"
								>
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href="#"
									className="text-violet-400 hover:text-violet-300 transition-colors"
								>
									Privacy Policy
								</Link>
							</label>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6 group"
						>
							{isLoading ? (
								<>
									<div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
									Creating account...
								</>
							) : (
								<>
									Create Account
									<ArrowRight
										size={18}
										className="group-hover:translate-x-1 transition-transform"
									/>
								</>
							)}
						</button>
					</form>

					{/* Error Message */}
					{errorMessage && (
						<div className="text-red-500 text-sm text-center mt-4">
							{errorMessage}
						</div>
					)}

					{/* Success Message */}
					{successMessage && (
						<div className="text-green-500 text-sm text-center mt-4">
							{successMessage}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
