import { FC, useEffect, useState } from 'react'
import { useWordfallStore } from '../../lib/store'
import { useDialog } from '../../hooks/useDialog'
import PlayerDialog from '../ui/PlayerDialog'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { getWordfallScores } from '../../lib/db/dbfunctions'
import { Difficulty } from '../../lib/types'
import DifficultySelection, { difficulties } from '../ui/DifficultySelection'
import Back from '../ui/svgs/Back'
import Leaderboard from '../ui/Leaderboard'

interface FallingWordLeaderboardProps {
    toggleLeaderboard: () => void
    dialogRef: React.MutableRefObject<HTMLDivElement | null>
}

export type Score = {
    player: {
        name: string
        score: number
    }
}


const FallingWordLeaderboard: FC<FallingWordLeaderboardProps> = ({ toggleLeaderboard, dialogRef }) => {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null)

    const { data, refetch, isLoading, isFetching } = useQuery({
        queryKey: ["scores"], queryFn: async () => {
            await new Promise((res) => setTimeout(res, 1000))
            const data = await getWordfallScores(difficulty ?? "medium")
            console.log(data)
            return data
        }, staleTime: 30000
    })

    useEffect(() => {
        refetch()
    }, [difficulty])

    const handleDifficultyClick = (difficulty: Difficulty) => {
        setDifficulty(difficulty)
    }


    return (
        <div className="h-[50%]">
            <PlayerDialog height='full' padding={20}>
                <button className="top-5 left-5 absolute" onClick={toggleLeaderboard}><Back /></button>
                <Leaderboard data={data} isFetching={isFetching} />
                <div className="mt-10">
                    <DifficultySelection difficulty={difficulty} setDifficulty={setDifficulty} clickHandler={handleDifficultyClick} />
                </div>
            </PlayerDialog>
        </div>
    )
}

export default FallingWordLeaderboard