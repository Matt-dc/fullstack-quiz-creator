import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class QuestionEdit extends Component {

    state={}

    componentDidMount(){
    }

    changeHandler = e => {  
        this.props.handleInput(e)
        this.setState({
            updated: true
        })
    }


    fileHandler = e => {
        this.props.handleFileUpdate(e)
    }

    render(){
        return (
            <div className="container center vertical-spacer">
                {this.props.isBeingAdded && <h4>Create question</h4> }
                {this.props.isBeingEdited && <h4 className="update-question-title">Update question</h4> }

                    <img src={`http://localhost:5000/${this.props.edited_image}`} width="300px" />

                    <p>{this.props.error}</p>

                    <div className="row center">
                            <div className="input-field col s12">
                                <Link href="#" className="btn btn-large blue" onClick={() => this.fileHandler.click()}>Upload question image</Link>
                                <input type="file" 
                                    style={{ display: 'none' }} 
                                    ref={file => this.fileHandler = file}    
                                    id="file-input" image="image/*" onChange={this.fileHandler} /> 
                                {this.props.edited_image}
                                {/* <button onClick={this.this.props.handleFileUpload}>Upload</button>     */}
                        </div>  
                    </div> 
                    <div className="row center">
                        <div className="input-field col s12">
                            <input onChange={this.changeHandler} name='question' value={this.props.question}/>
                            <label className="active">Question 1</label>
                        </div>  
                    </div> 
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.changeHandler} name='option_1' value={this.props.option_1} />
                            <label className="active">Option 1</label>
                        </div>  
                    </div> 
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.changeHandler} name='option_2' value={this.props.option_2} />
                            <label className="active">Option 2</label>
                        </div>  
                    </div> 
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.changeHandler} name='option_3' value={this.props.option_3} />
                            <label className="active">Option 3</label>
                        </div>  
                    </div> 
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.changeHandler} name='option_4' value={this.props.option_4} />
                            <label className="active">Option 4</label>
                        </div>  
                    </div> 

                    <div className="row">
                        <div className="input-field col s12">
                            <select class="browser-default" name="correct_answer" onChange={this.changeHandler} value={this.props.correct_answer}>
                                <option value='' disabled selected>Correct Answer</option>
                                <option value={this.props.option_1}>Option 1</option>
                                <option value={this.props.option_2}>Option 2</option>
                                <option value={this.props.option_3}>Option 3</option>
                                <option value={this.props.option_4}>Option 4</option>
                            </select>
                        </div>  
                    </div> 
                            
                {this.props.isBeingAdded && <Link className="btn-large" onClick={this.props.addNewQuestionToArray}>Save</Link>}
                {this.props.isBeingEdited && <Link className="btn-large" onClick={this.props.saveEditedQuestion}>Update</Link>}
                
                <Link className="btn-large grey" style={{marginLeft: '1em' }} onClick={() => this.props.closeInputFormAndReset()}>Cancel</Link>
            </div>

           

           
  


        );

    }
}