export interface ProfileResponse {
	profile_completed: boolean
}

export const fetchUserProfile = async (
	token: string,
): Promise<ProfileResponse> => {
	try {
		const response = await fetch("http://localhost:8080/api/auth/profile", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error("Failed to fetch profile status")
		}

		const data = await response.json()
		return data as ProfileResponse
	} catch (error) {
		console.error("Error fetching profile status:", error)
		throw error
	}
}
