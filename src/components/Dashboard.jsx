import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const BASE_URL = ''
    useEffect(() => {
        fetch(`https://task-management-system-backend-39v0.onrender.com/api/users`)
            .then((response) => response.json())
            .then((data) => setUsers(data.data))
            .catch((error) => console.error('Error fetching users:', error))

        fetch(`https://task-management-system-backend-39v0.onrender.com/tasks`)
            .then((response) => response.json())
            .then((data) => setTasks(data.data))
            .catch((error) => console.error('Error fetching tasks:', error))
    }, [])
    
    // const allTasks = tasks.map((task) => (
    //             <li key={task.id}>{task.title}</li>
    //         ))
    
    return (
        <div className='dashboard-container'>
            <h1>Dashboard</h1>
            <h2>Users</h2>
            <ul>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th scope="col">Fist name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.firstName}</td>
                                <td>
                                    {user.lastName}
                                </td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td><Link to={`/user/${user.id}`}>View</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </ul>
            <h2>Tasks</h2>
            <ul>
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Description</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.description}</td>
                                <td>{task.start_date}</td>
                                <td>{task.end_date}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
               
            </ul>
            <Link to='/add-task'>Add Task</Link>
        </div>
    )
}

export default Dashboard
