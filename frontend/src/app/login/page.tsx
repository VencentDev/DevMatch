"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { submitLogin } from "@/lib/api/login"
import { LoginRequest } from "@/lib/types/login"
import { authGuard } from "@/lib/HOC/authGuard"

function LoginPage(): React.ReactElement {
	const [formData, setFormData] = useState<LoginRequest>({
		identifier: "",
		password: "",
	})
	const [rememberMe, setRememberMe] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked } = e.target
		if (name === "rememberMe") {
			setRememberMe(checked)
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}))
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)

		if (!formData.identifier || !formData.password) {
			toast.error("Please fill in all fields.", { position: "bottom-right" })
			setIsLoading(false)
			return
		}

		try {
			const result = await submitLogin(formData)

			if (result.success) {
				toast.success("Login successful!", { position: "top-center" })

				const data = result.data!
				if (data.profileCompleted) {
					router.push("/feed")
				} else {
					router.push("/finish-profile")
				}

				// Save the token based on the "Remember Me" checkbox
				if (rememberMe) {
					localStorage.setItem("authToken", data.token)
					localStorage.setItem(
						"profileCompleted",
						data.profileCompleted.toString(),
					)
				} else {
					sessionStorage.setItem("authToken", data.token)
					sessionStorage.setItem(
						"profileCompleted",
						data.profileCompleted.toString(),
					)
				}
			} else {
				// Display the error message from the API
				toast.error(`Login failed: ${result.error}`, {
					position: "bottom-right",
				})
			}
		} catch (error) {
			// Handle unexpected errors
			toast.error("An unexpected error occurred. Please try again later.", {
				position: "bottom-right",
			})
			console.error("Login error:", error)
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
					Don&apos;t have an account?{" "}
					<Link
						href="/signup"
						className="text-white hover:text-violet-400 transition-colors"
					>
						Sign up
					</Link>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex items-center justify-center px-4 py-12">
				<div className="w-full max-w-md">
					{/* Header */}
					<div className="text-center mb-12">
						<h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
							Welcome Back
						</h1>
						<p className="text-gray-400 text-lg">
							Log in to your DevMatch account
						</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className="space-y-4 mb-6"
					>
						{/* Email */}
						<div>
							<label
								htmlFor="identifier"
								className="block text-sm font-medium mb-2"
							>
								Email or Username
							</label>
							<input
								type="text"
								id="identifier"
								name="identifier"
								value={formData.identifier}
								onChange={handleInputChange}
								placeholder="you@example.com"
								className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
								required
							/>
						</div>

						{/* Password */}
						<div>
							<div className="flex items-center justify-between mb-2">
								<label
									htmlFor="password"
									className="block text-sm font-medium"
								>
									Password
								</label>
								<Link
									href="#"
									className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
								>
									Forgot password?
								</Link>
							</div>
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

						{/* Remember Me */}
						<div className="flex items-center gap-3 pt-2">
							<input
								type="checkbox"
								id="rememberMe"
								name="rememberMe"
								checked={rememberMe}
								onChange={handleInputChange}
								className="w-5 h-5 rounded border border-white/10 bg-white/5 cursor-pointer accent-violet-600"
							/>
							<label
								htmlFor="rememberMe"
								className="text-sm text-gray-400 cursor-pointer"
							>
								Remember me
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
									Logging in...
								</>
							) : (
								<>
									Log In
									<ArrowRight
										size={18}
										className="group-hover:translate-x-1 transition-transform"
									/>
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default authGuard(LoginPage)
