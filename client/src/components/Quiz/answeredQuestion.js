import React from 'react'

const AnsweredQuestion = props => {

    const evaluation = props.answer.symbol==="tick" ? "correct" : "incorrect"

    return (

        <React.Fragment>
            <tr>
                <td>Question {props.index+1}</td>
                <td className={evaluation}>{props.answer.user_answer}</td>
                <td>{props.answer.correct_answer}</td>
                <td>{props.answer.symbol === "tick" ? <i class="fa fa-check"></i>  :  <i class="fa fa-times"></i> }</td>
            </tr>
        </React.Fragment>
                   
    )
}


export default AnsweredQuestion
