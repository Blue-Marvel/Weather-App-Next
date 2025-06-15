"use client";

import { useWeather } from "@/lib/hooks/use_weather";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [shouldFetch, setShouldFetch] = useState(false);

  const { data, isLoading, error } = useWeather(searchCity, shouldFetch);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`;

      try {
        const geoRes = await fetch(url);
        const geoData = await geoRes.json();
        console.log(geoData);
        const currentCity = geoData[0]?.state;

        if (currentCity) {
          setSearchCity(currentCity);
          setCity(currentCity);
          setShouldFetch(true);
        }
      } catch (e) {
        console.log("Failed to get city from location ", e);
      }
    });
  }, []);

  // console.log(error);

  const handleSearch = () => {
    if (!city.trim()) return;
    setSearchCity(city);
    setShouldFetch(true);
  };

  return (
    <div>
      {error && <p className="text-red-500">{error.message}</p>}

      {isLoading && <p>Loading...</p>}

      {data && (
        <div className=" bg-gradient-to-b from-blue-100 to-white w-screen h-screen flex flex-col justify-center items-center px-4">
          <h1 className=" text-black text-4xl font-bold mb-8">Weather App</h1>
          {/* Input field */}

          <div className="flex gap-2 w-full max-w-md shadow-md overflow-hidden mb-8 bg-white rounded-full">
            <input
              type="text"
              className="flex-1 px-4 py-3 outline-none text-gray-700"
              value={city}
              placeholder="Enter city name"
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              onClick={handleSearch}
              className=" bg-blue-500 rounded-full text-white px-6 py-2 font-semibold hover:bg-blue-600 cursor-pointer"
            >
              Search
            </button>
          </div>
          {/* details */}
          <div className=" p-8 rounded-4xl bg-white w-full max-w-md shadow-md">
            <h2 className=" text-black text-3xl font-semibold ">{data.name}</h2>
            <div className=" flex space-x-4 items-center justify-between">
             <div>
             <h1 className=" text-black text-4xl font-semibold mb-3 ">
                {data.main.temp}°C
              </h1>
             <p>Partly cloudy</p>
              </div> 
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].description}
                className=" w-40 h-40"
              />
            </div>
            {/* Spacing linie */}
            <div className=" w-full h-[0.1] bg-gray-100 mt-4 mb-4 shadow-md"></div>
            {/* Humidity and wind */}
            <div className=" flex w-full">
              <div className=" w-full">
                <p>Humidity</p>
                <h5 className=" text-lg font-semibold">
                  {data.main.humidity} %
                </h5>
              </div>
              <div className=" w-full">
                <p>Wind</p>
                <h5 className=" text-lg font-semibold">
                  {data.wind.speed}km/h
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
