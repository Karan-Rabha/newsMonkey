import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  pageSize = 15;
  apiKey = process.env.REACT_APP_NEWS_API

  state = {
    progress: 0
  }

  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"general"} country={"in"} category={"general"} pageSize={this.pageSize} />} />

            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"business"} country={"in"} category={"business"} pageSize={this.pageSize} />} />

            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"entertainment"} country={"in"} category={"entertainment"} pageSize={this.pageSize} />} />

            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"health"} country={"in"} category={"health"} pageSize={this.pageSize} />} />

            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"science"} country={"in"} category={"science"} pageSize={this.pageSize} />} />

            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"sports"} country={"in"} category={"sports"} pageSize={this.pageSize} />} />

            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key={"technology"} country={"in"} category={"technology"} pageSize={this.pageSize} />} />
          </Routes>
        </div>
      </Router>
    )
  }
}