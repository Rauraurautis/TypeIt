import { FC, useState } from 'react'
import PlayerDialog from '../ui/PlayerDialog'
import { Difficulty, Word } from '../../lib/types'
import DifficultySelection from '../ui/DifficultySelection'
import { useDialog } from '../../hooks/useDialog'
import FallingWordFinalScore from './FallingWordFinalScore'
import Button from '../ui/Button'
import FallingWordLeaderboard from './FallingWordLeaderboard'


interface FallingWordDashboardProps {
    difficulty: Difficulty | null
    successfulWords: Word[]
    setDifficulty: React.Dispatch<React.SetStateAction<Difficulty | null>>
    setGameRunning: React.Dispatch<React.SetStateAction<boolean>>

}

const FallingWordDashboard: FC<FallingWordDashboardProps> = ({ difficulty, successfulWords, setDifficulty, setGameRunning }) => {
    const { dialogRef, isOpen: leaderboardOpen, toggleDialog: toggleLeaderboard } = useDialog()


    const handleDifficultyClick = (difficulty: Difficulty) => {
        setDifficulty(difficulty)
        if (setGameRunning) setGameRunning(prev => !prev)
    }

    return (
        <>

            {leaderboardOpen &&
                <div className="absolute z-20">
                    <FallingWordLeaderboard toggleLeaderboard={toggleLeaderboard} dialogRef={dialogRef} />
                </div>}

            <PlayerDialog>
                <div className="flex flex-col items-center gap-5">
                    {difficulty && <FallingWordFinalScore score={successfulWords.length} difficulty={difficulty} />}
                    <Button backgroundColor='cyan' textColor='white' className='hidden' onClick={toggleLeaderboard}>Leaderboard</Button>
                    <h1 className="text-center text-2xl">Select difficulty and play</h1>
                    <DifficultySelection difficulty={difficulty} setDifficulty={setDifficulty} clickHandler={handleDifficultyClick} />
                </div>
            </PlayerDialog>


        </>
    )
}

export default FallingWordDashboard