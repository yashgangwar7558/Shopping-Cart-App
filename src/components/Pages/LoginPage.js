import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../context'
import { auth } from "../../auth/firebase-config"
import { Link } from 'react-router-dom'
import './LoginPage.css'

export default function Login() {

    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let { loginStatus, setLoginStatus } = useGlobalContext()

    const handleSubmit = async (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
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
                    <h2 style={{ fontFamily: 'sans-serif', fontSize: '3rem' }}>Login Here</h2>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-field" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <input type="email" className="inputs" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                        <input type="password" className="inputs" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <h6 style={{ margin: "3rem", fontSize: "2rem", textAlign: "center" }}>New User? <Link to="/signup">Sign up</Link></h6>
            </div>
            <div style={{ margin: '4rem' }}>
                <button style={{
                    border: 'none',
                    borderRadius: '1rem',
                    backgroundColor: '#6cc42d',
                    color: 'white',
                    textTransform: 'uppercase',
                    padding: '1rem 2rem'
                }} onClick={() => history.push('/')}>Go back to Home</button>
            </div>
        </div >
    )
}