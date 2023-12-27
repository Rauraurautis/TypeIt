import { FC, SetStateAction } from 'react'
import { Difficulty } from '../../lib/util/types'
import { useWordfallStore } from '../../lib/store'


const buttonStyle = "p-3 font-semibold cursor-pointer hover:bg-opacity-75"
const difficulties = ["easy", "medium", "hard"]
const colors = {
    easy: "bg-green-700",
    medium: "bg-yellow-700",
    hard: "bg-red-700"
}



const DifficultySelection = () => {
    const { difficulty, setDifficulty, setGameRunning, setAllWords, setSuccessfulWords } = useWordfallStore()
    const difficultyClickHandler = (diff: Difficulty) => {
        setDifficulty(diff)
        setGameRunning(true)
        setAllWords([])
        setSuccessfulWords([])
    }

    return (
        <div className="flex flex-col gap-3 items-center">
            <h1 className="text-center text-2xl">Select difficulty and play</h1>
            <div className="flex gap-5">
                {difficulties.map((diff, i) => (
                    <div key={i} className={`${buttonStyle} ${colors[diff as keyof typeof colors]} ${difficulty === diff && "bg-opacity-75"}`} onClick={() => difficultyClickHandler(diff as Difficulty)}>
                        {diff}
                    </div>

                ))}
            </div>

        </div>
    )
}

export default DifficultySelection