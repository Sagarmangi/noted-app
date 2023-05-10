import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


export default function Login() {
  const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:8080/login", {
                ...values
            }, {
                withCredentials: true
            })
            if (data) {
                if (data.errors) {
                const { email, password } = data.errors;
                if (email) generateError(email);
                else if (password) generateError(password);
                } else {
                  navigate("/");
                }
            }
        } catch (ex) {
        console.log(ex);
        }
    };

  return (
    <>
    <div className="text-center form-signin w-100 m-auto">
      <form onSubmit={e => handleSubmit(e)} className="form-register">
        <h1 className="h1 form-heading mb-3 fw-normal">Log In</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            name='email'
            value={values.email}
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          ></input>
          <label htmlFor="email">Email:</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name='password'
            value={values.password}
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          ></input>
          <label htmlFor="password">Password:</label>
        </div>

        <button
          type="submit"
          className="w-100 form-button btn btn-lg btn-primary"
        >
          Sign In
        </button>
        <div className="form-button">
            Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
    <ToastContainer/>
    </>
  )
}
