import React from "react"
import ReactDOM from "react-dom"
import App from './App'

import '!style-loader!css-loader!./css/style.css';
import '!style-loader!css-loader!./css/forms.css'

localStorage.setItem('language','in');

ReactDOM.render(<App />, document.getElementById('root'))
