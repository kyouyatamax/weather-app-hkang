import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from './App';
import * as serviceWorker from "./serviceWorker";

class WeatherDisplay extends React.Component {
  render() {
    return (
      <div>
        <h2>The current weather is {this.props.value}</h2>
        <h3>For the city of {this.props.maCity}</h3> 
      </div>
    );
  }
}
class ReactionGif extends React.Component {
  constructor(props) {
    super(props);
    this.gifButton = this.gifButton.bind(this);
  }
  gifButton(keyword) {
    const img = document.querySelector('img');
    // fetch('https://api.giphy.com/v1/gifs/translate?api_key=utydx4ZJeUF4Ys1Bdn5Hp8nmF1EqLow6&s=cats'+keyword, {mode:'cors'})
    fetch('https://api.giphy.com/v1/gifs/translate?api_key=utydx4ZJeUF4Ys1Bdn5Hp8nmF1EqLow6&s='+keyword, {mode:'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(response) {
        img.src=response.data.images.original.url;
      })
      .catch(function(error) {
        alert("No such Gif");
      })
  }
  
  render() {
    return (
      <img alt="" src="https://media.tenor.com/images/47b81948be5023555549c01d88ae3289/tenor.gif">
      </img>
    );
  }
}

class LocationEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherDisplay: "DATA DISPLAYED HERE (EVENTUALLY)",
      maCity:"Not Picked Yet"
    };
    this.handleClick = this.handleClick.bind(this);
    this.gettheWeather = this.gettheWeather.bind(this);
  }
  handleClick() {
    // api.openweathermap.org/data/2.5/weather?q=London
    console.log("HUHUHU");
  }

  async gettheWeather() {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7433f086548c39db39d578affe769a25";
    const citySelected = document.getElementById("city-selected").value;
    console.log(citySelected);
    const newURL= "https://api.openweathermap.org/data/2.5/weather?q="+
      +citySelected
      +"&APPID=7433f086548c39db39d578affe769a25";
    const whichURL = (citySelected==0)? url : newURL;
    const response = await fetch(whichURL, { mode: "cors" });
    const data = await response.json();
    if (data.cod == "200") {
      console.log(data.cod);
      console.log(data.weather[0].main);
      const currentWeather = data.weather[0].main;
      console.log(currentWeather);
      this.setState({
        weatherDisplay: currentWeather,
        maCity:data.name
      });
    }
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Please enter a city name"
          id="city-selected"
        />
        <button type="button" onClick={this.gettheWeather}>
          {" "}
          Enter the location for the weather you want
        </button>
        <WeatherDisplay value={this.state.weatherDisplay} maCity={this.state.maCity} />
        <ReactionGif />
      </form>
    );
  }
}

class PrettyHeader extends React.Component {
  render() {
    return <header>Welcome to the Weather Page!</header>;
  }
}

class TopLevelWeatherApp extends React.Component {
  render() {
    return (
      <div className="top-level-weather-app">
        <PrettyHeader />
        <h1>This is the top level of the Weather App</h1>
        <LocationEntry />
      </div>
    );
  }
}

ReactDOM.render(<TopLevelWeatherApp />, document.getElementById("root"));

// ReactDOM.render(<JustTesting />, document.getElementById('root'));
console.log("It's looking like weather time");
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
