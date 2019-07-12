import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class QuestionEdit extends Component {

    state={}

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
            <div className="container center">
                {this.props.isBeingAdded && <h2>Create your question</h2> }
                {this.props.isBeingUpdated && <h2>Update your question</h2> }

                    <div className="row center">
                            <div className="input-field col s12">
                                <input type="file" image="image/*" onChange={this.fileHandler} /> 
                                <label>Add a question image</label>
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
                        <select name="correct_answer" onChange={this.changeHandler} value={this.props.correct_answer}>
                            <option value='' disabled selected>Correct Answer-</option>
                            <option value={this.props.option_1}>Option 1</option>
                            <option value={this.props.option_2}>Option 2</option>
                            <option value={this.props.option_3}>Option 3</option>
                            <option value={this.props.option_4}>Option 4</option>
                        </select>
                    </div>  
                </div> 
                              
                {this.props.isBeingAdded && <Link className="btn-large" onChange={this.changeHandler} onClick={this.props.addQuestion}>Save Question</Link>}
                {this.props.isBeingUpdated && <Link className="btn-large" onChange={this.changeHandler} onClick={this.props.updateQuestion}>Update Question</Link>}
            </div>

           

           
  


        );

    }
}