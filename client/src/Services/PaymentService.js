import api from "../../config/api";

const PaymentService = {
    pay: async (amount, plan, mail) => {
        try {
            const response = await api.post("/api/payment/create-session", {
                amount: amount,
                productName: plan,
                mail: mail
            });
            return response;
        } catch (error) {
            return { success: false, message: error.message };
        }
    },

    verifyPayment : async (sessionId) => {
        try {
            let response = await api.get(`/api/payment/verify/${sessionId}`);
            console.log("VERIFY_RESP", response);
            return { success: true, data: response.data };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}


export default PaymentService;