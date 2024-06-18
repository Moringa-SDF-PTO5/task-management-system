import { useFormik } from 'formik'
import * as Yup from 'yup'
import './Signup.css'

function Signup() {
    const formSchema = Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        userName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid Email').required('Required'),
        phone: Yup.number().positive().integer().required('Required'),
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
            const response = await fetch('http://localhost:5555/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values, null, 2),
            })

            // const data = await response.json()
            if (response.status === 201) {
                alert(response)
            }
        },
    })

    return (
        <section className='signup-container'>
            <h2>Sign Up Form</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-data'>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type='text'
                        placeholder='First Name'
                        id='firstName'
                        name='firstName'
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                    />
                    {formik.errors.firstName && formik.touched.firstName ? (
                        <p>{formik.errors.firstName}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type='text'
                        placeholder='Last Name'
                        id='lastName'
                        name='lastName'
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                    />
                    {formik.errors.lastName && formik.touched.lastName ? (
                        <p>{formik.errors.lastName}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='userName'>Username</label>
                    <input
                        type='text'
                        placeholder='Username'
                        id='userName'
                        name='userName'
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                    />
                    {formik.errors.userName && formik.touched.userName ? (
                        <p>{formik.errors.userName}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='text'
                        placeholder='Email'
                        id='email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <p>{formik.errors.email}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                        type='number'
                        placeholder='Phone Number'
                        id='phone'
                        name='phone'
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                    />
                    {formik.errors.phone && formik.touched.phone ? (
                        <p>{formik.errors.phone}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='text'
                        placeholder='Password'
                        id='password'
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? (
                        <p>{formik.errors.password}</p>
                    ) : null}
                </div>
                <div className='form-data'>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </section>
    )
}

export default Signup