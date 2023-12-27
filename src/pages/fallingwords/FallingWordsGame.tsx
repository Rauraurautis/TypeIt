import { useEffect, useRef, useState } from 'react'
import Scoreboard from '../../components/fallingwords/Scoreboard'
import FallingWord from '../../components/fallingwords/FallingWord'
import FailedWords from '../../components/fallingwords/FailedWords'
import { useWordfallStore } from '../../lib/store'
import PlayerDialog from '../../components/ui/PlayerDialog'
import DifficultySelection from '../../components/fallingwords/DifficultySelection'





const FallingWordsGame = () => {
    const gameRunning = useWordfallStore(state => state.gameRunning)
    const difficulty = useWordfallStore(state => state.difficulty)
    const successfulWords = useWordfallStore(state => state.successfulWords)
    const screenRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)



    return (
        <div className="flex justify-center items-center h-full w-full" ref={screenRef} onClick={() => inputRef?.current?.focus()}>
            {gameRunning ?
                <>
                    <Scoreboard />
                    <FallingWord
                        inputRef={inputRef} />
                </> :
                <PlayerDialog>
                    {difficulty && <h2>Final score: {successfulWords.length}</h2>}
                    <DifficultySelection />
                </PlayerDialog>}

            <FailedWords />
        </div>
    )
}

export default FallingWordsGame