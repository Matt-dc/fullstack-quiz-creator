import React, { Component } from 'react'
import axios from 'axios';
import QuizDetails from './QuizDetails'
import QuestionInput from './QuestionInput'
import Question from './Question'
import { Link } from 'react-router-dom'


export default class QuizCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
                quizId:'',
                quizName: '',
                creator:'',
                topic:'',
                difficulty: '',
                question:'',
                options: [],
                correct_answer: '',
                question_counter: 1,
                isBeingUpdated: false,
                editedQuestionIndex: null,
                current_question_completed: false,
                current_question:{},
                questions_array: [],
                image: null,
                images_array: [],
                error: '',
            }  
    }

    
    // updates all the input fields
    handleInputChange = val => {
        this.setState({
            [ val.target.name] : val.target.value,
            error:'',
        });
    }


    handleFileUpdate = img => { 
        this.setState({
            image: img.target.files[0],
            edited_image: img.target.files[0].name, 
        }); 
    }


// push quesiton to questions array
    addQuestion = e => {
        e.preventDefault();  
       
        if(!this.state.question || !this.state.correct_answer || !this.state.option_1|| !this.state.option_2 || !this.state.option_3 || !this.state.option_4 ) {
            this.setState({
                error: "Please fill out all fields"
            });     
            return 

        } else {
            this.setState({
                options: [ this.state.option_1, this.state.option_2, this.state.option_3, this.state.option_4 ],
                images_array: [ ...this.state.images_array, this.state.image]
               
            }, () => {
                this.setState({
                    current_question: {
                        question: this.state.question,
                        question_options: this.state.options,
                        correct_answer: this.state.correct_answer,
                        imageName: this.state.image_name,
                },
                question_counter: this.state.question_counter + 1,
                }, () => {
                    this.setState({
                        questions_array: [ ...this.state.questions_array, this.state.current_question ],
                    }, () => this.unsetQuestion()
                    );
                });
            });
        }  
    }

// Edit a question from the questions array
    editQuestion = clickedQuestion => {
        this.state.questions_array.map(questionToEdit => {
             if(questionToEdit.question === clickedQuestion.question) {
                return this.setState({
                    isBeingUpdated: true,
                    editedQuestionIndex: this.state.questions_array.indexOf(clickedQuestion), //question prop of clicked question
                    question: questionToEdit.question,
                    option_1: questionToEdit.question_options[0],
                    option_2: questionToEdit.question_options[1],
                    option_3: questionToEdit.question_options[2],
                    option_4: questionToEdit.question_options[3],
                    correct_answer: questionToEdit.correct_answer,
                })  
            } else {
                return questionToEdit
            }
        });     
    }


    handleSubmit = e => {
        e.preventDefault();  

// Check form fields are filled out
        if(!this.state.quizName || !this.state.creator) {
            this.setState({
                error: "The quiz needs a name and an author"
            });     
            return
        } 
        if(!this.state.topic) {
            this.setState({
                error: "Please choose a topic for your quiz"
            });     
            return
        }
        if(!this.state.difficulty) {
            this.setState({
                error: "Please choose a difficulty level"
            });     
            return
        }
        const quiz_object = {
            quizName: this.state.quizName,
            creator: this.state.creator,
            topic: this.state.topic,
            difficulty: this.state.difficulty,
        }
        const config = { headers: { 'Content-Type' : 'multipart/form-data' }}

        let formData = new FormData();

        for (var key in quiz_object) {
            formData.append(key, quiz_object[key]);
        }
        formData.append('quiz', JSON.stringify(this.state.questions_array))

        this.state.images_array.map(img => {
            return formData.append('images', img)
        });
        axios.post('http://localhost:5000/create', formData, config)
        .then(res => {
            const id = res.data._id
            this.renderRedirect(id)
        })
        this.unsetQuiz()
    }   

    renderRedirect = id => {
        let history = this.props.history.location.pathname;
        this.props.history.push('/success', { state: { prevPath: history, quizId: id }} )

    }    
    

    // remove question from questions_array
    deleteQuestion = q => {
        this.setState({
            questions_array: this.state.questions_array.filter(el => {
                return el !== q
            })
        });
    }   


    unsetQuestion = () => {
        this.setState({
            current_question: {},
            question: '',
            option_1: '',
            option_2: '',
            option_3: '',
            option_4: '',
            options: [],
            correct_answer: '',
            image: null,
        });
    }


    unsetQuiz = () => {
        this.setState({
            questions_array: [],            
            quizName: '',
            creator: '',
            topic: '',
            difficulty: '',
            isBeingUpdated: false,
            editedQuestionIndex: null,            
            error: '',
        }, () => this.unsetQuestion())    
    }


    render() {

        return (

            <div className="container">
                <div className="col m6">
                    <h2>Create Quiz</h2>

                        <Link className="btn-large green" onClick={this.handleSubmit}>Save Quiz</Link>

                        <QuizDetails 
                            {...this.state}
                            onChange={this.handleInputChange} 
                            saveQuiz={this.handleSubmit}
                        />

                        <QuestionInput 
                            {...this.state}
                            handleInput={this.handleInputChange} 
                            updateQuestion={this.updateQuestion}
                            addQuestion={this.addQuestion}
                            handleFileUpdate={this.handleFileUpdate}
                        />

                    {this.state.questions_array.map(q => (
                        <Question
                            {...this.state}  
                            question={q.question}    
                            correct_answer={q.correct_answer}                    
                            questionNumber={this.state.questions_array.indexOf(q)+1}           
                            onChange={this.handleInputChange} 
                            updateQuiz={this.updateQuiz}
                            addQuestion={this.addQuestion}
                            imageName={q.imageName}
                            editQuestion={()=>this.editQuestion(q)}
                            deleteQuestion={()=>this.deleteQuestion(q)}   
                            question_options={q.question_options}
                            
                        />        
                    ))}
                </div>
            </div>
        );
    }
}

