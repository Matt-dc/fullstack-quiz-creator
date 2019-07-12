import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import Question from '../Question'
import { QuizConsumer } from '../../context'
import AnsweredQuestion from './answeredQuestion'

export default class QuizEnd extends Component {


    render() {

        return (
        
            <div className="container">
                <h1>Your score is {this.props.score} {this.props.score > 2 }</h1>
                <Link className="btn-large" onClick={this.props.resetQuiz} >Reset Quiz</Link>
                <Link className="btn-large" to={'/home'}>Back to quizzes</Link>


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