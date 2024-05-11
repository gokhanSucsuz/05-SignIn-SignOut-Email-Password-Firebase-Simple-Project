import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { FcAddImage } from "react-icons/fc"
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Error } from "../components/Error";

export const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [img, setImg] = useState(null)
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const [err, setErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const date = new Date().getTime();
            const storageRef = ref(storage, `${username + date}`)

            await uploadBytesResumable(storageRef, img).then(async () => {
                const downloadURL = await getDownloadURL(storageRef);

                // Firebase Authentication'da kullanıcı profili güncelleniyor
                await updateProfile(res.user, {
                    displayName: username,
                    photoURL: downloadURL,
                });

                // Firestore'a kullanıcı bilgileri ekleniyor
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName: username,
                    email,
                    photoURL: downloadURL,
                });
                navigate("/");
            });
        } catch (err) {
            setErr(err.message);
        }
    }

    return (
        <div className="d-flex align-items-center vh-100 justify-content-center bg-secondary">
            <div className="w-50 d-flex justify-content-center">
                <form className="shadow p-3 w-75 rounded-3 bg-white">
                    <div className="row mb-3">
                        <label htmlFor="username" className="col-sm-2 col-form-label">User Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="username" name="username" onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail3" onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword3" onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="image" className="col-sm-2 col-form-label w-100">Image
                            <FcAddImage name="image" style={{
                                fontSize: "50px",
                                marginLeft: "11%"
                            }} />
                        </label>
                        <div className="col-sm-10">
                            <input type="file" style={{ display: "none" }} className="form-control" id="image" onChange={(e) => setImg(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info text-white w-50" onClick={handleSubmit}>Register</button>
                    <span className="ms-3">Do you have an account? <Link to="/login">Login</Link></span>
                    {err && <Error error={err} />}
                </form>
            </div>
        </div>
    )
}
