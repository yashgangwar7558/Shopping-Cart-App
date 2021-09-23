import React, { useEffect, useState } from 'react'
import Sawo from "sawo"
import { useHistory } from 'react-router-dom';
import { useGlobalContext } from '../context'

export default function Login() {

    const history = useHistory()
    let { loginStatus, setLoginStatus } = useGlobalContext()
    let { payload, setPayload } = useGlobalContext()
    let { cookies, setCookie, removeCookie } = useGlobalContext()


    useEffect(() => {
        var config = {
            // should be same as the id of the container created on 3rd step
            containerID: 'sawo-container',
            // can be one of 'email' or 'phone_number_sms'
            identifierType: 'email',
            // Add the API key copied from 5th step
            apiKey: 'bf928fd5-b920-4f0f-98d3-27d986d48074',
            // Add a callback here to handle the payload sent by sdk
            onSuccess: (payload) => {
                // you can use this payload for your purpose
                console.log("Payload : " + JSON.stringify(payload));
                setPayload(payload);
                setCookie("payload", payload);  // will expire after 10min
                localStorage.setItem("user_id", payload.user_id);
                setLoginStatus(true);
                history.push("/")
            },
        }
        let sawo = new Sawo(config)
        sawo.showForm()
    }, [])

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
            {/* <div>
                <h1 style={{ color: 'black' }}>Please Login here...</h1>
            </div> */}
            <div style={{
                backgroundColor: '#ffffff',
                border: '2px solid white',
                borderRadius: '50px',
                padding: '2rem 5rem',
                boxShadow: "rgba(0, 0, 0, 0.5) 0rem 0.4rem 1.2rem",
            }}>
                <div style={{
                    textAlign: 'center',
                    marginTop: '2rem'
                }}>
                    <h2 style={{fontFamily: 'sans-serif', fontSize: '3rem'}}>Login Here</h2>
                </div>
                <div>
                    <div id="sawo-container" style={{ height: "400px", width: "400px", textTransform: 'uppercase' }}></div>
                </div>
            </div>
            <div style={{margin: '4rem'}}>
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