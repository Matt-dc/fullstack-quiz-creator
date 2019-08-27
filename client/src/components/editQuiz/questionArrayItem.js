import React from 'react'
import { Link } from 'react-router-dom'

export default function QuestionArrayItem(props) {

        let editStyle;
        if (props.isBeingEdited && props.quizObj.question === props.editedQuestion){
            editStyle = "container question-under-edit"
        } else if (props.isBeingEdited) {
            editStyle = "container question-not-under-edit" 
        } else {
            editStyle = "container" 
        }
          

    return (
    

    <div className={editStyle} >
           
            <div className="row center">
                <div className="col s12 m8 offset-m2 center">
                    <div className="card "  style={{ paddingBottom: '2.4em' }}>
                        <div className="card-image">
                            {props.quizObj.imageName && 
                            <img src={`http://localhost:5000/${props.quizObj.imageName}`} height="150px" />}  
                        </div>
                        <div className="card-content">
                            <div className="card-title">
                                Question number: {props.questions_array.indexOf(props.quizObj)+1}
                            </div>
                            <div className="card-action">
                                <div className="col m6 s6 center">
                                    <Link className="waves-effect waves-light btn-large green" disabled={props.isBeingEdited || props.isBeingAdded} onClick={props.editQuestion}>Edit</Link>
                                </div>    
                                <div className="col m6 s6 center">
                                    <Link className="waves-effect waves-light btn-large red" disabled={props.isBeingEdited || props.isBeingAdded} onClick={props.deleteQuestion}>Delete</Link>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
            {/*  end of row */}

            <div className="row">
                
                <div className="col s12">
                { props.isBeingEdited && <p className="under-edit-tag">Under edit</p> }
                    
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
        {/*  end of row */}

    </div>
                 
    );
}
