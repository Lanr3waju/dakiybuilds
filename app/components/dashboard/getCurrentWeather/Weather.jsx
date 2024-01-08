'use client'
import { useState, useEffect } from 'react'
import { getCurrentWeather } from './getWeather'

const Weather = () => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getCurrentWeather('Lagos')
      .then((data) => setWeather(data))
      .catch((error) => console.error('Error fetching weather:', error))
  }, [])

  if (!weather) {
    return <p>Loading...</p>
  }

  return (
    <section className="mt-1 flex font-Poppins md:mt-4">
      <p className="mr-2 font-medium capitalize text-info">
        {weather.main.temp}°C
      </p>
      <p className="font-medium capitalize text-info">
        {weather.weather[0].description}
      </p>
    </section>
  )
}

export default Weather
