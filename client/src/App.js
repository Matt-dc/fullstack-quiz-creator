import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link, } from 'react-router-dom';
import ReactDOM from "react-dom";
import Home from './components/home'
import NavBar from './components/navBar'
import Footer from './components/footer'
import Quiz from './components/Quiz/'
import QuizCreator from './components/QuizCreator'
import EditQuiz from './components/editQuiz'
import Success from './components/success'
import ErrorPage from './components/errorPage'

class App extends Component {
  render() {
  
    return (
      <Router>

      <div>
        
        <NavBar />
          <Switch>
              <Route exact path="/" component={Home} />  
              <Route path="/home" component={Home} />  
              <Route path="/create" component={QuizCreator} /> 
              <Route exact path="/edit/:id" component={EditQuiz} /> 
              <Route path="/success" component={Success } />
              <Route path="/error" component={ErrorPage} />
              <Route exact path="/:id" component={Quiz} />
          </Switch>  

        <Footer />
        
      </div>

      </Router>        

    )
  }
}


ReactDOM.render(<App />, document.getElementById("root"));


export default App