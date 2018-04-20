           
import React from 'react'
import { withSiteData } from 'react-static'
import { SyncLoader } from 'react-spinners';

class More extends React.Component { //contains the button to render the details as well as the details - rendered conditionally

    constructor(props) {
        
        super(props);
        
        this.state = {
           loading: false,
           details: false
        };
    
    }
   
    handleClick = () => {
        this.setState({loading: true});
        setTimeout(function() { //Start the timer
            this.setState({loading: false, details: true}) //After 2200ms, set loading to false
        }.bind(this), 2200)   
   }
   
    render() {
        if (this.state.details){
            return(
                <div id = "detailedreport" >
                    Humidity: {this.props.fullReport.main.humidity}% <div className = "placeholder"></div>
                    Pressure: {this.props.fullReport.main.pressure} hPa<div className = "placeholder"> </div>
                    Windspeed: {Math.floor(this.props.fullReport.wind.speed * 2.23694)} MPH<div className = "placeholder"></div>
                    Cloudcover {this.props.fullReport.clouds.all}%

                </div>
            )
        }
        else{
            return (
                <div id = 'morewrapper' >
                    <button id = 'additonalbutton' onClick = {this.handleClick}> Details </button>
                    <div id = "loader">
                    <SyncLoader
                        color={'#619AD3'} 
                        loading={this.state.loading} 
                    />
                    </div>
                </div>
            )
        }
    } 
    
}

export default More