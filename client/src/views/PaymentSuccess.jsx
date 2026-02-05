import React, { useEffect } from 'react'
import Loader from '../components/Loader'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PaymentService from '../Services/PaymentService';
import { toast } from "sonner"

const PaymentSuccess = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const verifyPayment = async () => {
        let id = toast.loading("Verifying Payment...");
        try {
            let sessionId = searchParams.get("session_id");
            if (sessionId) {
                let responce = await PaymentService.verifyPayment(sessionId);
                if (responce.success) {
                    toast.success("Payment Verified Successfully!", { id });
                    navigate("/dashboard");
                } else {
                    toast.error("Payment Verification Failed!", { id });
                    navigate("/plans");
                }
            }
        } catch (error) {
            toast.error("An error occurred during payment verification.", { id });
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

    return (
        <div>
            <Loader className={"w-screen h-screen"} />
        </div>
    )
}

export default PaymentSuccess