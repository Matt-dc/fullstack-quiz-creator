import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from "react-dom";
import Home from './components/home'
import NavBar from './components/layout/navBar'
import Footer from './components/layout/footer'
import Quiz from './components/quiz/quiz'
import QuizCreator from './components/editQuiz/quizCreator'
import Success from './components/editQuiz/success'
import ErrorPage from './components/utils/errorPage'

import './App.css'


class App extends Component {
  render() {
  
    return (

        <Router>
        <NavBar />


            <Switch>
                <Route exact path="/" component={Home} />  
                <Route path="/home" component={Home} />  
                <Route path="/create" component={QuizCreator} /> 
                <Route exact path="/edit/:id" component={QuizCreator} /> 
                <Route path="/success" component={Success } />
                <Route path="/error" component={ErrorPage} />
                <Route exact path="/:id" component={Quiz} />
                <Route path="*" component={ErrorPage} />
            </Switch>  

            <Footer />

        </Router>        

    )
  }
}


ReactDOM.render(<App />, document.getElementById("root"));


export default App