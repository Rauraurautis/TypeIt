import { FC, useState } from 'react'
import { useWordfallStore } from '../../lib/store'



const Scoreboard = () => {
    const {successfulWords} = useWordfallStore()
    return (
        <div className="absolute top-20 text-center w-full ">
            <h2 className='text-5xl'>{successfulWords.length}</h2>
        </div>
    )
}

export default Scoreboard