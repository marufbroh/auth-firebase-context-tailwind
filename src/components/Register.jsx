import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from '../firebase/firebase.config';
import { UserContext } from '../providers/authProviders';
const auth = getAuth(app);

const Register = () => {
    const { user, createUser } = useContext(UserContext);
    // console.log(createUser);
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const handleRegister = (event) => {
        event.preventDefault()
        setError("");
        setSuccess("");
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        createUser(email, password)
            .then((userCredential) => {
                // Signed in 
                const loggedUser = userCredential.user;
                console.log(loggedUser);
                setSuccess("User Created Successfully")
                form.reset()
            })
            .catch((error) => {
                // const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage)
            });

        // createUserWithEmailAndPassword(auth, email, password)



    };

    return (
        <div className="hero min-h-[calc(100vh-44px)] bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Register Now !!!</h1>
                    {/* <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p> */}
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="your name" className="input input-bordered" required />
                        </div>
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
                                <Link to={"/login"} className="label-text-alt link link-hover">Already have an account?</Link>
                            </label>
                        </div>
                        <div className='text-center'>
                            {
                                success ? <p className='text-success'>{success}</p> : <p className='text-red-700'>{error}</p>
                            }
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;