import React from 'react'
import { Link } from 'react-router-dom'

export default function StartScreen( props ) {

    const arr = props.quizImage.split('-') 
        const image = arr[0] === 'topic' 
        ? `/topics/${props.quizImage}` 
        : `http://localhost:5000/${props.quizImage}`
    

    return (
        <div className="row" style={{ margin: '3em 0' }}>
            <div className="col m6 offset-m2 s12">
                <div className="card" style={{ marginTop: '5em' }}>
                    <div className="card-image" style={{ paddingBottom: '2em' }}>
                        <div className="row">
                            <div className="col s12">
                                {props.quizImage && <img src={image} /> }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <h3>{props.name}</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <Link className="btn-large blue" onClick={props.startQuiz} >Start Quiz</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col m3 s3"></div>
        </div>
    )
}
