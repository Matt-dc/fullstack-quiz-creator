import React, { Component } from "react";
import ReactDOM from "react-dom";
import data from '../../data';
import QuizContent from './quizContent';
import QuizEnd from './quizEnd';
import StartScreen from './startScreen';
import axios from "axios";


const QuizContext = React.createContext();

class Quiz extends React.Component {

   constructor(props){
     super(props);
    
      this.state = {
          count:0,
          user_answers: [],
          score: 0,
          quizStart: false,
          quizEnd: false,
          current_choice: '',
          questions_array: {}, 
          quiz: [{ 
                  question: '',
                  question_options: [],
                  imageName:'',
                  correct_answer: ''
                }],
          TF_eval: false,
          symbol:"cross",
          }

      }


// Load in data upon page load
    componentWillMount() {
      const { id } = this.props.match.params;
      
      axios.get(`http://localhost:5000/${id}`)
      .then(res => { 
        this.setState({
          quiz: res.data.quiz,
          questions_array: res.data,
        });   
      });
    }


    startQuiz = () => {
      this.setState({
        quizStart: true  
      });
    }  


    handleChoice = e => {
      this.setState({
          current_choice: e.target.textContent,
          error: '',
        });
       }


    nextQuestion = () => {
      if (this.state.current_choice === '') {
        this.setState({
          error: 'Please choose an answer',
        });
        return;
      } 

      if(this.state.current_choice === this.state.questions_array.quiz[this.state.count].correct_answer) {
        this.setState({
          score: this.state.score + 1,
          TF_eval: true,
          symbol: "tick",
        });
      } 

      const user_answer = {
        user_answer: this.state.current_choice,
        correct_answer: this.state.questions_array.quiz[this.state.count].correct_answer,
        TF_eval: this.state.TF_eval,
        symbol: this.state.symbol
      }

      this.setState({
        user_answers: [ ...this.state.user_answers, user_answer],
        current_choice: '',
        TF_eval: false,
      });


      // end quiz when array end is reached
      if(this.state.count === this.state.quiz.length - 1) {
        this.setState({
           quizEnd: true,
        });
      } else { // else push choice into answers array and increase count
          this.setState({
            count: this.state.count + 1,
          })
      } 
    }
    

    resetQuiz  = () => {
      this.setState({
        quizStart: false,
        count:0,
        user_answers: [],
        score: 0,
        count: 0,
        quizEnd: false,

      })
    }

 render() {

    return  ( 
      
        <div className="container center">
            {!this.state.quizStart ? 

            <StartScreen 
                name={this.state.questions_array.quizName}
                startQuiz={this.startQuiz}
            />   

            :  
              
            this.state.quizEnd ? 
        
            <QuizEnd 
                {...this.state}
                resetQuiz={this.resetQuiz}
            />  

            : 
            
              <QuizContent 
                  {...this.state}
                  nextQuestion={this.nextQuestion} 
                  handleChoice={this.handleChoice} 
                  
              /> 
            } 

        </div> 
    );
  }
}


export default Quiz
