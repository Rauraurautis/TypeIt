import { FC, useState } from 'react'
import { useDialog } from '../../hooks/useDialog'
import WpmLeaderboard from './WpmLeaderboard'
import WpmFinalScore from './WpmFinalScore'
import Button from '../ui/Button'

interface WpmDashboardProps {
    timerComplete: boolean
    time: number
    previouslyTypedLetters: string
    typedLetters: string
    generatedWords: string
    handleRestart: () => void

}

const WpmDashboard: FC<WpmDashboardProps> = ({ timerComplete, previouslyTypedLetters, typedLetters, generatedWords, time, handleRestart }) => {
    const { dialogRef, isOpen: leaderboardOpen, toggleDialog: toggleLeaderboard } = useDialog()

    return (
        <>
            {leaderboardOpen && <WpmLeaderboard toggleLeaderboard={toggleLeaderboard} dialogRef={dialogRef} />}
            <div className="absolute top-10 font-mono left-[50%] translate-x-[-50%]">
                <div className="flex flex-col gap-5 items-center">
                    {!timerComplete &&
                        <>
                            <h1 className="text-4xl">{time}</h1>
                            <Button backgroundColor='cyan' textColor='white' onClick={toggleLeaderboard}>Leaderboard</Button>
                        </>
                    }
                    {timerComplete &&
                        <>
                            <WpmFinalScore generatedWords={generatedWords} previouslyTypedLetters={previouslyTypedLetters} typedLetters={typedLetters} />
                            <div className="flex gap-5">
                                <Button backgroundColor='cyan' textColor='white' onClick={toggleLeaderboard}>Leaderboard</Button>
                                <Button backgroundColor='cyan' textColor='white' onClick={handleRestart}>Restart</Button>
                            </div>
                        </>
                    }

                </div>
            </div>
        </>
    )
}

export default WpmDashboard