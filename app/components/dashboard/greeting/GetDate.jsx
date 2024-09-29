import React from 'react'
import { getDate } from './getTime'

function GetDate() {
  return (
    <h2 className="mb-3 font-Roboto font-medium capitalize text-secondary-content/75">
      {getDate()}
    </h2>
  )
}

export default GetDate
