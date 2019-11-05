import React from 'react'
import { Link } from 'react-router-dom'

import '!style-loader!css-loader!../css/components/_nav.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {loadRegions} from '../data-access/platformLookupDataAccess'
import {isAuthenticated} from '../data-managers/cookieManager'

library.add( faSignOutAlt );

class _nav extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			regionOpts: [],
			regionsLoaded: false,
			showError: false,
			responseMsg: null
		};
	}
	
	getRegions() { 

		let that = this;
		loadRegions((response)=>{
				if (response == null){
					that.setState({ regionOpts: null, regionsLoaded: true });
					return;
				}
	
				let _regions = [];
				for (let i in response) {
					let l = response[i];
					_regions.push({ 
						value: l.region,
						region: l.region_id
					});
				}
				
				that.setState({ regionOpts: _regions, regionsLoaded: true })
		}, (message) => {
			that.setState({
				showError: true,
				responseMsg: message
			});
		});
   }
   
  render() {
		if (isAuthenticated()){
			return (
				<div className="nav-bar">
					<div className="nav-wrapper">
						<ul>
							<li className="pull-left"><Link  to='/system-admin'>Control Panel</Link></li>
							<li className="pull-right"><Link to='/logout'>Logout<FontAwesomeIcon icon={faSignOutAlt} /></Link></li>
						</ul>
					</div>
				</div>
				);
			}

			return (
			<div ></div>
    		);
  	}
}

export default _nav;
