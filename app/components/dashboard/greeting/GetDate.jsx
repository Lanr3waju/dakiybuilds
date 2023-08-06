import React from 'react'
import { getDate } from './getTime'

function GetDate() {
    return (
        <h2 className='mb-3 font-Poppins text-lg font-medium uppercase'>
            {getDate()}
        </h2>
    )
}

export default GetDate
