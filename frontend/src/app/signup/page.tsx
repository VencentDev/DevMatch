"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { submitSignup } from "@/lib/api/signup"
import { resendVerification } from "@/lib/api/resendVerification"

export default function SignupPage(): React.ReactElement {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		agreedToTerms: false,
	})

	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const [signupSuccess, setSignupSuccess] = useState(false)
	const [verificationToken, setVerificationToken] = useState("")

	const [resendTimer, setResendTimer] = useState(60)
	const [isResending, setIsResending] = useState(false)

	const canResend = resendTimer === 0

	// Countdown timer fix (using functional updates prevents stale state)
	useEffect(() => {
		if (signupSuccess && resendTimer > 0) {
			const timer = setTimeout(() => {
				setResendTimer((prev) => Math.max(prev - 1, 0))
			}, 1000)
			return () => clearTimeout(timer)
		}
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

		// Basic validation
		if (
			!formData.username ||
			!formData.email ||
			!formData.password ||
			!formData.confirmPassword
		) {
			toast.error("All fields are required.", {
				position: "bottom-right",
			})
			setIsLoading(false)
			return
		}

		// Terms agreement check (HTML5 validation does not run with preventDefault)
		if (!formData.agreedToTerms) {
			toast.error("You must agree to the Terms and Privacy Policy.", {
				position: "bottom-right",
			})
			setIsLoading(false)
			return
		}

		// Confirm password
		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match.", {
				position: "bottom-right",
			})
			setIsLoading(false)
			return
		}

		// Password complexity
		const passwordRegex =
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
		if (!passwordRegex.test(formData.password)) {
			toast.error(
				"Password must be 8+ characters and include uppercase, lowercase, number, and a special character.",
				{
					position: "bottom-right",
				},
			)
			setIsLoading(false)
			return
		}

		try {
			const result = await submitSignup(formData)

			if (result?.success) {
				toast.success(
					result.data?.message ||
						"Signup successful! Please verify your email.",
					{ position: "top-center" },
				)

				setSignupSuccess(true)
				setVerificationToken(result.data?.token ?? "")
				setResendTimer(60)
			} else {
				toast.error(result?.error || "Signup failed.", {
					position: "bottom-right",
				})
			}
		} catch (err) {
			toast.error("Network error. Please try again.", {
				position: "bottom-right",
			})
		}

		setIsLoading(false)
	}

	const handleResend = async () => {
		if (!canResend || isResending || !verificationToken) return

		setIsResending(true)

		try {
			const result = await resendVerification(verificationToken)

			if (result?.success) {
				toast.success("Verification email resent.", {
					position: "top-center",
				})

				if (result.data?.token) {
					setVerificationToken(result.data.token)
				}

				setResendTimer(60)
			} else {
				toast.error(result?.error || "Failed to resend email.", {
					position: "bottom-right",
				})
			}
		} catch {
			toast.error("Network error.", {
				position: "bottom-right",
			})
		}

		setIsResending(false)
	}

	return (
		<div className="min-h-screen bg-black text-white flex flex-col">
			{/* Navigation */}
			<div className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/10">
				<Link
					href="/home-page"
					className="text-2xl font-bold flex items-center gap-2"
				>
					<div className="w-8 h-8 bg-linear-to-br from-violet-500 to-violet-700 rounded-sm flex items-center justify-center text-white text-sm font-bold">
						DM
					</div>
					<div className="text-2xl font-bold bg-linear-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
						DevMatch
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

			{/* Main */}
			<div className="flex-1 flex items-center justify-center px-4 py-12">
				<div className="w-full max-w-md">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-2">
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
								<label className="block text-sm font-medium mb-2">
									Username
								</label>
								<input
									type="text"
									name="username"
									value={formData.username}
									onChange={handleInputChange}
									placeholder="john_doe"
									className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm 
										focus:border-violet-600 text-white placeholder-gray-500"
									required
								/>
							</div>

							{/* Email */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Email Address
								</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									placeholder="you@example.com"
									className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-sm 
										focus:border-violet-600 text-white placeholder-gray-500"
									required
								/>
							</div>

							{/* Password */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Password
								</label>
								<div className="relative">
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										value={formData.password}
										onChange={handleInputChange}
										placeholder="••••••••"
										className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-sm 
											focus:border-violet-600 text-white placeholder-gray-500"
										required
									/>
									<button
										type="button"
										onClick={() => setShowPassword((p) => !p)}
										className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
									>
										{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
									</button>
								</div>
							</div>

							{/* Confirm Password */}
							<div>
								<label className="block text-sm font-medium mb-2">
									Confirm Password
								</label>
								<div className="relative">
									<input
										type={showConfirmPassword ? "text" : "password"}
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										placeholder="••••••••"
										className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-sm 
											focus:border-violet-600 text-white placeholder-gray-500"
										required
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword((p) => !p)}
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

							{/* Terms */}
							<div className="flex items-start gap-3 pt-2">
								<input
									type="checkbox"
									name="agreedToTerms"
									checked={formData.agreedToTerms}
									onChange={handleInputChange}
									className="mt-1 w-5 h-5 rounded border border-white/10 bg-white/5 cursor-pointer accent-violet-600"
								/>
								<label className="text-sm text-gray-400 cursor-pointer">
									I agree to the{" "}
									<Link
										href="#"
										className="text-violet-400 hover:text-violet-300"
									>
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link
										href="#"
										className="text-violet-400 hover:text-violet-300"
									>
										Privacy Policy
									</Link>
								</label>
							</div>

							{/* Submit button */}
							<button
								type="submit"
								disabled={isLoading}
								className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 
									text-white font-semibold rounded-sm transition-all flex items-center justify-center gap-2
									disabled:opacity-50 disabled:cursor-not-allowed mt-6 group"
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
						/* After Signup Success */
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
								disabled={!canResend || isResending}
								className={`mt-4 px-6 py-2 bg-violet-500 text-white rounded-sm transition-colors 
									flex items-center justify-center gap-2 ${
										!canResend || isResending
											? "opacity-50 cursor-not-allowed"
											: "hover:bg-violet-600"
									}`}
							>
								{isResending ? (
									<>
										<Loader2 className="w-5 h-5 animate-spin" />
										Sending…
									</>
								) : canResend ? (
									"Resend Verification"
								) : (
									`Resend Verification (${resendTimer}s)`
								)}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
