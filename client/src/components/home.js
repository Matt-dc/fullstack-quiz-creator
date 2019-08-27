import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import TopicSearch from './layout/TopicSearch'
import QuizItem from './layout/QuizItem'

export default class Home extends Component {

    state = { 
        quizData: [],
        quizSelection: [],
        topic: "",
     }


    componentDidMount() {
        axios.get('http://localhost:5000/')
        .then(res => {
            const data = res.data;
            this.setState({
                quizData: data
            })
        })
    }


    handleTopicChange = topic => {
        this.topicSearch(topic)
        this.setState({
            topic: topic
        })
    }


    topicSearch = topic => {
        axios.get(`http://localhost:5000/search/${topic}`)
            .then(res => {
                const data = res.data;
                this.setState({
                    quizSelection: data
                })
            })
    }


    render() {
        
        let homeScreen = ( 

            this.state.quizData == 0 ?

        <div className="container center">
            <div className="section start-title">
                <p>You haven't created any quizzes yet</p>
            </div>
            <div class="divider"></div>
            <div className="section vertical-spacer">
                 <Link to="/create" class="waves-effect waves-red btn-large">Create a quiz</Link>
            </div>
        </div>

        : 

        <div className="container">
            <div className="row">
                <div className="col l12 m12 s12 center">
                    <h1 className="home-title">Choose a quiz</h1>
                </div>
            </div>

            <div class="divider"></div>
                <div className="section center vertical-spacer">        
                    <div classname="row">    
                        <div className="col s12 m12 center">
                            <Link className=" waves-effect waves-light  blue btn-large" 
                                    to="/create">Create Quiz</Link>
                        </div>
                    </div>
                </div>

                
                <div className="row">
                    {this.state.quizData.map(quizItem => (
                            <QuizItem quizItem={quizItem} />
                    ))}
                </div>

                <div class="divider"></div>

                { this.state.quizSelection.length > 5 &&

                    <div className="section center">        
                        <div className="row">  
                          
                            <TopicSearch 
                                onChange={this.handleTopicChange} 
                                topic={this.state.topic}
                                quizSelection={this.state.quizSelection}
                            />
                            
                        </div>
                    </div>
                    }

                <div class="divider"></div>
            </div>
        
    )

        return homeScreen
    }
}
