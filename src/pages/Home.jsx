import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

export const Home = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <>
            <div>Welcome {currentUser?.displayName}</div>
            <button onClick={() => signOut(auth)}>Logout</button>
        </>
    )
}
