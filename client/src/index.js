import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'

ReactDOM.render(
  <Router>
      <App />
  </Router>
  , document.getElementById('root'))
