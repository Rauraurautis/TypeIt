import { FC } from 'react'

import { Difficulty } from '../../lib/types'

import { addWordfallScore } from '../../lib/db/dbfunctions';
import LeaderboardAddButton from '../ui/LeaderboardAddButton';

interface FallingWordFinalScoreProps {
    score: number
    difficulty: Difficulty
}

const FallingWordFinalScore: FC<FallingWordFinalScoreProps> = ({ score, difficulty }) => {

    return (
        <div className="flex flex-col items-center gap-3">
            <h2>Final score: {score}</h2>
            <LeaderboardAddButton addScore={addWordfallScore} score={score} difficulty={difficulty} />
        </div>)
}

export default FallingWordFinalScore

