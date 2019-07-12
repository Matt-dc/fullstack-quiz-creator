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
                <h2 className="center">Choose a Topic</h2>   

                <div className="input-field col s12">   
                    <form>
                        <select onChange={this.handleChange}>
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

                { this.props.topic !== '' && <h2>Search results</h2> }
                    {
                        this.props.quizSelection.map(result => (
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

