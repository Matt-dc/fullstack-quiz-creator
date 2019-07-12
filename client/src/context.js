import React, { Component } from 'react'


const QuizContext = React.createContext();
//


export default class QuizProvider extends Component {

// set the context at the top
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


    render() {
    
        return (

            <QuizContext.Provider value={{
                ...this.state
            }}>
                 { this.props.children }   
            </QuizContext.Provider>

        )
    }
}


const QuizConsumer = QuizContext.Consumer;

export { QuizProvider, QuizConsumer };