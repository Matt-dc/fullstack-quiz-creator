import React from 'react'
import { Link } from 'react-router-dom'

export default function footer() {

    return (

        <footer className="page-footer blue">
            <div className="footer-copyright blue">
                <div className="container center blue">
                © 2019 Copyright &nbsp;   
                <Link className="grey-text text-lighten-4 center" to="/">Matt Cooper</Link>
                </div>
            </div>
        </footer>       
    )
}
