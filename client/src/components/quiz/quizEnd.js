import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import AnsweredQuestion from './answeredQuestion'

export default class QuizEnd extends Component {


    render() {

        return (
        
            <div className="container">
               <div className="row" style={{ marginTop: '5em' }}>
                    <div className="col m8 s12 center">
                        <h4>Your score is {this.props.score} {this.props.score > 2 }</h4>
                    </div>
               </div>
               <div className="row" style={{ marginTop: '3em' }}>
                    <div className="col m4 s6 center">
                        <Link className="btn-large red" onClick={this.props.resetQuiz} >Reset Quiz</Link>
                    </div>
                    <div className="col m4 s6 center">
                        <Link className="btn-large blue" to={'/home'}>Home</Link>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '3em' }}>
                    <div className="col s12 m12 center">
                        <table className="highlight">   
                        <thead>
                            <tr>
                                <th></th>
                                <th>Your Answer</th>
                                <th>Correct answer</th>
                                <th></th>
                            </tr>
                        </thead>
                            <tbody>
                            {this.props.user_answers.map((answer, index) => (
                                        
                                    <AnsweredQuestion
                                        index={index}
                                        answer={answer}  
                                    />        
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            )
    }
}


// answers_array.map((answer, i) => {
//     if(answer === questions_array[i].correct_answer) {
//         answer.style.color = green;
//         answer.append(tick)
//     } else {
//         answer.style.textDecoration = "line-through"
//         answer.style.color = "red";
//         correct_answer.style.color = "green"
//     }
// })