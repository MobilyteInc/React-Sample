import React, { Component } from 'react';

import _nav from '../../components/_nav'
import _sidebar from '../../components/_sidebar'

import _regions from '../../components/region/_regions'

class regions extends Component {

	componentDidMount ()
	{
		document.title = "Manage Regions | EACL";
	}
	
  	render() {
		return (<div>						
			<_nav />
			<div className="row">
			<_sidebar />
			<_regions />
			</div>					
		</div>);
	}
}

export default regions;