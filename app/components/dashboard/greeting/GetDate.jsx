import React from 'react'
import { getDate } from './getTime'

function GetDate() {
  return (
    <h2 className="mb-3 font-medium font-Roboto capitalize text-secondary-content/75">
      {getDate()}
    </h2>
  )
}

export default GetDate
