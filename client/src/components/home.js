import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import TopicSearch from './TopicSearch'
import QuizItem from './QuizItem'
import App from '../App.css'

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

        <div className="container">
            <p>You haven't created any quizzes yet</p>
            <Link to="/create"><button>Create a quiz</button></Link>
           
        </div>

        : 

        <div className="container">
                <h1 className="center">Choose a quiz</h1>

                <div className="row">
                    {this.state.quizData.map(quizItem => (
                        <QuizItem quizItem={quizItem} />
                    ))}
                </div>

                <div class="divider"></div>
                <div className=" section center">        
                    <div classname="row">    
                    <h5>Get Creative</h5>    
                        <div className="col s12 m12 center">
                            <Link className=" waves-effect waves-light btn-large " to="/create">Create Quiz</Link>
                        </div>
                    </div>
                </div>


                <div class="divider"></div>
                
                    <div className="section center">        
                        <div className="row">    
                            <TopicSearch 
                                onChange={this.handleTopicChange} 
                                topic={this.state.topic}
                                quizSelection={this.state.quizSelection}
                            />
                            
                        </div>
                    </div>
                <div class="divider"></div>
        </div>
    )

        return homeScreen
    }
}
