import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './Signup.css'

function Signup() {
    const navigate = useNavigate()

    const formSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        userName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Required'),
        phone: Yup.string().required('Required'),
        password: Yup.string()
            .min(4, 'Password length should be more than 4')
            .max(8, 'Password length should be less than 8')
            .required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            phone: '',
            password: '',
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`/api/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values, null, 2),
                })

                // const data = await response.json()
                if (response.status === 201) {
                    navigate('/login')
                }
            } catch (error) {
                console.log(error)
            }
        },
    })

    return (
        <section className='signup-container p-3 m-3'>
            <h2>Sign Up Form</h2>
            <form onSubmit={formik.handleSubmit} className='m-3 p-3'>
                <div className="row">
                    <div className="row mb-3">
                        <label htmlFor='firstName' className="col-sm-3 col-form-label">First Name</label>
                        <div className="col-sm-9">
                            <input
                                type='text'
                                id='firstName'
                                className="form-control"
                                name='firstName'
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                            {formik.errors.firstName && formik.touched.firstName ? (
                                <p>{formik.errors.firstName}</p>
                                ) : null}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor='lastName' className="col-sm-3 col-form-label">Last Name</label>
                        <div className="col-sm-9">
                            <input
                                type='text'
                                id='lastName'
                                className="form-control"
                                name='lastName'
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                />
                                {formik.errors.lastName && formik.touched.lastName ? (
                                    <p>{formik.errors.lastName}</p>
                                ) : null}
                    
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor='userName' className="col-sm-3 col-form-label">Username</label>
                        <div className="col-sm-9">
                            <input
                                type='text'
                                id='userName'
                                className="form-control"
                                name='userName'
                                onChange={formik.handleChange}
                                value={formik.values.userName}
                                />
                                {formik.errors.userName && formik.touched.userName ? (
                                    <p>{formik.errors.userName}</p>
                                ) : null}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor='email' className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                            <input
                                type='text'
                                id='email'
                                className="form-control"
                                name='email'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            {formik.errors.email && formik.touched.email ? (
                                <p>{formik.errors.email}</p>
                        ) : null}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor='phone' className="col-sm-3 col-form-label">Phone Number</label>
                        <div className="col-sm-9">
                        <input
                            type='text'
                                id='phone'
                                className="form-control"
                            name='phone'
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                        {formik.errors.phone && formik.touched.phone ? (
                            <p>{formik.errors.phone}</p>
                        ) : null}
                    </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor='password' className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                        <input
                            type='password'
                            placeholder='Password'
                            id='password'
                            className="form-control"
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <p>{formik.errors.password}</p>
                        ) : null}
                    </div>
                    </div>
                    
                </div>
                <div className="form-data">
                        <button type='submit'>Submit</button>
                    </div>
            </form>
        </section>
    )
}

export default Signup
