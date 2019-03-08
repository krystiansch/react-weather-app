import React from "react";
import "../styles/Result.css";

const Result = props => {
  const {
    err,
    city,
    temp,
    sunrise,
    sunset,
    pressure,
    wind,
    date
  } = props.weather;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();
    content = (
      <>
        <h3>
          Wyniki wyszukiwania dla <em>{city}</em>
        </h3>
        <h4>Dane dla dnia i godziny: {date}</h4>
        <h4>Aktualna temperatura: {temp} &#176;C</h4>
        <h4>Wschód słóńca dzisiaj o {sunriseTime}</h4>
        <h4>Zachód słońca dzisiaj o {sunsetTime}</h4>
        <h4>Aktualna siła wiatru {wind} m/s</h4>
        <h4>Aktualne ciśnienie {pressure} hPa</h4>
      </>
    );
  }

  return (
    <>
      <div className="result">{err ? `Nie mamy w bazie ${city}` : content}</div>
    </>
  );
};

export default Result;
