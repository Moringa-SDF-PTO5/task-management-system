import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Cookies from 'js-cookie'
import './Login.css'

function Login({ setUser }) {
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (isError === true) {
            setTimeout(() => {
                setIsError((isError) => !isError)
            }, 3000)
        }
    }, [isError])

    const formSchema = Yup.object().shape({
        userName: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values, null, 2),
                })

                const data = await response.json()

                if (response.status === 200) {
                    // console.log(response)
                    setUser(data)
                    Cookies.set('userId', data.id, {
                        path: '/',
                    })
                    navigate('/dashboard')
                } else {
                    // alert(data.message)
                    setIsError((isError) => !isError)
                }
            } catch (error) {
                console.log(error)
            }
        },
    })

    return (
        <>
        <section className='login-container  p-3 m-3'>
            <h2>Log In</h2>
            <form onSubmit={formik.handleSubmit} className='m-3 p-3'>
                <div className="row">
                    <div className="row mb-3">
                            <label htmlFor='userName' className="col-sm-2 col-form-label">Username</label>
                            <div className="col-sm-10">
                                <input
                                    type='text'
                                    id='userName'
                                    className="form-control"
                                    name='userName'
                                    placeholder='Username'
                                    onChange={formik.handleChange}
                                    value={formik.values.userName}
                                />
                                {formik.errors.userName && formik.touched.userName ? (
                                <p>{formik.errors.userName}</p>
                                    ) : null}
                            </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor='password' className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className="form-control"
                            placeholder='Password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <p>{formik.errors.password}</p>
                                ) : null}
                        </div>
                    </div>
                    <div className='form-data'>
                        <button type='submit'>Submit</button>
                    </div>
                </div>
            </form>
            <div className={`error-message ${isError ? 'show' : ''}`}>
                <p>Invalid username or password</p>
            </div>
        </section>
        </>

    )
}

export default Login
