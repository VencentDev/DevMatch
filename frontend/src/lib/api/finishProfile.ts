import { FinishProfileRequest } from "../types/finishProfile";

export const submitFinishProfile = async (payload: FinishProfileRequest) => {
    try {
        const response = await fetch("http://localhost:8080/api/profile/finish", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        } else {
            const errorData = await response.json();
            return { success: false, error: errorData.error || "Unknown error occurred" };
        }
    } catch (error) {
        console.error("API error:", error);
        return { success: false, error: "Failed to connect to the server" };
    }
};