import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import './Header.css'

function Header({ user, setUser }) {
    const navigate = useNavigate()

    function handleLogout() {
        setUser(null)
        Cookies.remove('userId', { path: '/' })
        navigate('/')
    }
    return (
        <>
        <header className='header-container'>
            <h3>group-task-manager</h3>
            <div className='header-buttons'>
                {Cookies.get('userId') || user ? (
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
            <nav className="navbar navbar-expand-lg bg-body-tertiary mt-3 position-sticky">
                <div className="container-fluid d-flex justify-content-center text-center">
                    <Link to='/dashboard' className="navbar-brand">Dashboard</Link>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/add-task">Add Task</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " aria-current="page" to="/assigned-task">Assigned Task</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Header
