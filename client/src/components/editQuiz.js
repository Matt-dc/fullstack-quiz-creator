import React, { Component } from 'react'
import axios from 'axios';
import QuizDetails from './QuizDetails'
import QuestionInput from './QuestionInput'
import Question from './Question'
import { Redirect, Link } from 'react-router-dom'

export default class EditQuiz extends Component {

    constructor(props) {
        super(props);

        this.state = {
         
                quizData: {},
                questions_array: [{ 
                                    question: '',
                                    question_options: [],
                                    imageName:'',
                                    correct_answer: ''
                                }],
                option_1: '',
                option_2: '',
                option_3: '',
                option_4: '',
                current_question: {},
                images_array: [],
                images_names: [],
                image: null,
                error: '',
                isBeingAdded: false,
                isBeingUpdated: false,
                redirect: false,
            }  
    }


    componentWillMount(){
        const { id } = this.props.match.params;
        axios.get(`http://localhost:5000/${id}`)
        .then(res => {
            this.setState({
                quizData: res.data,
                quizName: res.data.quizName,
                creator: res.data.creator,
                topic: res.data.topic,
                difficulty: res.data.difficulty,
                questions_array: res.data.quiz.map(question =>  question),
                images_names: res.data.quiz.map(q => q.imageName),
            });
        });
    }
    


    // updates all the input fields
    handleInputChange = val => {
        this.setState({
            [ val.target.name] : val.target.value,
        });
    }


    handleFileUpdate = img => { 
        this.setState({
            image: img.target.files[0],
            edited_image: img.target.files[0].name, 
        }); 
    }


     // adds a newly filled out question to the questions_array
     addQuestion = e => {
        e.preventDefault();  

        this.setState({
            isBeingAdded: true
        });
       
        if(!this.state.question || !this.state.correct_answer || !this.state.option_1|| !this.state.option_2 || !this.state.option_3 || !this.state.option_4 ) {
            this.setState({
                error: "Please fill out all fields"
            });     
            return 

        } else {
            this.setState({ // create the arrays
                options: [ this.state.option_1, this.state.option_2, this.state.option_3, this.state.option_4 ],
                images_array: [ ...this.state.images_array, this.state.image]
            }, () => {
                this.setState({ // build the object
                    current_question: {
                        question: this.state.question,
                        question_options: this.state.options,
                        correct_answer: this.state.correct_answer,
                        imageName: this.state.edited_image,
                    },
                    question_counter: this.state.question_counter + 1,
                }, () => {  // set questions_array
                    this.setState({
                        questions_array: [ ...this.state.questions_array, this.state.current_question ],
                    } , () => {
                        this.setState({ // empty out state
                            current_question: {},
                            question: '',
                            option_1: '',
                            option_2: '',
                            option_3: '',
                            option_4: '',
                            options: [],
                            correct_answer: '',
                            image: null,
                            image_name: null,
                            isBeingAdded: false,
                        });
                    });
                });
            });
        }  
    }


    //passes each of the questions into the input form for editing
    editQuestion = clickedQuestion => {
        this.setState({
            isBeingUpdated: true
        })
        console.log(clickedQuestion)
        this.state.questions_array.map(questionToEdit => {
                if(questionToEdit.question === clickedQuestion.question) {
                return this.setState({
                    isBeingUpdated: true,
                    editedQuestionIndex: this.state.questions_array.indexOf(clickedQuestion), //question prop of clicked question
                    question: questionToEdit.question,
                    edited_image: questionToEdit.imageName,
                    option_1: questionToEdit.question_options[0],
                    option_2: questionToEdit.question_options[1],
                    option_3: questionToEdit.question_options[2],
                    option_4: questionToEdit.question_options[3],
                    correct_answer: questionToEdit.correct_answer,
                    // questions_array: edited_array,
                });  
            } else {
                return questionToEdit
            }
        });     
    }

    // save the edited question, push to the questions array and empty the inputs
    updateQuestion = () => {
    
        const questionToUpdate = {
            imageName: this.state.edited_image,
            question: this.state.question,
            question_options: [ this.state.option_1, this.state.option_2, this.state.option_3, this.state.option_4 ],
            correct_answer: this.state.correct_answer,
        }

        const { questions_array } = this.state;  
        const updatedQuestionsArray = [ ...questions_array ]; 
        updatedQuestionsArray[this.state.editedQuestionIndex] = questionToUpdate // set the array element to the new updated question
        
        this.setState({
            quizName: this.state.quizName,
            creator: this.state.creator,
            questions_array: updatedQuestionsArray,
            images_array: [ ...this.state.images_array, this.state.image ],
            isBeingUpdated: false,
        }, () => this.unsetQuestion())
    }  


    // form a quiz object from the updated quiz details and questions array, then save object to the db
    handleUpdate = e => {
        e.preventDefault();  

        if(!this.state.quizName || !this.state.creator) {
            this.setState({
                error: "The quiz needs a name and an author"
            });     
            return
        } 

        if(!this.state.topic || this.state.topic === "") {
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

//append quiz details and stringified questions_array data to FormData
        for (var key in quiz_object) {
            formData.append(key, quiz_object[key]);
        }

        formData.append('quiz', JSON.stringify(this.state.questions_array))

// append edited images from array to form data
        this.state.images_array.map(img => { 
            formData.append('images', img)
        });
        this.setState({
            formData: formData,
        });

        const { id } = this.props.match.params;

        axios.put(`http://localhost:5000/${id}`, formData, config)
            .then(res => {
                const id = res.data._id
                this.renderRedirect(id)
            })
            this.unsetQuiz()
    }       
     

    renderRedirect = id => {
        let history = this.props.history.location.pathname;
        this.props.history.push('/success', {state: { prevPath: history, quizId: id }} )

    }    

        
    // remove quiz from the db
    deleteQuiz = () => {
        const { id } = this.props.match.params;
        const url = `http://localhost:5000/delete/${id}`
         axios.delete(url) 
        .then(res => {
            this.props.history.push('/')
          console.log(res.data)
        });
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

            <div>
                <div className="container">
                <div className="col m6">
                    <h2 className="center">Quiz Edit</h2>   
                
                    <div className="section">
                        <div className="row">
                            <div className="col m4 center">
                                {!this.state.isBeingUpdated  && this.state.questions_array.length >0 && 
                                <Link className="waves-effect waves-light btn-large grey" onClick={this.handleUpdate}>Finish and Save</Link>}   
                        </div>
                            <div className="col m4 center">
                                {!this.state.isBeingUpdated  && <Link className="waves-effect waves-light btn-large green"  
                                onClick={()=>this.setState({ isBeingAdded: true})} >New question</Link>}
                            </div>
                            <div className="col m4 center">
                            <Link className="waves-effect waves-light btn red" onClick={this.deleteQuiz}>Delete Quiz</Link>
                            </div>
                        </div>
                        
                        <p>{this.state.error}</p>
                    </div>

                    {(this.state.isBeingUpdated || this.state.isBeingAdded) && 

                    <QuestionInput 
                        {...this.state}
                        handleInput={this.handleInputChange} 
                        updateQuestion={this.updateQuestion}
                        addQuestion={this.addQuestion}
                        handleFileUpdate={this.handleFileUpdate}
                    />
                    }    

                    <QuizDetails 
                        onChange={this.handleInputChange} 
                        quizName={this.state.quizName}
                        creator={this.state.creator}
                        topic={this.state.topic}
                        difficulty={this.state.difficulty}
                        questions_array={this.state.questions_array}
                        saveQuiz={this.handleUpdate}
                        error={this.state.error}
                    />


                    {this.state.questions_array.map(question => (
                    <ul>             
                        <Question
                            {...this.state}  
                            quizObj={question}
                            onChange={this.handleInputChange} 
                            updateQuiz={this.updateQuiz}
                            addQuestion={this.addQuestion}
                            editQuestion={()=>this.editQuestion(question)}
                            deleteQuestion={()=>this.deleteQuestion(question)}   
                        />        
                    </ul>      
                    ))
                    }

                    </div>
                </div>
            </div>
        );
        
    }
}

