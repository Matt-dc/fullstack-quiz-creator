import React, { Component } from 'react'
import axios from 'axios';
import QuizDetails from './QuizDetails'
import QuestionInput from './QuestionInput'
import QuestionArrayItem from './questionArrayItem'
import QuizHeader from './quizHeader'
import { Link } from 'react-router-dom'
import WarnDelete from '../utils/warnDelete'
import $ from 'jquery';

export default class QuizCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {

                questions_array: [],

                // control props
                isBeingAdded: false,
                isBeingAdded: false,
                isBeingEdited: false,
                redirect: false,
                error: '',

                // saved to DB    
                current_question: {},
                images_array: [],
                images_names: [],
                image: null,    

                quizImage: null, 
                difficulty: null,
                creator: null,
                topic: '',
            }  
            this.setOffset = el => this.offsetTop = el

    }


    componentDidMount(){

            const id  = this.props.match.params.id;

            if(id) {
            axios.get(`http://localhost:5000/${id}`)
            .then(res => {

                this.setState({
                    quizName: res.data.quizName,
                    creator: res.data.creator,
                    topic: res.data.topic,
                    quizImage: res.data.quizImage,
                    difficulty: res.data.difficulty,
                    questions_array: res.data.quiz.map(question =>  question),
                    images_names: res.data.quiz.map(q => q.imageName),
                    editQuiz: true
                });
            });

        } else {
            this.setState({ 
                createQuiz: true 
            })
        }
    }
    


// ############## Helper functions ############### //

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

    handleQuizImage = img => {
        var imagesArrayWithMain = [img.target.files[0]].concat(this.state.images_array)

        this.setState({
            quizImage: img.target.files[0].name,
            images_array: imagesArrayWithMain,
        })
    }

    handleAddNewQuestion = () => {
        this.setState({
            isBeingAdded: true,
        });
    }

    closeInputFormAndReset = () => {
        this.setState({
            isBeingAdded: false,
            isBeingEdited: false,
        }, () => this.unsetQuestion())
    }

    scrollToInputFormEdit = () => {
        if(this.offsetTop) this.offsetTop.scrollIntoView({ behavior: 'smooth' })
    }



    //################ Main: ADD EDIT UPDATE #############//

     addNewQuestionToArray = e => {
        e.preventDefault();  
       
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
                }, () => {  

                    this.setState({ // set questions_array
                        questions_array: [ ...this.state.questions_array, this.state.current_question ],
                        isBeingAdded: false,
                    } , () => this.unsetQuestion() );
                    });
                });
            };
        }  
    
      


    // Passes question into input form for editing
    editQuestion = clickedQuestion => {

        this.scrollToInputFormEdit()

        this.state.questions_array.map(questionToEdit => {
            if(questionToEdit.question === clickedQuestion.question) {
            return this.setState({
                isBeingEdited: true,
                editedQuestion: clickedQuestion.question,
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
    saveEditedQuestion = () => {
    
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
            isBeingEdited: false,
        }, () => this.unsetQuestion())
    }  



    // form a quiz object from the updated quiz details and questions array, then save object to the db
    saveQuiz = () => {

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

        let quizImage;
        if(this.state.quizImage == null){
            quizImage = `topic-${this.state.topic}.jpeg`
        } else {
            quizImage = this.state.quizImage
        }

        const quiz_object = {
            quizName: this.state.quizName,
            quizImage: quizImage,
            creator: this.state.creator,
            topic: this.state.topic,
            difficulty: this.state.difficulty,
        }

        const config = { headers: { 'Content-Type' : 'multipart/form-data' }}

        let formData = new FormData();

        // append quiz details and stringified questions_array data to FormData
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

        if(this.state.editQuiz) {
           
                axios.put(`http://localhost:5000/edit/${id}`, formData, config)
                .then(res => {
                    const id = res.data._id
                    this.renderRedirect(id)
                })       

        } else if (this.state.createQuiz){if (this.state.createQuiz)
           
                axios.post('http://localhost:5000/create', formData, config)
                .then(res => {
                    const id = res.data._id
                    this.renderRedirect(id)
                })
            }

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
            editedQuestionIndex: null,            
            error: '',
        }, () => this.unsetQuestion())    
    }



    render() {
        return (

            <div className="container">
                <div className="col m6">
                
                <div className="row center quiz-creator-title" >
                    <div className="col s12 m12">
                        <h2>
                            {this.state.editQuiz && "Edit Quiz "}    
                            {this.state.createQuiz && "Create Quiz"}    
                        </h2> 
                    </div>
                </div>
 
                <div className="section" >
                    <div className="row">

                    <QuizHeader 
                        isBeingEdited={this.state.isBeingEdited}
                        questions_array={this.state. questions_array}
                        saveQuiz={this.saveQuiz}
                        handleAddNewQuestion={this.handleAddNewQuestion}
                    />
                    <p>{this.state.error}</p>
                    
                    <div ref={this.setOffset}></div>

                </div>
            </div>
                

            {(this.state.isBeingAdded || this.state.isBeingEdited) && 
                   
                    <QuestionInput 
                       
                        {...this.state}
                        handleInput={this.handleInputChange} 
                        saveEditedQuestion={this.saveEditedQuestion}
                        addNewQuestionToArray={this.addNewQuestionToArray}
                        handleFileUpdate={this.handleFileUpdate}
                        closeInputFormAndReset={this.closeInputFormAndReset}
                    />
                    
                    }   

                <QuizDetails 
                     { ...this.state }
                     topic={this.state.topic}
                    onChange={this.handleInputChange} 
                    saveQuiz={this.saveQuiz}
                    handleQuizImage={this.handleQuizImage}
                />



                {this.state.questions_array.map(question => (
                <ul>             
                    <QuestionArrayItem
                        {...this.state}  
                        quizObj={question}
                        onChange={this.handleInputChange} 
                        updateQuiz={this.updateQuiz}
                        addNewQuestionToArray={this.addNewQuestionToArray}
                        editQuestion={() =>this.editQuestion(question)}
                        deleteQuestion={() =>this.deleteQuestion(question)}   
                    />        
                </ul>      
                ))
                }

                </div>
                    <WarnDelete 
                        deleteQuiz={this.deleteQuiz}
                    />

            </div>

        );
        
    }
}

