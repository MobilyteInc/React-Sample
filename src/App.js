import React, {Component} from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faLock, faGlobe, faLanguage,faUser, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

import login from './pages/login'
import logout from './pages/logout'
import regions from './pages/region/regions'


import {isAuthenticated}  from './data-managers/cookieManager'

const PrivateRoute = ({ component: Component, ...rest }) => {
	
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

library.add( faEnvelope, faLock, faGlobe, faLanguage,faUser, faExclamationCircle );

class App extends Component {
	
	constructor(props){
		super(props);

		this.state = {
			language: 'en',
	    }
	}
	
	getUrl() { 
	  let url = location.search;
	  let query = url.substr(1);
	  let result = {};
	  query.split("&").forEach(function(part) {
		let item = part.split("=");
	  });
	  return result;
	}
	
	getRegCode() { 
		let params = this.getUrl();
		return params[0] == 'registration_code' ? params[0] : false;
	}

	render() {
		return(
			<BrowserRouter>
				<Route path="/" exact component={ login } />
				<Route path="/login" component={ login } />	
				<Route path="/logout" component={ logout } />
				<PrivateRoute path="/regions" component={regions} />
			</BrowserRouter>
		);
	}
}

export default App;
