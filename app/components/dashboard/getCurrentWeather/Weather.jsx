'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
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

  // Weather icon URL from OpenWeatherMap API
  const weatherIcon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <section className="flex flex-col font-Roboto text-sm">
      <div className="flex items-center">
        <div className="relative w-12 h-12">
          <Image
            src={weatherIcon}
            alt={weather.weather[0].description}
            fill
            objectFit="cover"
            sizes="100%" // Optimize the image based on its container
          />
        </div>
        <div className="ml-2">
          <p className="font-medium capitalize text-info">
            {weather.main.temp}°C
          </p>
          <p className="font-medium capitalize text-secondary-content">
            {weather.weather[0].description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Weather
