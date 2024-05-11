/* eslint-disable react/prop-types */
import { Route, Routes, Navigate } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { AuthContext } from "./context/AuthContext"
import { useContext } from "react"

function App() {

  const { currentUser } = useContext(AuthContext)

  const ControlPage = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<ControlPage>
          <Home />
        </ControlPage>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
