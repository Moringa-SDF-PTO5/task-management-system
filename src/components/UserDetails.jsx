import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import './UserDetails.css'
import Changestatus from './changestatus'

const UserDetails = () => {
    const { userId } = useParams()
    const [user, setUser] = useState([])
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/user/${userId}`)
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                const data = await response.json()
                setUser(data.data)
                setTasks(data.tasks)
            } catch (error) {
                console.error('Error fetching user:', error)
            }
            
        }

        fetchUser()
    }, [userId])
    
    const handleDelete = (taskId) => {
        fetch(`http://localhost:5000/api/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setUser((prevUser) => ({
                        ...prevUser,
                        tasks: prevUser.tasks.filter(
                            (task) => task.id !== taskId
                        ),
                    }))
                }
            })
            .catch((error) => console.error('Error deleting task:', error))
    }

    if (!user) return <div>Loading...</div>
    console.log(user)
    return (
        <div className='user-details-container'>
            <h1>{user.firstName}'s Details</h1>
            <h2>Tasks</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span>Task Name: {task.title}</span>
                        <span>Status: {task.status}</span>
                        <Changestatus
                            userId={task.id}
                            title={task.title}
                            status={task.status}
                        >
                            changestatus
                        </Changestatus>
                        <button onClick={() => handleDelete(task.id)}>
                            <span className='material-icons'>delete</span>
                        </button>
                    </li>
                ))}
            </ul>
            <Link to='/add-task'>Add Task</Link>
            <button
                onClick={() => navigate('/dashboard')}
                className='bckdashboard'
            >
                Back to Dashboard
            </button>
        </div>
    )
}

export default UserDetails
