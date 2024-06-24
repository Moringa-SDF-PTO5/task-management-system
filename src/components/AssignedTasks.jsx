import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import './AssignedTasks.css'
const AssignedTask = () => {
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [assigns, setAssigns] = useState([])
    const BASE_URL = ''
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/users`)
            .then((response) => response.json())
            .then((data) => setUsers(data.data))
            .catch((error) => console.error('Error fetching users:', error))

        fetch(`http://127.0.0.1:5000/api/tasks`)
            .then((response) => response.json())
            .then((data) => setTasks(data.data))
            .catch((error) => console.error('Error fetching tasks:', error))
        
        fetch(`http://127.0.0.1:5000/api/assigned`)
            .then((response) => response.json())
            .then((data) => setAssigns(data.data))
            .catch((error) => console.error('Error fetching tasks:', error))
    }, [])

    const formSchema = Yup.object().shape({
        user_id: Yup.string().required('Required'),
        task_id: Yup.string().required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            user_id: '',
            task_id: '',
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/assigned`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                })
                if (response.ok) {
                    const data = await response.json()
                    alert('Task added successfully!')
                    console.log('New task:', data)
                    navigate('/dashboard')
                } else {
                    const data = await response.json()
                    alert("Error posting")
                    console.error('Backend error:', data)
                    throw new Error(data.error || 'Failed to add task')
                }
                // const data = await response.json()

                // if (response.status === 200) {
                //     setUser(data)
                //     Cookies.set('userId', data.id, {
                //         path: '/',
                //     })
                //     navigate('/dashboard')
                // } else {
                //     setIsError((isError) => !isError)
                // }
            } catch (error) {
                console.log(error)
            }
        },
    })

    // console.log(assigns)
    return (
        <>
            <div className="assigned-container">
                <h4>Assigned Task</h4>
                <form onSubmit={formik.handleSubmit} className='m-3 p-3'>
                    <div className="row">
                        <div className="row mb-3">
                                <label htmlFor='userName' className="col-sm-2 col-form-label">Assigned To</label>
                                <div className="col-sm-10">
                                    <select name="user_id" id="" className="form-control">
                                        {users.map((user) => (
                                            <option
                                                value="{user.id}"
                                                key={user.id}
                                            >
                                                {user.firstName} {user.lastName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor='password' className="col-sm-2 col-form-label">Task</label>
                            <div className="col-sm-10">
                                <select name="task_id" id="" className="form-control">
                                    {tasks.map((task) => (
                                        <option value="{task.id}" key={task.id}>{task.description} </option>
                                    ))}
                                </select>
                                
                            </div>
                        </div>
                        <div className='form-data'>
                            <button type='submit'>Submit</button>
                        </div>
                    </div>
                </form>
                <ul>
                <table className="table table-striped">
                    
                        <tbody>
                            <tr>
                                <td>id</td>
                                <td>Assign</td>
                                <td>Task</td>
                            </tr>
                            {assigns.map((assign) => (
                                <tr key={assign.id}>
                                    <td>{assign.id}</td>
                                    <td>{assign.user_id}</td>
                                    <td>{ assign.task_id}</td>
                                </tr>
                        ))}
                        </tbody>
                    </table>
                </ul>
            </div>
            
        </>
    )
}

export default AssignedTask;