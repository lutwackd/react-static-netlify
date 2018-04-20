           
import React from 'react'
import { withSiteData } from 'react-static'
import More from './More'



class Report extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { //will pass along the full report to 'More' for if the user requests more details
            
        return (
            <div id = "innerwrapper">
                <h2> {this.props.city} </h2>
                <div> The temperature is <b> {this.props.temp}°F</b> </div>
                <div> The conditions are: <b> {this.props.conditions} </b> </div>
                <More fullReport = {this.props.fullReport}/>  
            </div>
        )
    } 
    
}

export default Report