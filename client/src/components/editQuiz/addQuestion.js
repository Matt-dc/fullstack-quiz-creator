export const  addQuestion = e => {
    
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