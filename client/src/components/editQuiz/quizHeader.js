import React from 'react';
import { Link } from 'react-router-dom'


const QuizHeader = ({ isBeingEdited, saveQuiz, questions_array, handleAddNewQuestion,  }) => {
    return (
        <div>
            
            {/* finish and save */}
            <div className="col m4 s12 center" style={{ margin: '0.6em 0' }}>
                        
                <Link className="waves-effect waves-light btn-large grey" 
                    disabled={questions_array.length === 0 || isBeingEdited} 
                    onClick={() => saveQuiz()}>Save Quiz</Link>
            </div>

            {/* new question      */}
            <div className="col m4 s12 center">
                { <Link className="waves-effect waves-light btn-large green" 
                    style={{ margin: '0.6em 0' }}
                disabled={isBeingEdited} 
                onClick={()=> handleAddNewQuestion() } >New question</Link>}
            </div>

            {/* delete */}
            <div className="col m4 s12 center">
                <Link data-target="modal1" className="modal-trigger waves-effect waves-light btn-large red" 
                    style={{ margin: '0.6em 0' }}
                disabled={isBeingEdited}                             
                >Delete Quiz</Link>
            </div>
        </div>
    )
}

export default QuizHeader