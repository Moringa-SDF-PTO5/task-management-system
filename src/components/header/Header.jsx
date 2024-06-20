import { useNavigate } from 'react-router-dom'
import './Header.css'

function Header({ user, setUser }) {
    const navigate = useNavigate()

    function handleLogout() {
        setUser(null)
        navigate('/')
    }
    return (
        <header className='header-container'>
            <h3>group-task-manager</h3>
            <div className='header-buttons'>
                {user ? (
                    <button
                        type='button'
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                ) : (
                    <>
                        <button
                            type='button'
                            onClick={() => navigate('/signup')}
                        >
                            Sign Up
                        </button>
                        <button
                            type='button'
                            onClick={() => navigate('/login')}
                        >
                            Log In
                        </button>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
