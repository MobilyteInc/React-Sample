import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import '!style-loader!css-loader!../css/forms.css'
import '!style-loader!css-loader!../css/pages/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUserLock } from '@fortawesome/free-solid-svg-icons'
import '!style-loader!css-loader!../css/pages/home/_notSignedInHome.css';

import _nav from '../components/_nav'
import {logUserIn} from '../data-managers/userLoginManager'

class login extends Component {
	
  constructor(props) {
    super(props);
	
		this.handleSubmit = this.handleSubmit.bind(this)
		this.state = {
				EmailAddress: '',
				Password: '',
				rp: '',
				redirectToReferrer: false,
				loading: false,
				error: false,
				errorMessage: ''
		}
  }

	handleSubmit(event) {
		event.preventDefault();

		var that = this;
		logUserIn(
			event.target.elements.emailaddress.value,
			event.target.elements.password.value,
			() => {
				that.setState({redirectToReferrer: true});
			},
			(message) =>{
				var msg = message;
				if (!msg){
					msg = "An unknown login error occurred";
				}

				that.setState({
						error: true,
						errorMessage: msg
					})
			}
		)
	}

		componentDidMount ()
		{
			document.title = "System Admin Login | EACL";
		}	
	
		render() {

		if (this.state.redirectToReferrer) {
			const { from } = this.props.location.state || { from: { pathname: "/system-admin" } };
			return <Redirect to={from} />;
		}

		if (this.state.loading) {
			return <div className='loader-wrapper'>
					<div className="loader">Loading...</div>
					<div className='loader-text'>Loading</div>
			</div>
		}

		return ( 
			<div className="page-wrapper">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-6 bg-theme">
						<center>
							<FontAwesomeIcon icon={faUserLock} />
							<h2>Control Panel</h2>
						</center>
					</div>
					<div className="col-md-6">
						<div className="login-box">
							
						<form onSubmit={this.handleSubmit} className="">
						<h2 className="">System Administrator Login</h2>
						<div className="">
							<div className="form-notification-wrapper">
								<div className="form-notification">
									<FontAwesomeIcon icon="exclamation-circle" />
									<span>Email address is not valid</span>
								</div>
							</div>
							<div className="form-group">
								<input name="emailaddress" className="form-control" placeholder="E-mail/Phone number" />
							</div>
							<div className="form-group">
								<input type="password" name="password" className="form-control" placeholder="Password" />
							</div>

						</div>
							
						<button className="form-control btn btn-primary">Login</button>
					</form>

						</div>
					</div>
				</div>
			</div>
	
		</div>
		);
	}
}

export default login;