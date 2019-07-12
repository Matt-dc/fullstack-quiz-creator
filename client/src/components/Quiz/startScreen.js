import React from 'react'
import { Link } from 'react-router-dom'

export default function startScreen( props ) {
    
    return (
        <div className="row">
            <div className="card">
                <div className="card-content">
                    <h1>{props.name}</h1>
                    <Link className="btn-large" onClick={props.startQuiz} >Start Quiz</Link>
                </div>
            </div>
        </div>
    )
}
