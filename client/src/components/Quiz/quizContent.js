import React from 'react'
import { Link } from 'react-router-dom'

//count, answers,
export default function QuizContent( props ) {


    return (
       
        <div className="container">
            <h5>Question {props.count+1}</h5>

            <img style={{width:"400px"}} src={`http://localhost:5000/${props.quiz[props.count].imageName}`} />
            
            <h3>{props.quiz[props.count].question}</h3>

                    {props.quiz[props.count].question_options.map(option => (
                        <div className="row">
                            <div className="col m10 s10" className="center">
                                <div className={props.current_choice === option ? "card chosen" : "card option"}>
                                    <div className="card-content" onClick={props.handleChoice}>{ option }</div>
                                </div>
                            </div>   
                        </div>
                        ))
                    }

            <p>{ props.error }</p>

            <div className="row">
                <Link className="btn-large" onClick={props.nextQuestion}>Next question</Link>
            </div>
        </div>

)

}
