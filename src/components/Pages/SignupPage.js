import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../context'
import { auth } from "../../auth/firebase-config"
import { Link } from 'react-router-dom'
import './SignupPage.css'

export default function Signup() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    let { loginStatus, setLoginStatus } = useGlobalContext()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmpassword) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Signed in 
                    history.push("/")
                    setLoginStatus(true)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage)
                });
        } else {
            alert("Password and confirm password are not same")
        }
    }

    return (
        <div className="login-body" style={{
            margin: '0',
            padding: '0',
            width: '100%',
            height: '100vh',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                backgroundColor: '#ffffff',
                border: '2px solid white',
                borderRadius: '50px',
                padding: '2rem 5rem',
                boxShadow: "rgba(0, 0, 0, 0.5) 0rem 0.4rem 1.2rem",
            }}>
                <div style={{
                    textAlign: 'center',
                    margin: '2rem'
                }}>
                    <h2 style={{ fontFamily: 'sans-serif', fontSize: '3rem' }}>SignUp Here</h2>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-field" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <input type="text" className="inputs" placeholder="Username" onChange={(e) => { setName(e.target.value) }} value={name} />
                        <input type="email" className="inputs" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                        <input type="password" className="inputs" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                        <input type="password" className="inputs" placeholder="Confirm Password" onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmpassword} />
                    </div>
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                <h6 style={{ margin: "3rem", fontSize: "2rem", textAlign: "center" }}>Already have an account? <Link to="/login">Log in</Link></h6>
            </div>
        </div>
    )
}