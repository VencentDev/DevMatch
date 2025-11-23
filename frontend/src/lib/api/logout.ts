export const logout = async () => {
    await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include"
    });

    // Cleanup local/session storage if you stored anything
    localStorage.removeItem("authToken");
    localStorage.removeItem("profileCompleted");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("profileCompleted");

    // Hard redirect to login page
    window.location.href = "/login";
};
