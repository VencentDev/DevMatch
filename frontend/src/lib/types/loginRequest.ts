// Request payload for the login API
export interface LoginRequest {
    identifier: string;
    password: string;
}

// Response structure for the login API
export interface LoginResponse {
    success: boolean;
    data?: {
        token: string;
        profileCompleted: boolean;
    };
    error?: string;
}