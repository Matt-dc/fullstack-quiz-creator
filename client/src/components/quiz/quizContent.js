import React from 'react'
import { Link } from 'react-router-dom'

//count, answers,
export default function QuizContent( props ) {


    return (
       
        <div className="container">
            <div className="row">
                <div className="col l12 m8 s12 center">
                    <h6>Question {props.count+1}</h6>
                <div>
            </div>
            <div className="row">
                <div className="col center s12 m8 l12 offset-m2">
                    {'imageName' in props.quiz[props.count] && <img height="150px" src={`http://localhost:5000/${props.quiz[props.count].imageName}`} /> }
                </div>
            </div>
                    </div>    
                    <h5>{props.quiz[props.count].question}</h5>
                        {props.quiz[props.count].question_options.map(option => (
                            <div className="col m12 s12 center">
                                <div className={props.current_choice === option ? "card chosen" : "card option"}>
                                    <div className="card-content sth" onClick={props.handleChoice} style={{ fontSize: '1.3em' }}>{ option }</div>
                                </div>
                            </div>   
                            ))
                        }

                    <p  style={{ color: 'red' }}>{ props.error }</p>
                    <div className="row">
                        <div className="col s12" style={{ marginTop: '1.5em' }}>
                            <Link className="btn-large" onClick={props.nextQuestion}>Next question</Link>
                        </div>
                    </div>
                </div>
                <div className="col m2 s2"></div>
            </div> 

)

}
