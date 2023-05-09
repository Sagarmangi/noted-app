import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'

export default function Register() {
  const navigate = useNavigate();
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email:"",
        password: ""
    })

    const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:8080/register", {
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
        <h1 className="h1 form-heading mb-3 fw-normal">Register</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            name="firstName"
            value={values.firstName}
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          ></input>
          <label htmlFor="floatingInput">First Name:</label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput2"
            name="lastName"
            value={values.lastName}
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          ></input>
          <label htmlFor="floatingInput2">Last Name:</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput3"
            name="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          ></input>
          <label htmlFor="floatingInput3">Email:</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            name="password"
            value={values.password}
            onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
          ></input>
          <label htmlFor="floatingPassword">Password:</label>
        </div>

        <button
          type="submit"
          className="w-100 form-button btn btn-lg btn-primary"
        >
         Register
        </button>
        <span>
            Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
    <ToastContainer/>
    </>
  )
}
