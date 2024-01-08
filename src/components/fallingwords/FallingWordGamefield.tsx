import { FC, useRef, useState } from 'react'
import { Difficulty, Word } from '../../lib/types'
import FallingWord from './FallingWord'
import PlayerDashboard from './FallingWordDashboard'
import FailedWords from './FailedWords'

interface FallingWordGamefieldProps {

}

const FallingWordGamefield: FC<FallingWordGamefieldProps> = ({ }) => {
    const [gameRunning, setGameRunning] = useState(false)
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
    const [successfulWords, setSuccessfulWords] = useState<Word[]>([])
    const [allWords, setAllWords] = useState<Word[]>([])
    const inputRef = useRef<HTMLInputElement | null>(null)

    return (
        <div className="flex justify-center items-center h-full w-full" onClick={() => inputRef?.current?.focus()}>
            {gameRunning ?
                <FallingWord
                    inputRef={inputRef} gameRunning={gameRunning} setGameRunning={setGameRunning}
                    allWords={allWords} difficulty={difficulty} setAllWords={setAllWords} setSuccessfulWords={setSuccessfulWords} successfulWords={successfulWords}
                     />
                :
                <PlayerDashboard difficulty={difficulty} successfulWords={successfulWords} setDifficulty={setDifficulty} setGameRunning={setGameRunning} />}

            <FailedWords allWords={allWords} gameRunning={gameRunning} successfulWords={successfulWords} />
        </div>
    )
}

export default FallingWordGamefield