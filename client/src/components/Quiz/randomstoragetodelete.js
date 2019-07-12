 
 const data_array = Object.keys(data).map(key => data[key])

 
 questions: data_array.map(qn => qn.question),
          options: data_array.map(opt => opt.options),
          answers: data_array.map(ans => ans.answer),
          count:0,
          user_answers: [],
          score: 0,
          quizStart: false,
          quizEnd: false,
          current_choice: -1,    







          

          { [...Array(this.state.question_counter)].map((e, i) => (
              <QuizInput 
              changeHandler={this.changeHandler} 
              error={this.state.error}
          />
          )) }





           let { name, value } = e.target;
        this.setState({
            ...this.state, 
            current_question: {
                [name]: value
            }
        })


        if (
            (this.state.current_question.question_1 !==  '') &&
            (this.state.current_question.option_1 !== '') &&
            (this.state.current_question.option_2 !==  '') &&
            (this.state.current_question.option_3 !==  '') &&
            (this.state.current_question.option_4 !== '') &&
            (this.state.current_question.correct_answer !==  '')
           ) {
            this.setState({ current_question_completed: true })
      } 
    }



    current_question: {
        question_1: '',
        option_1:'',
        option_2:'',
        option_3:'',
        option_4:'',
        correct_answer:'',
    }

    onClick={this.editQuestion}




    //DESTRUCTURING

var myObj = {
  user: "matt",
  topic: "science",
  quiz: [
    { name: "bob", surname: "simmons" },
    { name: "jim", surname: "jacobs" },
    { name: "luke", surname: "harris" }
  ]
};

const {
  user,
  topic,
  quiz: [
    { name: name1, surname: surname1 },
    { name: name2, surname: surname2 },
    { name: name3, surname: surname3 }
  ]
} = myObj;

let root = document.getElementById("root");

root.innerHTML = name1;

//root.innerHTML = JSON.stringify(myObj)


[{
    question:     { type: String, required: true },
    option_1:       { type: String, required: true },
    option_2:       { type: String, required: true },
    option_3:       { type: String, required: true },
    option_4:       { type: String, required: true },
    correct_answer: { type: String, required: true }
}]