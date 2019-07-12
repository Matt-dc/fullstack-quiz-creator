import React, { Component } from 'react'


export default class QuizDetails extends Component {
    
    state ={}
    
    changeHandler = e => {  
        this.props.onChange(e)    
    }

    render() {
        return(

            <div>
                {/* {this.props.questions_array.length >0 && <input type="submit" value="Save Quiz" onClick={this.props.saveQuiz} />} */}

                {this.props.error}
                <div className="row">
                    <div className="input-field col s6 m6">
                        <input type="text" onChange={this.changeHandler} id="quiz_name" className="validate" name="quizName" value={this.props.quizName} />
                        <label class="active" for="quiz_name">Quiz name</label>
                    </div>
                    <div className="input-field col s6 m6">
                        <input type="text" onChange={this.changeHandler} id="creator" className="validate" name="creator" value={this.props.creator} />
                        <label class="active" for="creator">Quiz Creator</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">    
                        <select name="topic" onChange={this.changeHandler} value={this.props.topic}>
                            <option value='' disabled selected>Select the Topic</option>
                            <option value="technology">Technology</option>
                            <option value="nature">Nature</option>
                            <option value="society">Society</option>
                            <option value="languages">Languages</option>
                            <option value="culture">Culture</option>
                            <option value="transport">Transport</option>
                            <option value="miscellaneous">Miscellaneous</option>
                        </select>
                    </div>
                    <div className="input-field col s6">    
                        <select name="difficulty" onChange={this.changeHandler} value={this.props.difficulty}>
                            <option value='' disabled selected>Select the difficulty</option>
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
