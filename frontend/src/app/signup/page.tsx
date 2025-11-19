"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff } from "lucide-react" // Import eye icons
import { toast } from "sonner" // Import toast from Sonner

export default function SignupPage(): React.ReactElement {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		agreedToTerms: false,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false) // State to toggle password visibility
	const [showConfirmPassword, setShowConfirmPassword] = useState(false) // State to toggle confirm password visibility
	const [signupSuccess, setSignupSuccess] = useState(false)
	const [verificationToken, setVerificationToken] = useState("")
	const [resendTimer, setResendTimer] = useState(60)
	const [canResend, setCanResend] = useState(false)

	useEffect(() => {
		if (signupSuccess && resendTimer > 0) {
			const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
			return () => clearTimeout(timer)
		}
		if (resendTimer === 0) setCanResend(true)
	}, [signupSuccess, resendTimer])

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

		// Frontend validation
		if (
			!formData.username ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword
		) {
			toast.error("All fields are required.", {
				position: "bottom-right",
				style: { backgroundColor: "red", color: "white" }, // Red background for error
			})
			setIsLoading(false)
			return
		}

		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match.", {
				position: "bottom-right",
				style: { backgroundColor: "red", color: "white" }, // Red background for error
			})
			setIsLoading(false)
			return
		}

		const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
		if (!passwordRegex.test(formData.password)) {
			toast.error(
				"Password must be at least 8 characters long, include 1 uppercase letter, 1 number, and 1 special character.",
				{
					position: "bottom-right",
					style: { backgroundColor: "red", color: "white" }, // Red background for error
				},
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
				if (data.error) {
                  toast.error(data.error, {
                    position: "bottom-right",
                    style: { backgroundColor: "red", color: "white" },
                  });
                  setIsLoading(false);
                  return;
                }
				toast.success(
					data.message || "Signup successful! Please verify your email.",
					{
						position: "top-center",
						style: { backgroundColor: "green", color: "white" }, // Green background for success
					},
				)
				setSignupSuccess(true)
				setVerificationToken(data.token)
				setResendTimer(60)
				setCanResend(false)
			} else {
				const errorData = await response.json()
				toast.error(errorData.error || "An error occurred during signup.", {
					position: "bottom-right",
					style: { backgroundColor: "red", color: "white" }, // Red background for error
				})
			}
		} catch (error) {
			toast.error("Failed to connect to the server. Please try again later.", {
				position: "bottom-right",
				style: { backgroundColor: "red", color: "white" }, // Red background for error
			})
		} finally {
			setIsLoading(false)
		}
	}

	const handleResend = async () => {
		if (!verificationToken) return
		try {
			const response = await fetch(
				`http://localhost:8080/api/auth/resend/${verificationToken}`,
				{ method: "POST" },
			)
			if (response.ok) {
				toast.success("Verification email resent.", {
					position: "top-center",
					style: { backgroundColor: "green", color: "white" },
				})
				setResendTimer(60)
				setCanResend(false)
			} else {
				const errorData = await response.json()
				toast.error(errorData.error || "Failed to resend verification email.", {
					position: "bottom-right",
					style: { backgroundColor: "red", color: "white" },
				})
			}
		} catch {
			toast.error("Failed to connect to the server.", {
				position: "bottom-right",
				style: { backgroundColor: "red", color: "white" },
			})
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
						<div className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-sm flex items-center justify-center text-white text-sm font-bold">
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
						<h1 className="text-4xl md:text-5xl font-bold mb-2 text-balance">
							Join DevMatch
						</h1>
					</div>

					{/* Form */}
					{!signupSuccess ? (
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
									className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
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
									className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
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
										className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
										className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
									>
										{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
								<div className="relative">
									<input
										type={showConfirmPassword ? "text" : "password"} // Toggle between "text" and "password"
										id="confirmPassword"
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										placeholder="••••••••"
										className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
										required
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle confirm password visibility
										className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
									>
										{showConfirmPassword ? (
											<EyeOff size={20} />
										) : (
											<Eye size={20} />
										)}
									</button>
								</div>
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
								className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6 group"
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
					) : (
						<div className="space-y-6 text-center">
							<h2 className="text-2xl text-violet-400 font-bold">
								Signup successful!
							</h2>
							<p className="text-violet-300">
								Please verify your email address. Check your inbox and spam
								folder.
							</p>
							<button
								onClick={handleResend}
								disabled={!canResend}
								className={`mt-4 px-6 py-2 bg-violet-500 text-white rounded-sm transition-colors ${
									!canResend
										? "opacity-50 cursor-not-allowed"
										: "hover:bg-violet-600"
								}`}
							>
								{canResend
									? "Resend Verification"
									: `Resend Verification (${resendTimer}s)`}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
