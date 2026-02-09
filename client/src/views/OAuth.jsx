import { useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from "../features/Auth/AuthSlice"

const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        const params = new URLSearchParams(window.location.search)
        const token = params.get("token")

        if (!token) return navigate("/login")

        const decoded = jwtDecode(token)

        const userData = {
            email: decoded.sub,
            role: decoded.role,
            token
        }

        // ⭐ store FIRST (important)
        localStorage.setItem("USER", JSON.stringify(userData))

        // then redux
        dispatch(setUser({
            email: decoded.sub,
            role: decoded.role,
            token
        }))

        if(decoded?.role == "USER"){
            navigate("/dashboard", { replace: true })
        }else if(decoded?.role == "ADMIN"){
            navigate("/admin", { replace: true })
        }

    }, [])

    return <p>Logging you in...</p>
}

export default OAuth
