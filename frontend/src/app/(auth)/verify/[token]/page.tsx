"use client"

import { CheckCircle2, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function EmailVerificationPage() {
	const [isLoading, setIsLoading] = useState(true)
	const [isVerified, setIsVerified] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")

	const params = useParams()
	const token = params?.token // Extract the token from the path

	useEffect(() => {
		const verifyEmail = async () => {
			if (!token) {
				setErrorMessage("Token is missing.")
				setIsLoading(false)
				return
			}

			try {
				const response = await fetch(
					`http://localhost:8080/api/auth/verify-email/${token}`,
					{
						method: "POST",
					},
				)

				if (response.ok) {
					setIsVerified(true)
				} else {
					const errorData = await response.json()
					setErrorMessage(
						errorData.error || "Verification failed. Please try again.",
					)
				}
			} catch (error) {
				setErrorMessage("Failed to connect to the server. Please try again.")
			} finally {
				setIsLoading(false)
			}
		}

		verifyEmail()
	}, [token])

	const handleResend = async () => {
		setIsLoading(true)
		setErrorMessage("")

		if (!token) {
			setErrorMessage("Token is missing.")
			setIsLoading(false)
			return
		}

		try {
			const response = await fetch(
				`http://localhost:8080/api/auth/resend/${token}`,
				{
					method: "POST",
				},
			)

			if (response.ok) {
				alert("Verification email resent successfully.")
			} else {
				const errorData = await response.json()
				setErrorMessage(
					errorData.error || "Failed to resend verification email.",
				)
			}
		} catch (error) {
			setErrorMessage("Failed to connect to the server. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-black p-4">
			<div className="flex flex-col items-center gap-6 max-w-md text-center">
				<div className="relative">
					{isLoading ? (
						<Loader2
							className="w-32 h-32 text-violet-400 animate-spin"
							strokeWidth={1.5}
						/>
					) : isVerified ? (
						<CheckCircle2
							className="w-32 h-32 text-violet-400"
							strokeWidth={1.5}
						/>
					) : (
						<div className="w-32 h-32 border-4 border-violet-400 rounded-full flex items-center justify-center">
							<span className="text-violet-400 text-sm">X</span>
						</div>
					)}
					<div className="absolute inset-0 blur-2xl opacity-30 bg-violet-400" />
				</div>

				<div className="space-y-3">
					{isLoading ? (
						<h1 className="text-violet-400">Verifying Email...</h1>
					) : isVerified ? (
						<>
							<h1 className="text-violet-400">Email Verified Successfully</h1>
							<p className="text-violet-400/80">
								Your email address has been verified. You can now access all
								features of your account.
							</p>
						</>
					) : (
						<>
							<h1 className="text-red-400">Verification Failed</h1>
							<p className="text-red-400/80">
								{errorMessage ||
									"Unable to verify your email. Please try again."}
							</p>
						</>
					)}
				</div>

				{isVerified ? (
					<a href="/login">
						<button className="mt-4 px-6 py-2 bg-violet-500 text-white rounded-sm hover:bg-violet-600 transition-colors">
							Continue to Login
						</button>
					</a>
				) : (
					!isLoading && (
						<button
							onClick={handleResend}
							className="mt-4 px-6 py-2 bg-violet-500 text-white rounded-sm hover:bg-violet-600 transition-colors"
						>
							Resend Verification Email
						</button>
					)
				)}
			</div>
		</div>
	)
}
