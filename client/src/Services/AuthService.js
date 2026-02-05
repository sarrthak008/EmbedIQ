import api from "../../config/api";


const AuthService = {
    login: async (email, password) => {

        if (!email || !password) {
            return { success: false, message: "Email and Password are required" };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return { success: false, message: "Please enter a valid email address" };
        }

        if (password.length < 6) {
            return { success: false, message: "Password must be at least 6 characters long" };
        }

        try {
            const response = await api.post("/api/auth/login", { email, password });
            return { success: true, data: response.data };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Login failed"
            };
        }
    },

    signup: async (comapny_name, email, password) => {

        if (!comapny_name || !email || !password) {
            return { success: false, message: "Name, Email and Password are required" };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return { success: false, message: "Please enter a valid email address" };
        }

        if (password.length < 6) {
            return { success: false, message: "Password must be at least 6 characters long" };
        }
        if (comapny_name.length < 3) {
            return { success: false, message: "Name must be at least 3 characters long" };
        }

        try {
            const response = await api.post("/api/auth/signup", { comapny_name, email, password });
            return { success: true, data: response.data };
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: error.response?.data?.message || "Signup failed"
            };
        }
    }
};



export default AuthService;