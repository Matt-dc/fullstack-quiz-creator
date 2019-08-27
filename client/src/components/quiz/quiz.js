import React, { Component } from "react";
import ReactDOM from "react-dom";
import data from '../../data';
import QuizContent from './quizContent';
import QuizEnd from './quizEnd';
import StartScreen from './startScreen';
import axios from "axios";


class Quiz extends React.Component {

   constructor(props){
     super(props);
    
      this.state = {
          loading: true,
          quizImage: null,
          count:0,
          user_answers: [],
          score: 0,
          started: false,
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
          }

      }


    componentWillMount() {
      const { id } = this.props.match.params;
      
      axios.get(`http://localhost:5000/${id}`)
      .then(res => { 
        this.setState({
          questions_array: res.data,
          quiz: res.data.quiz,
          quizImage: res.data.quizImage,
          loading: false,
        });   
      });
    }


    startQuiz = () => {
      this.setState({
        started: true  
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

      let user_answer;

      if(this.state.current_choice === this.state.questions_array.quiz[this.state.count].correct_answer) {
         
            let TF_eval = true;
            let symbol = "tick";
          
            user_answer = {
              user_answer: this.state.current_choice,
              correct_answer: this.state.questions_array.quiz[this.state.count].correct_answer,
              TF_eval: TF_eval,
              symbol: symbol
            }

            this.setState({
              user_answers: [ ...this.state.user_answers, user_answer],
              current_choice: '',
              TF_eval: false,
              score: this.state.score + 1,
            });

          } else {

            let TF_eval = false;
            let symbol = "cross";

            user_answer = {
              user_answer: this.state.current_choice,
              correct_answer: this.state.questions_array.quiz[this.state.count].correct_answer,
              TF_eval: TF_eval,
              symbol: symbol
            }

            this.setState({
              user_answers: [ ...this.state.user_answers, user_answer],
              current_choice: '',
              TF_eval: false,
              score: this.state.score + 1,
            })

          }
     

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
        started: false,
        count:0,
        user_answers: [],
        score: 0,
        count: 0,
        quizEnd: false,

      })
    }

 render() {

    if(this.state.loading) {
        return "loading..."
    } else {

    return  ( 
      
        <div className="container center">

       {/* <img src={`/topics/${this.state.quizImage}`} />  */}

            {this.state.quizEnd ? 
        
              <QuizEnd 
                {...this.state}
                resetQuiz={this.resetQuiz}
              />  
              
              :

              this.state.started ?
              
              <QuizContent 
                  {...this.state}
                  nextQuestion={this.nextQuestion} 
                  handleChoice={this.handleChoice} 
              />  
    
              :

            <StartScreen 
                name={this.state.questions_array.quizName}
                startQuiz={this.startQuiz}
                quizImage={this.state.quizImage}
            />  
            
            } 

        </div> 
    );
  }
}
}


export default Quiz
