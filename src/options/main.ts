import React from 'react'
import ReactDOM from 'react-dom'
import App from './Options'
import '../styles'

const app = document.getElementById('app')
ReactDOM.render(
  React.createElement(React.StrictMode, null, React.createElement(App, null)),
  app
)
