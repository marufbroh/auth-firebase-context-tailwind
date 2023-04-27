import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/authProviders';

const Login = () => {
    const { user, signIn, signInWithGoogle } = useContext(UserContext);
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    // console.log(user);

    const handleLogin = (event) => {
        event.preventDefault()
        setError("");
        setSuccess("");
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then((userCredential) => {
                // Signed in 
                const loggedUser = userCredential.user;
                setSuccess("User Logged Successfully")
                form.reset()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });
    }

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                // The signed-in user info.
                const loggedUser = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    
    return (
        <>
            <div className="hero min-h-[calc(100vh-44px)] bg-base-200">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login Now !!!</h1>
                        {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <Link className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className='text-center'>
                                {
                                    success ? <p className='text-success'>{success}</p> : <p className='text-red-700'>{error}</p>
                                }
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        <div onClick={handleGoogleLogin} className="form-control mt-6">
                            <button className="btn btn-primary">Google Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;