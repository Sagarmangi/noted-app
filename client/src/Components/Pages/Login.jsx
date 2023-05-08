import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import axios from 'axios'

export default function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:8080/login", {
                ...values
            })
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <>
    <Header/>
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
        <span>
            Don't have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
    </>
  )
}
