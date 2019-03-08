import React, { Component } from "react";
import "../styles/App.css";
import Result from "./Result";
import Form from "./Form";

//Klucz do API
const APIKey = "75049c48bc5a45390204fc6fc85eb57d";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "" /*cisnienie*/,
    wind: "",
    err: false
  };

  handleCitySubmit = e => {
    e.preventDefault();
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${
      this.state.value
    }&APPID=${APIKey}&units=metric`;

    fetch(API)
      .then(response => {
        if (response.ok) {
          return response;
        }
        throw Error("Nie udało się ");
      })
      .then(response => response.json())
      .then(data => {
        const time = new Date().toLocaleString();
        this.setState(prevState => ({
          err: false,
          date: time,
          city: prevState.value,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed
        }));
      })
      .catch(err => {
        this.setState(prevState => ({
          err: true,
          city: prevState.value
        }));
      });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${
        this.state.value
      }&APPID=${APIKey}&units=metric`;

      fetch(API)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error("Nie udało się ");
        })
        .then(response => response.json())
        .then(data => {
          const time = new Date().toLocaleString();
          this.setState(prevState => ({
            err: false,
            date: time,
            city: prevState.value,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed
          }));
        })
        .catch(err => {
          this.setState(prevState => ({
            err: true,
            city: prevState.value
          }));
        });
    }
  }

  render() {
    return (
      <div className="App">
        <Form change={this.handleChange} value={this.state.value} />
        <Result weather={this.state} error={this.state.err} />
      </div>
    );
  }
}

export default App;
