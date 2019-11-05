import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Collapse } from 'react-bootstrap';

import '!style-loader!css-loader!../css/components/_sidebar.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faLock, faGlobe, faLanguage, faUser, faUsers, faUsersCog, faUserCog, faUserTie, faKey, faGamepad, faBolt, faTrophy, faChevronDown, faMapMarkedAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {isAuthenticated} from '../data-managers/cookieManager'

library.add( faEnvelope, faLock, faGlobe, faLanguage, faUser, faGamepad, faBolt, faKey, faTrophy, faChevronDown, faMapMarkedAlt, faMapMarkerAlt );

class _sidebar extends React.Component {
	

	constructor(props) {
		super(props);
		
		this.state = {
			regionOpts: [],
			regionsLoaded: false,
			showError: false,
			responseMsg: null,

			isShowingGameMenu: true,
			isShowingPowerMenu: true,
			isShowingAdminMenu: true,
			isShowingRegionMenu: true
		};	
	}

  render() {
		if (isAuthenticated()){

			let { isShowingGameMenu, isShowingPowerMenu, isShowingAdminMenu, isShowingRegionMenu } = this.state;

			
			return (
				<div className="col-md-3">
					<div className="sidebar-wrapper">
					
						<ul className="nav">
							<li className="multi-option first1">
					          <a onClick={() => this.setState({ isShowingAdminMenu: (this.state.isShowingGameMenu == true) ? false: true })}>
					            <FontAwesomeIcon icon={faUsers} /><span>Administrator <FontAwesomeIcon icon={faChevronDown} /></span>
					            </a>
					            <Collapse in={isShowingAdminMenu} className="submenu">
					              <ul className="nav user-nav" >
					                <li className="first-option"><NavLink to="/system-admin" activeClassName="active"><FontAwesomeIcon icon={faUserCog} /><span>System Admin</span></NavLink></li>	
									<li className="first-option"><NavLink to="/tournament-specialists" activeClassName="active"><FontAwesomeIcon icon={faUserTie} /><span>Tournament Specialists</span></NavLink></li>	
					                <li className="first-option"><NavLink to="/league-commissioner" activeClassName="active"><FontAwesomeIcon icon={faUser} />League Commissioner</NavLink></li>
					              </ul>
					            </Collapse>
					        </li>
							
							<li className="multi-option">
					          <a onClick={() => this.setState({ isShowingRegionMenu: (this.state.isShowingRegionMenu == true) ? false: true })}>
					            <FontAwesomeIcon icon={faMapMarkedAlt} /><span>Regions <FontAwesomeIcon icon={faChevronDown} /></span>
					            </a>
					            <Collapse in={isShowingRegionMenu} className="submenu">
					              <ul className="nav user-nav" >
					                <li><NavLink to="/regions"><FontAwesomeIcon icon={faMapMarkerAlt} />Region properties</NavLink></li>
					              </ul>
					            </Collapse>
					        </li>

							<li className="multi-option">
					          <a onClick={() => this.setState({ isShowingGameMenu: (this.state.isShowingGameMenu == true) ? false: true })}>
					            <FontAwesomeIcon icon={faGamepad} /><span>Game Data <FontAwesomeIcon icon={faChevronDown} /></span>
					            </a>
					            <Collapse in={isShowingGameMenu} className="submenu">
					              <ul className="nav user-nav" >
													<li><NavLink to="/game/titles" ><FontAwesomeIcon icon={faTrophy} />Game Titles</NavLink></li>
													<li><NavLink to="/game/platforms"><FontAwesomeIcon icon={faTrophy} />Game Platforms</NavLink></li>
					                <li><NavLink to="/game/title-platforms" ><FontAwesomeIcon icon={faTrophy} />Game Title Platforms</NavLink></li>
					                <li><NavLink to="/game/skill-levels" ><FontAwesomeIcon icon={faTrophy} />Game Skill Levels</NavLink></li>
					                <li><NavLink to="/game/modes" ><FontAwesomeIcon icon={faTrophy} />Game Modes</NavLink></li>
					                <li><NavLink to="/game/maps" ><FontAwesomeIcon icon={faTrophy} />Game Maps</NavLink></li>
					                <li><NavLink to="/game/rules" ><FontAwesomeIcon icon={faTrophy} />Game Rules</NavLink></li>
					              </ul>
					            </Collapse>
					        </li>
					        <li className="multi-option">
					          <a onClick={() => this.setState({ isShowingPowerMenu: (this.state.isShowingPowerMenu == true) ? false: true })}>
					            <FontAwesomeIcon icon={faBolt} /><span>Power Ranking <FontAwesomeIcon icon={faChevronDown} /></span>
					            </a>
					            <Collapse in={isShowingPowerMenu} className="submenu">
					              <ul className="nav user-nav" >
					                <li><NavLink to="/power-ranking-levels"><FontAwesomeIcon icon={faBolt} />Levels</NavLink></li>
					                <li><NavLink to="/power-ranking-profiles" ><FontAwesomeIcon icon={faBolt} />Profiles</NavLink></li>
					              </ul>
					            </Collapse>
					        </li>
					        <li className="option-1"><NavLink to="/reset-password"><FontAwesomeIcon icon={faKey} /><span>Reset Password</span></NavLink></li>
					        <li className="option-1"><NavLink to="/email-templates"><FontAwesomeIcon icon={faEnvelope} /><span>Emails Templates</span></NavLink></li>
						</ul>
					
					</div>
				</div>


				);
			}

			// if (this.state.regionsLoaded == false){
			// 	this.getRegions();
			// 	return null;
			// }

			return (
			<div className="side-bar" style="display:none;">
			</div>
    		);
  	}
}

export default _sidebar;