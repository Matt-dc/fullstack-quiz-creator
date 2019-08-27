import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class QuizDetails extends Component {
    
    state ={}
    
    changeHandler = e => {  
        this.props.onChange(e)    
    }

    fileHandler = e => {
        this.props.handleQuizImage(e)
    
    }



    // getDerivedStateFromProps(nextProps, prevState) {
    //     if(nextProps.topic !== prevState.ropic) {
    //         return {
    //             topic: nextProps.topic,
    //         }
    //     }
    // }


    render() {

        let image;
        if(this.props.quizImage !== null) {
            const arr = this.props.quizImage.split('-')
            image = arr[0] === 'topic' 
                ? `/topics/${this.props.quizImage}` 
                : `http://localhost:5000/${this.props.quizImage}`
        } else {
            image = ''
        }

    
        return(

            <div className="container">
                {/* {this.props.questions_array.length >0 && <input type="submit" value="Save Quiz" onClick={this.props.saveQuiz} />} */}

                <div className="row">
                    <div className="col">                                  
                        <input type="file" onChange={this.fileHandler} ref={fileInput => this.fileInput = fileInput} style={{ display: 'none' }} />
                    </div>
                </div>
            {/* WE WANT THE GLOBAL VAR TO EQUAL THE REF, IN ORDER TO REFERENCE IT. wE THEN WANT TO CLICK THAT GLOBAL VARIABLE
            CLICKING THE GLOBAL VAR MEANS CLICKING THE REF, BECAUSE THE VAR EQUALS THE REF! EQUALLING STH MEANS TAKING A COPY
            OF IT IN MEMORY - THUS, IF THE REF EQUALLED THE VAR, CLICKING THE VAR WOULD DO NOTHING AS THE VAR HAS NO REFERENCE
            OF THE REF. iNSTEAD MAKE THE VAR EQUAL THE REF AND CLICK THE VAR USING .ONCLICK() - WHAT IS THIS METHOD IN ACTUAL FACT??  */}

                <div className="row">
                    <div className="col m12 s12 center">
                        <img src={image} width="250px" />
                    </div>   
                </div>
                <div className="row">
                    <div className="col m12 s12 center">
                        <p>{this.props.quizImage}</p>
                    </div>
                </div>

                <div className="col s12 m12 l12">
                    {this.props.error}
                </div>
                <div className="row">
                    <div className="col m12 s12 center">                
                        <Link onClick={() => this.fileInput.click()} className="btn btn-large blue">Choose Quiz Image</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input type="text" onChange={this.changeHandler} id="quiz_name" className="validate" name="quizName" value={this.props.quizName} />
                        <label class="active" for="quiz_name">Quiz name</label>
                    </div>
                    <div className="input-field col s12 m6">
                        <input type="text" onChange={this.changeHandler} id="creator" className="validate" name="creator" value={this.props.creator} />
                        <label class="active" for="creator">Quiz Creator</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col m6 s12"> 
                        <select name="topic" className="quiz-select" onChange={this.changeHandler} value={this.props.topic}>
                            <option value=''>Select the Topic</option>
                            <option value="nature">nature</option>
                            <option value="tech">tech</option>
                            <option value="society">society</option>
                            <option value="language">language</option>
                            <option value="movies">movies</option>
                            <option value="geography">geography</option>
                            <option value="music">music</option>
                            <option value="art">art</option>
                            <option value="code">code</option>
                            <option value="relationships">relationships</option>
                            <option value="health">health</option>
                            <option value="science">science</option>
                        </select>
                        
                    </div>
                    <div className="input-field col m6 s12">    
                        <select name="difficulty"  class="quiz-select" value={this.props.difficulty} onChange={this.changeHandler}>
                            <option value="">Select the difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>             
            </div>
        )
    }
}
