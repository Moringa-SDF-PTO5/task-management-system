import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5555/users/${userId}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error('Error fetching user:', error));
    }, [userId]);

    const handleDelete = (taskId) => {
        fetch(`http://localhost:5555/tasks/${taskId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                setUser({
                    ...user,
                    tasks: user.tasks.filter(task => task.id !== taskId)
                });
            }
        })
        .catch(error => console.error('Error deleting task:', error));
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>{user.userName}'s Details</h1>
            <h2>Tasks</h2>
            <ul>
                {user.tasks.map(task => (
                    <li key={task.id}>
                        {task.title} <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <Link to="/add-task">Add Task</Link>
            <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        </div>
    );
};

export default UserDetails;
