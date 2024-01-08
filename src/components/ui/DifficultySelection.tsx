import { FC, SetStateAction } from 'react'
import { Difficulty } from '../../lib/types'
import { useWordfallStore } from '../../lib/store'
import Button from './Button'


const buttonStyle = "p-3 font-semibold cursor-pointer hover:bg-opacity-75"
export const difficulties: Difficulty[] = ["easy", "medium", "hard"]
export const difficultyColors = {
    easy: "#15803d",
    medium: "#ca8a04",
    hard: "#b91c1c"
}


interface DifficultySelectionProps {
    difficulty: Difficulty | null
    setDifficulty: React.Dispatch<React.SetStateAction<Difficulty | null>>
    clickHandler: (diff: Difficulty) => void
}

const DifficultySelection: FC<DifficultySelectionProps> = ({ difficulty, setDifficulty, clickHandler }) => {



    return (
        <div className="flex flex-col gap-3 items-center">
            <div className="flex gap-5 text-black">
                {difficulties.map((diff, i) => (
                    <Button key={i} customBackgroundColor={difficultyColors[diff]} selected={difficulty === diff} onClick={() => clickHandler(diff)}>
                        {diff}
                    </Button>
                ))}
            </div>

        </div>
    )
}

export default DifficultySelection