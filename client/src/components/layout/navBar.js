import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (

        <div>
            <nav className="cyan lighten-3">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo center"><i class="fa fa-question-circle"></i>QuizCreator</Link>
                    <Link to="/" data-target="main-menu" 
                    className="sidenav-trigger"><i className="fa fa-bars"></i></Link>
                    <ul className="left hide-on-med-and-down">
                        <li><Link to={'/home'}>Home</Link></li>
                        <li><Link to={'/create'}>Create a Quiz</Link></li>
                        <li> <Link to={'/home'}>Pick a Quiz</Link> </li>
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="main-menu">
            <li><Link to={'/home'}>Home</Link></li>
            <li><Link to={'/create'}>Create a Quiz</Link></li>
            <li> <Link to={'/home'}>Pick a Quiz</Link> </li>
            </ul>
        </div>

        )
}


export default NavBar
