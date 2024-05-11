import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

export const Home = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <>
            <div className="d-flex align-items-center vh-100 justify-content-center bg-secondary">
                <div className="d-flex justify-content-center">
                    <div className="shadow p-3 rounded-3 bg-white p-5 m-5">
                        <div>Welcome {currentUser?.displayName}</div>
                        <button className="btn btn-sm btn-danger" onClick={() => signOut(auth)}>Logout</button>
                    </div>
                </div>
            </div>

        </>
    )
}
