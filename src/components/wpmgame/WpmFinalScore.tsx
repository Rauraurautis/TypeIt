import { FC, useMemo, useState } from 'react'
import { calculateWords } from '../../lib/util'
import LeaderboardAddButton from '../ui/LeaderboardAddButton'
import { addWpmScore } from '../../lib/db/dbfunctions'

interface WpmFinalScoreProps {
    previouslyTypedLetters: string
    typedLetters: string
    generatedWords: string
}

const WpmFinalScore: FC<WpmFinalScoreProps> = ({ previouslyTypedLetters, typedLetters, generatedWords}) => {
    

    const score = useMemo(() =>
        calculateWords(`${previouslyTypedLetters.length > 0 && previouslyTypedLetters + " "}${typedLetters}`, generatedWords),
        [])

    return (
        <>
            <h1 className="text-xl xl:text-3xl w-full text-nowrap">{calculateWords(`${previouslyTypedLetters.length > 0 && previouslyTypedLetters + " "}${typedLetters}`, generatedWords)} words written in 1 minute.</h1>
            <LeaderboardAddButton addScore={addWpmScore} score={score} />
        </>)
}

export default WpmFinalScore