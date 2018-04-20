import React from 'react'
import { withSiteData } from 'react-static'
import logoImg from '../logo.png'
import Report from './Report'


class Weather extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            zip: '',
            valid: false,
            city: '',
            temp: '',
            conditions: '',
            fullReport: '' //ultimately passed through Report to the More component      
        };
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){//
        this.setState({zip: event.target.value}, () => this.retrieveWeather());        
    }

    
    retrieveWeather(){
        
        var appid = '97c66cf95a6318a10f98bf05fe0ad0ec'; 
        var zip= this.state.zip;
        
        if (zip.length == 5){ //helps reduce number of API calls
            var urlHelper = '?zip=' + zip + '&appid=' + appid;
            fetch('http://api.openweathermap.org/data/2.5/weather' + urlHelper)
            .then((response) => response.json())
            .then((responseJson) => {
                var weather = responseJson;
                var conditions = weather.weather[0].description;
                var tempF = Math.floor((weather.main.temp * 9/5) - 459.67); //K->F
                this.setState({
                    city: weather.name,
                    temp: tempF,
                    conditions: conditions,
                    valid: true,
                    fullReport: weather
                });
            })
            .catch((error) => {
                console.error(error);
            });
        }
        else{
            this.setState({
                valid: false
            });
        }
        
    }
    
    render() {
        return (
            <div id = "wrapper">
                <input id = 'zipinput' type = "text" value = {this.state.zip} onChange = {this.handleChange} ></input>
                {this.state.valid && //conditional render
                    <Report
                        fullReport = {this.state.fullReport}
                        city = {this.state.city}
                        temp = {this.state.temp}
                        conditions = {this.state.conditions}
                    />
                }
      
            </div>
        )
    }

}

export default withSiteData(() => (
    <div>
        <h2 style={{ textAlign: 'center' }}> Enter your zip code below </h2>
        <Weather/>
    </div>
))
