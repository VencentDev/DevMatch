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
		// Simulate API call
		setTimeout(() => {
			setIsLoading(false)
			console.log("Signup data:", formData)
		}, 2000)
	}

	return (
		<div className="min-h-screen bg-black text-white flex flex-col">
			{/* Navigation */}
			<div className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/10">
				<Link
					href="/"
					className="text-2xl font-bold flex items-center gap-2"
				>
					<div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold">DM</span>
					</div>
					<span>DevMatch</span>
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
							<input
								type="password"
								id="password"
								name="password"
								value={formData.password}
								onChange={handleInputChange}
								placeholder="••••••••"
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
								required
							/>
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
								type="password"
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

					{/* Divider */}
					<div className="flex items-center gap-4 mb-6">
						<div className="flex-1 h-px bg-white/10" />
						<span className="text-sm text-gray-500">or</span>
						<div className="flex-1 h-px bg-white/10" />
					</div>

					{/* Social Signup */}
					<button className="w-full py-3 px-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors font-medium flex items-center justify-center gap-2">
						<svg
							className="w-5 h-5"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							/>
							<path
								fill="currentColor"
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							/>
							<path
								fill="currentColor"
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							/>
							<path
								fill="currentColor"
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							/>
						</svg>
						Log in with Google
					</button>
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
