import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import ViewList from './components/ViewList';

function App() {
    return (
        <Router>
            <Route exact path="/" component={MainComponent} />
            <Route path="/view" component={ViewList} />
        </Router>
    )
}

export default App
