import React from 'react'
import { Link } from 'react-router-dom'

const Success = (props) => {

    const prevPath = props.history.location.state.state.prevPath === 
        "/create" ? 
            "Quiz created successfully" : 
                "Quiz updated successfuly"

    const quizId = props.history.location.state.state.quizId;

    return (
        <div className="container center">

            <h2>{prevPath}</h2>

            <div className="row">
                <Link className="btn-large" to={quizId}>
                    Try it now
                </Link>
            </div>

            <div className="row">
                <Link className="btn-large" to='/'>Back to home</Link>
            </div>

            {/* {JSON.stringify(props.history)} */}
            {/* {JSON.stringify(prevPath)} */}


        </div>
    )
}


export default Success