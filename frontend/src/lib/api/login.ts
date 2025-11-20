import { LoginRequest, LoginResponse } from "@/lib/types/login";

export const submitLogin = async (payload: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const text = await response.text();
        type LoginResponseData = {
            token?: string;
            access_token?: string;
            jwt?: string;
            error?: string;
            message?: string;
            profileCompleted?: boolean;
            profile_completed?: boolean;
            [key: string]: unknown;
        };
        let data: LoginResponseData = {};
        try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }

        // try body token fields
        let token: string | undefined = data?.token || data?.access_token || data?.jwt;

        // if not in body, check Authorization header
        if (!token) {
            const header = response.headers.get("Authorization") || response.headers.get("authorization");
            if (header && header.startsWith("Bearer ")) {
                token = header.substring(7);
            }
        }

        if (!response.ok) {
            return {
                success: false,
                error: data?.error || data?.message || "Login failed",
            };
        }

        if (!token) {
            return {
                success: false,
                error: "No token returned from server",
            };
        }

        return {
            success: true,
            data: {
                token,
                profileCompleted: Boolean(data?.profileCompleted ?? data?.profile_completed),
            },
        };
    } catch (error) {
        console.error("Login API error:", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again later.",
        };
    }
};