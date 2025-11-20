import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface AuthGuardOptions {
	requireAuth?: boolean // If true, the user must be authenticated
	requireProfileComplete?: boolean // If true, the user's profile must be completed
}

export const authGuard = (
	WrappedComponent: React.ComponentType,
	options: AuthGuardOptions = {},
) => {
	return function AuthGuard(
		props: React.ComponentProps<typeof WrappedComponent>,
	) {
		const router = useRouter()
		const pathname = usePathname()

		useEffect(() => {
			const token =
				localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
			const profileCompleted =
				localStorage.getItem("profileCompleted") === "true"

			// If authentication is required and the user is not authenticated
			if (options.requireAuth && !token) {
				router.replace("/login")
				return
			}

			// If profile completion is required and the user's profile is not completed
			if (options.requireProfileComplete && !profileCompleted) {
				router.replace("/finish-profile")
				return
			}
			// If the user is already authenticated, prevent access to the login page
			if (pathname === "/login" && token) {
				router.replace("/feed")
				return
			}

			// If the user has completed their profile, prevent access to the finish-profile page
			if (pathname === "/finish-profile" && profileCompleted) {
				router.replace("/feed")
				return
			}
		}, [router, pathname])
		return <WrappedComponent {...props} />
	}
}
