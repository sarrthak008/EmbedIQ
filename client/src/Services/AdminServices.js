import api from "../../config/api"

const AdminServices = {

    getAdminDashboardData: async () => {
        try {
            const response = await api.get(`/api/admin/dashboard`, { withCredentials: true });
            // console.log("Dashboard Data Response:", response);
            if(response?.data?.success){
                return{success:true, data: response.data};
            }else{
                return{succsess:false, message: response.message};
            }
        } catch (error) {
            return{sucsess:false, message: error.message};
        }
    },


    // getSystemInformation: async () => {
    //     try {
    //         const response = await api.get(`/api/admin/uses`, { withCredentials: true });
    //         console.log("Dashboard Data Response:", response);
    //         if(response?.data?.success){
    //             return{success:true, data: response.data};
    //         }else{
    //             return{succsess:false, message: response.message};
    //         }
    //     } catch (error) {
    //         console.error("Error fetching system information:", error);
    //         return{sucsess:false, message: error.message};
    //     }
    // },

    getAllUsers:async()=>{ 
        try {
            let response = await api.get("/api/admin/users", { withCredentials: true });
            // console.log("All Users Response:", response);
            if(response?.data?.success){
                return{success:true, data: response.data};
            }else{
                return{succsess:false, message: response.message};
            }
        } catch (error) {
            return{sucsess:false, message: error.message};
        }
    },

    goastUser:async (mail) => {
        try {
            let response = await api.post("/api/admin/gosting", { mail: mail }, { withCredentials: true });
            // console.log("Impersonate User Response:", response);
            if(response?.data?.success){
                return{success:true, data: response.data};
            }else{
                return{succsess:false, message: response.message};
            }
        } catch (error) {
            return{sucsess:false, message: error.message};
        }
    },

    deleteUser:async (mail) => {
        try {
            let response = await api.delete(`/api/admin/delete/${mail}`, {withCredentials: true });
            console.log("Delete User Response:", response);
            if(response?.data?.success){
                return{success:true, data: response.data};
            }else{
                return{succsess:false, message: response.message};
            }
        }
        catch (error) {
            return{sucsess:false, message: error.message};
        }
    },

    getAllBots:async () => {
        try {
            let response = await api.get("/api/admin/bots", { withCredentials: true });
            console.log("All Bots Response:", response);
            if(response?.data?.success){
                return{success:true, data: response.data};
            }else{
                return{succsess:false, message: response.message};
            }
        } catch (error) {
            return{sucsess:false, message: error.message};
        }
    },

    deleteBot:async (botId) => {
        try {
            let response = await api.delete(`/api/admin/delete/bot/${botId}`, { withCredentials: true });
            console.log("Delete Bot Response:", response);
            if(response?.data?.success){
                return{success:true, data: response.data};
            }else{
                return{succsess:false, message: response.message};
            }
        } catch (error) {
            return{sucsess:false, message: error.message};
        }
    }

}


export default AdminServices;   