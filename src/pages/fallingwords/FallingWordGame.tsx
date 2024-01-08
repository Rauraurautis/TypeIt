import { useEffect, useRef, useState } from 'react'
import FallingWord from '../../components/fallingwords/FallingWord'
import FailedWords from '../../components/fallingwords/FailedWords'
import PlayerDashboard from '../../components/fallingwords/FallingWordDashboard'
import { Difficulty, Word } from '../../lib/types'
import FallingWordGamefield from '../../components/fallingwords/FallingWordGamefield'





const FallingWordsScreen = () => {





    return (
        <>
            <FallingWordGamefield />
        </>
    )
}

export default FallingWordsScreen