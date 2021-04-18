import React, { useEffect, useState } from "react";
import "./WeatherAPI.css";

const cssStyle = {
  color: "yellow",
};

function WeatherAPI() {
  // useHooks
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Rewari");
  
  //useEffects

  useEffect(() => {
  
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8148f4758fbbc053d6e28ebea7b2fa28`;
      const response = await fetch(url);
      // console.log(response);
      const resJson = await response.json();
      setCity(resJson);
     

    };

    fetchApi();
  }, [search]);

  return (
    <>
      <div className="heading">
        <h1>Weather APP ^_^</h1>
      </div>
      <div className="container">
        <div className="box" style={{backgroundImage:'url("https://source.unsplash.com/random")',opacity:"0.8",zIndex:"1"}}>
          <div className="inputData">
            <input
              type="search"
              className="inputFeild"
              onChange={(event) => {
                setSearch(event.target.value);
                
              }}
            />
          </div>
          {!city || city.cod === "404" || city.cod === "400" ? (
            <p className="errMsg">No Data Found</p>
          ) : (
            
            <>
            {console.log(city.weather[0].main)}
              <div className="wave -one"></div>
              <div className="wave -two"></div>
              <div className="wave -three"></div>

              <div className="weathercon">
                <h1 className="weatherimg">
                  {/* // Rain , Cloud, else sun */}
                  {city.weather[0].main==='Clouds'?<i class="fas fa-cloud" style={{color:"#FFF"}}></i>:city.weather[0].main==='Rain'?<i class="fas fa-cloud-rain" style={{color:"#FFF"}}></i>:<i className="fas fa-sun" style={cssStyle}></i>}
                  
                </h1>
              </div>

              <div className="info">
                <h2 className="location">
                  <i
                    className="fas fa-street-view"
                    style={{ color: "black" }}
                  ></i>
                  {city.name},{city.sys.country}
                </h2>
                {/* <p id="date">WED| OCT 23| 10:49AM</p> */}
                <h1 className="temp">{city.main.temp}&deg;C</h1>
                <h3 className="tempmin_max">
           
                  {city.main.temp_min}&deg;C | {city.main.temp_max}&deg;C
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherAPI;
