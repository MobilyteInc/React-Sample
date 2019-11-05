import React from 'react'
import {OverlayTrigger, Tooltip, Modal, } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import {gameTitleList, createGameTitle, gameTitleById, gameTitleEditById} from '../../data-access/game-data/gameTitleAccess'
import {regionEditById} from '../../data-access/region/regions'
import {Regions, Languages} from '../../data-access/commonAPIAccess'

import '!style-loader!css-loader!../../css/pages/region/region.css';
import '!style-loader!css-loader!../../css/pages/game-data/game.css';

const data = []

class _regions extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.state = { id:0, showDel:false, deleteDev:false, regionsList:[], list:[], regionIdval:'', LangList:[], langId:1000, show: false, newDev:false, editGame:false,  data:{has_maps:false},  game_title_large_image_url:'', game_title_small_image_url:'', loader:false, has_maps:false
		};	

    this.SelectRegion = this.SelectRegion.bind(this);
    this.SelectLang = this.SelectLang.bind(this);
		this.GameTitleList = this.GameTitleList.bind(this);
		this.ActionFormatter = this.ActionFormatter.bind(this);
		this.updateVal = this.updateVal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		//this.RenderImage = this.RenderImage.bind(this);
		this.Addnew = this.Addnew.bind(this);
    this.editGameTitle = this.editGameTitle.bind(this);
    this.deleteGameTitle = this.deleteGameTitle.bind(this);
		this.handleClose = this.handleClose.bind(this);
		//this.removeImage = this.removeImage.bind(this);
	}

	componentDidMount(){
		this._notificationSystem = this.refs.notificationSystem;

		Regions((response) => { this.setState({ regionsList: response }); },
			(message)=>{ this._notificationSystem.addNotification({ message: 'Error', level: 'error'});
    })
    Languages((response) => { this.setState({ LangList: response }); },
			(message)=>{ this._notificationSystem.addNotification({ message: message.message || 'Error', level: 'error'});
		})

  }
  
  // Select Language from dropdown
	SelectLang(e){
    if(e.target.value !== '')
    	this.setState({langId:e.target.value})
	}

	// Select Region from dropdown
	SelectRegion(e){
    if(e.target.value !== '')
      this.GameTitleList(e.target.value)
    this.setState({regionIdval:e.target.value})
	}
	

	GameTitleList (id) {gameTitleList(id, this.state.langId,
			(response) =>
			{ this.setState({ list: response }); },
			(message)=>{
        this._notificationSystem.addNotification({ message: message.message || 'Game title list not found', level: 'error'});
			}
		)
	}

	Addnew (){ this.setState({ show: true, newDev:true});}
  editGameTitle (game_title_id){ 
    this.setState({ show: true, editGame:true}); 
    console.log("Game Title ID", game_title_id); 

    let response = this.state.regionsList.filter( obj => obj.region_id == game_title_id)[0];
    this.setState({detail: response, data: response})

    // gameTitleById(game_title_id, this.state.langId,
    //   (response) =>
    //   { 
    //     this.setState({ detail: response, data: response }); 
    //     let dataval = this.state.detail;
    //     dataval['has_maps'] = this.state.detail.has_maps;
    //     this.setState({detail:dataval, has_maps:this.state.detail.has_maps, game_title_large_image_url:this.state.detail.game_title_large_image_url, game_title_small_image_url:this.state.detail.game_title_small_image_url});
    //     //console.log("Response:", response) 
    //   },
    //   (message)=>{
    //     this._notificationSystem.addNotification({ message: message.message || 'Game title list not found', level: 'error'});
    //   }
    // )
  }
  deleteGameTitle(game_title_id){
    
    this.setState({ showDel: true, id:game_title_id });
  }

  handleClose (){ 
		this.setState({ show: false, showDel:false, newDev:false, editGame:false, detail:'', data:{has_maps:false}, game_title_large_image_url:'', game_title_small_image_url:'' });
		this.refs.createForm.reset();
		// console.log(this.state.game_title_large_image_url)
	}

	// update form file value
  updateVal(e){
    e.preventDefault();
    let dataval = this.state.data;
    dataval[e.target.name] = e.target.value;
    this.setState({data:dataval});
  }

  // Update checkbox field values
  checkboxUpdate (e){
    e.preventDefault();
    let dataval = this.state.data;
    dataval['has_maps'] = !this.state.has_maps;
    this.setState({data:dataval, has_maps:!this.state.has_maps});
  }
	
	// Submit form data
  handleSubmit(e){
    e.preventDefault();
   
		console.log(this.state.data)
        let values = {};

    if(this.state.data.discord_url != null)
        values['discord_url'] = this.state.data.discord_url || '';
        //values.discord_url = this.state.data.discord_url || '';
    if(this.state.data.eacl_tv_url != null)
        values['eacl_tv_url'] = this.state.data.eacl_tv_url || '';
        //values.eacl_tv_url = this.state.data.eacl_tv_url || '';

    if(this.state.data.discord_url || this.state.data.eacl_tv_url)
    {
        let regexp =  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        if (this.state.data.discord_url != '' && this.state.data.discord_url != null ){
            if (!regexp.test(this.state.data.discord_url))
            {
                this._notificationSystem.addNotification({ message: 'URL not valid', level: 'error'});
                return false;
            }
        }
        if(this.state.data.eacl_tv_url != '' && this.state.data.eacl_tv_url != null ){
            if (!regexp.test(this.state.data.eacl_tv_url))
            {
                this._notificationSystem.addNotification({ message: 'URL not valid', level: 'error'});
                return false;
            }
        }
	}

    if(this.state.newDev)
      {
        // createGameTitle(values,
		// 			(response) =>
		// 			{ 
		// 				if(response.status ===400)
		// 					this._notificationSystem.addNotification({ message: response.title, level: 'error'});
		// 				else
		// 					this._notificationSystem.addNotification({ message: 'Game Title created', level: 'success'});

		// 				this.setState({ show: false, newDev:false, detail:'',  data:{has_maps:true}, game_title_large_image_url:'', game_title_small_image_url:'' });
		// 				this.refs.createForm.reset();
		// 				this.GameTitleList(this.state.regionIdval);
		// 			},
		// 			(message)=>{
		// 				this._notificationSystem.addNotification({ message: message.message || 'Game title not created', level: 'error'});
		// 			}
        // 		)	
        console.log("In create new")
      }
    else if(this.state.editGame)
      {
        let updated_data = {};
        updated_data["changed"] = values;

        console.log("Edit Data", updated_data, this.state.detail.region_id);
        regionEditById(this.state.detail.region_id, updated_data,//JSON.stringify(updated_data),
          (response) =>
          { 
            console.log(response);
            if(response.status ===400)
              this._notificationSystem.addNotification({ message: response.title, level: 'error'});
            else
              this._notificationSystem.addNotification({ message: 'Region Properties updated', level: 'success'});

            this.setState({ show: false, gameTitle:false, newDev:false, detail:'' });
            this.refs.createForm.reset();
            this.GameTitleList(this.state.regionIdval);
          },
          (message)=>{
            this._notificationSystem.addNotification({ message: message.message || 'Region Properties not updated', level: 'error'});
          }
        )  
      }
    else if(this.state.deleteDev)
      {
          console.log("in delete")
    //     let value = {};
    //     value["is_deleted"] = true;
    //     let updated_data = {};
    //     updated_data["changed"] = value;

    //   gameTitleEditById( this.state.id, updated_data, 
    //       (response) =>
    //       { 
    //         this._notificationSystem.addNotification({ message: 'Game Title deleted', level: 'success'});
    //         this.setState({ show: false, gameTitle:false, newDev:false, detail:'',  data:{has_maps:true}, game_title_large_image_url:'', game_title_small_image_url:'', deleteDev:false });
    //         this.GameTitleList(this.state.regionIdval);
    //       },
    //       (message)=>{
    //         console.log(message)
    //         this._notificationSystem.addNotification({ message: message.message, level: 'error'});
    //       }
    //     )  
    }
    else
      this.setState({ show: false,newDev:false, detail:'' });
  }

  // Action formatter function for render action buttons
	ActionFormatter(cell, row){
    return <div>
        <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled" >Edit Platform!</Tooltip>}>
        <span className="btn btn-success btn-fill btn-sm" onClick={()=>this.editGameTitle(row.region_id)}><i className="fas fa-edit"></i></span>
        </OverlayTrigger> &nbsp;
        {/* <OverlayTrigger placement={'top'} overlay={<Tooltip id="tooltip-disabled" >Delete Platform!</Tooltip>}>
        <span className="btn btn-danger btn-fill  btn-sm" onClick={()=>this.deleteGameTitle(row.game_title_id)}><i className="fas fa-trash-alt"></i></span>
        </OverlayTrigger> &nbsp; */}
      </div>; 
	}
  

  render() {
		const {regionsList,LangList, data,list, show, detail, newDev, game_title_large_image_url,game_title_small_image_url, loader, has_maps} = this.state;
        //console.log("Regions list",regionsList)
		// if (isAuthenticated()){
			
			const options = {
			      sizePerPage: 10,
			      prePage: 'Previous',
			      nextPage: 'Next',
			      firstPage: 'First',
			      lastPage: 'Last',
			      hideSizePerPage: true,
			      noDataText: 'No data available'
			    };
			
			return (
				<div className="col-md-8">
					<NotificationSystem ref="notificationSystem" />
					<div className="row">
						<div className="col-sm-6">
							<h2>Region Properties </h2>
						</div>
                    <div className="col-sm-3"></div>
            <div className="col-sm-3">
              <p></p>
              <div className="form-group">
                <select className="form-control" onChange={this.SelectLang} >
                  <option value="">Select Language</option>
                  {LangList.map(item=>{
                    return <option key={item.language_id} value={item.language_id}>{item.language_english_name}</option>
                  })}
                </select>
              </div>
            </div>
				{/* <div className="col-sm-3">
							<p></p>
              <div className="form-group">
                <select className="form-control" onChange={this.SelectRegion}>
                  <option value="">Select Region</option>
                  {regionsList.map(item=>{
                    return <option key={item.region_id} value={item.region_id}>{item.region}</option>
                  })}
                </select>
              </div>
						</div> */}
           
						<div className="col-md-12">
							{/* Data table */}
							<BootstrapTable data={regionsList} bordered={false} striped pagination={true} options={options} >
                    {/* search */}
                      <TableHeaderColumn dataField='region' width="20%" isKey  dataSort>
                        Region 
                      </TableHeaderColumn>
                      <TableHeaderColumn width="35%" dataField='eacl_tv_url' dataSort >
                        EACL TV URL
                      </TableHeaderColumn>
                      <TableHeaderColumn width="35%" dataField='discord_url' dataSort>
                        DISCORD URL
                      </TableHeaderColumn>
                      <TableHeaderColumn width="10%"  dataFormat={ this.ActionFormatter }>Action</TableHeaderColumn>
                    </BootstrapTable>
						</div>
					</div>

					{/* New/Edit Game Title */}
					<Modal size="sm" show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Region Properties {}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
            <form onSubmit={this.handleSubmit} id="createForm" ref="createForm">
              <div className="form-group">
                <label htmlFor="region">Region</label>
                <input type="text" disabled className="form-control" id="region" name="region" placeholder="Enter Region" defaultValue={newDev ? '' : detail ? detail.region :''} onChange={e=>this.updateVal(e)} required/>
              </div>
              
              <div className="form-group">
                <label htmlFor="discord_url">Discord URL</label>
                <input type="text" className="form-control" id="discord_url" name="discord_url" placeholder="Enter discord url" defaultValue={newDev ? '' : detail ? detail.discord_url :''}  onChange={e=>this.updateVal(e)} />                    
              </div>

              <div className="form-group">
                <label htmlFor="eacl_tv_url">EACL tv URL</label>
                <input type="text" className="form-control" id="eacl_tv_url" name="eacl_tv_url" placeholder="Enter eacl tv url" defaultValue={newDev ? '' : detail ? detail.eacl_tv_url :''}  onChange={e=>this.updateVal(e)} />                    
              </div>
              
              <button type="submit" className="btn btn-fill btn-primary">Submit</button>
            </form>
          </Modal.Body>
          {loader ? <div className="loader"><i className="fas fa-circle-notch fa-spin"></i></div> :''}
        </Modal>


        {/* Delete System Admin */}
          <Modal dialogClassName="modal-20w text-center" show={this.state.showDel} onHide={this.handleClose} aria-labelledby="example-modal-sizes-title-sm" onChange={e=>this.updateVal(e)}>
            <Modal.Body>
            <form onSubmit={this.handleSubmit} id="deleteForm" ref="deleteForm">
              <p>Are you sure!</p>
              <input type="hidden" className="form-control" id="delete_id" name="id" />
              <button onClick={()=>this.setState({deleteDev:true})} className="btn btn-fill btn-danger" >Delete</button>
              </form>
            </Modal.Body>
          </Modal>


				</div>

				);
  	}
}

export default _regions;