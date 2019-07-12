import React from 'react'
import { Link } from 'react-router-dom'

export default function Question(props) {
    return (
        <div className="container">
           
            <div className="row">
                <div className="col s12 m12">
                    <div className="card horizontal">
                        <div className="card-image">
                            {props.quizObj.imageName && 
                            <img src={`http://localhost:5000/${props.quizObj.imageName}`} style={{width:"400px"}} />}  
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                <div className="card-title">Question number: {props.questions_array.indexOf(props.quizObj)+1}</div>
                            </div>
                            <div className="card-action">
                            <div className="col m6 center">
                                <Link className="waves-effect waves-light btn-large green" onClick={props.editQuestion}>Edit Question</Link>
                            </div>    
                            <div className="col m6 center">
                                <Link className="waves-effect waves-light btn-large red" onClick={props.deleteQuestion}>Delete Question</Link>
                            </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>  {/*  end of row */}

            <div className="row">
                {props.isBeingUpdated && <p>Under edit</p>}
                
                <table className="highlight">
                        
                <tbody>
                    <tr>
                        <td>Question</td><td>{props.quizObj.question}</td>
                    </tr>
                        {props.quizObj.question_options.map(opt => (
                    <tr>
                        <td>Option</td><td>{opt}</td>
                    </tr>
                    ))}
                    <tr>
                        <td>Correct answer</td><td>{props.quizObj.correct_answer}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
                 
    );
}
