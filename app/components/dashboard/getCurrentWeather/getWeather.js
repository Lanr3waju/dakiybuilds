'use client'
import axios from 'axios'

const API_KEY = '194095d7d7f3bbd8e788854eb49fa87b'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric', // You can use 'imperial' for Fahrenheit
      },
    })
    return response.data
  } catch (error) {
    const message = `Sorry, there was an error fetching the weather for your site location.`
    alert(message)
  }
}
