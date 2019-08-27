import React from 'react'
import { Link } from 'react-router-dom'

const QuizItem = props => {
    
    const questions = props.quizItem.quiz.length === 1 ? "Question" : "Questions"

    const arr = props.quizItem.quizImage.split('-')
    const image = arr[0] === 'topic' 
        ? `/topics/${props.quizItem.quizImage}` 
        : `http://localhost:5000/${props.quizItem.quizImage}`


    return (
        <div className="col xl3 l4 m6 s12">
                <div className="card">
                <Link to={{pathname: `/${props.quizItem._id}` }}>

                    <div className="card-image">
                        {props.quizItem.quizImage && <img src={image} height="170px" /> }
                        <span className="card-title card-title-large">{props.quizItem.quizName}</span>
                    </div>
                </Link>

                <div className="card-content">
                    <div className="row center">
                        <div className="col s12">
                            <p className="question-length">{props.quizItem.quiz.length } {questions}</p>
                        </div>  
                    </div>
                    <div className="card-action">
                        <div className="row center">
                            <div className="col s12">
                                <Link className="waves-effect waves-light btn-large" style={{ marginBottom: '1em' }} to={`/${props.quizItem._id}`}>Take quiz</Link>
                            </div>  
                        </div>
                        <div className="row center">
                            <div className="col s12">
                                <Link className="waves-effect waves-light btn-small black" style={{ margin: '0 auto' }} to={{pathname: `/edit/${props.quizItem._id}`, state: { edit: true }}}>Edit quiz</Link>
                            </div>  
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

                    {/* <Link className="btn blue right" to={{pathname: `/edit/${props.quizItem._id}` }}>Edit</Link> */}


export default QuizItem