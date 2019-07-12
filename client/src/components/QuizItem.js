import React from 'react'
import { Link } from 'react-router-dom'

const QuizItem = props => {
    
    const questions = props.quizItem.quiz.length === 1 ? "question" : "questions"

    return (
        <div className="col m3 s4">

            <div className="card">
            <Link to={{pathname: `/${props.quizItem._id}` }}>

                <div className="card-image">
                    {!props.quizItem.mainImage ? <img src="https://via.placeholder.com/150?text=Quiz" /> : <img src={props.quizItem.mainImage} /> }
                    <span className="card-title">{props.quizItem.quizName}</span>
                </div>
            </Link>

                <div className="card-content center">
                    <p>{props.quizItem.quiz.length } {questions} </p>
                    <div className="card-action">
                        <Link className="waves-effect waves-light btn red" to={`/edit/${props.quizItem._id}`}>Edit quiz</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

                    {/* <Link className="btn blue right" to={{pathname: `/edit/${props.quizItem._id}` }}>Edit</Link> */}


export default QuizItem