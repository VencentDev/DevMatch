export interface ProfileResponse {
    profile_completed: boolean;
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
        });

        if (!response.ok) {
            throw new Error("Failed to fetch profile status");
        }

        const data = await response.json();
        console.log("Profile response:", data);

        // Map the backend response to match the expected structure
        return {
            profile_completed: data.profileCompleted, // Map camelCase to snake_case
        };
    } catch (error) {
        console.error("Error fetching profile status:", error);
        throw error;
    }
};