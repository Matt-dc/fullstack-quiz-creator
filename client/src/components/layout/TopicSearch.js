import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class TopicSearch extends Component {

    state={}

    handleChange = e => {
        this.props.onChange(e.target.value)
    }

    render() {
        
        return (
            <div>
                <h4 className="center">Choose a Topic</h4>   

                <div className="input-field col s12">   
                    <form>
                        <select className="browser-default" onChange={this.handleChange}>
                            <option value="" disabled selected>Choose your topic</option>
                            <option value="technology">technology</option>
                            <option value="people">people</option>
                            <option value="nature">nature</option>
                            <option value="languages">languages</option>
                            <option value="culture">culture</option>
                            <option value="transport">transport</option>
                        </select>
                    </form>
                </div>

                { this.props.topic !== '' && <h4>Search results</h4> }
                    {this.props.quizSelection.length < 1 && "Sorry, there are no quizzes about that topic"
                    || this.props.quizSelection.map(result => (
                            <div className="card">
                                <Link to={{pathname: `/${result._id}`}}>
                                    <div className="card-content">
                                        {result.quizName}
                                    </div>
                                </Link>
                            </div>
                    ))
                }
                
            </div>
        )
    }
}

