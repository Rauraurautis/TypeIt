import { FC, useCallback, useEffect, useState } from 'react'
import PlayerDialog from '../ui/PlayerDialog'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { getNextWordfallBatch, getNextWpmBatch, getWordfallScores } from '../../lib/db/dbfunctions'
import { Difficulty } from '../../lib/types'
import DifficultySelection from '../ui/DifficultySelection'
import Back from '../ui/svgs/Back'
import Leaderboard from '../ui/Leaderboard'
import { useInView } from 'react-intersection-observer'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

interface FallingWordLeaderboardProps {
    toggleLeaderboard: () => void
}

export type Score = {
    player: {
        name: string
        score: number
    }
}


const FallingWordLeaderboard: FC<FallingWordLeaderboardProps> = ({ toggleLeaderboard }) => {
    const queryClient = useQueryClient()

    const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
    const { ref, inView } = useInView();

    const fetchScores = async ({ pageParam }: { pageParam: QueryDocumentSnapshot<DocumentData, DocumentData> | null }) => {
        const newScores = pageParam ? await getNextWordfallBatch(difficulty ?? "medium", pageParam) : await getNextWordfallBatch(difficulty ?? "medium")
        if (newScores) {
            return { data: newScores.data, docs: newScores.docs }
        }
        return { data: [], docs: [] }

    }

    const { data,
        fetchNextPage,
        isFetchingNextPage, hasNextPage, refetch, }
        = useInfiniteQuery({
            queryKey: ["fallingwordscores"],
            queryFn: fetchScores,
            getNextPageParam: (lastPage, pages) => {

                console.log(difficulty)
                if (lastPage) {
                    return lastPage?.docs[1]
                }
                return null
            },
            initialPageParam: null,
            staleTime: 10000
        })


    useEffect(() => {
        if (inView && hasNextPage) {
            const timeout = setTimeout(() => {
                fetchNextPage()
            }, 500)
            fetchNextPage()

            return () => {
                clearTimeout(timeout)
            }

        }
    }, [inView, hasNextPage, fetchNextPage, difficulty])


    const allPlayers = data?.pages.flatMap(item => {
        if (item?.data) {
            return item.data.map(innerItem => innerItem);
        } else {
            return [];
        }
    });

    const handleDifficultyClick = (difficulty: Difficulty) => {
        setDifficulty(difficulty)
        queryClient.clear()
    }

    return (
        <div className="h-[50%]">
            <PlayerDialog height='full' padding={20}>
                <button className="top-5 left-5 absolute" onClick={toggleLeaderboard}><Back /></button>
                <h1>{difficulty ?? "medium"}</h1>
                <Leaderboard data={allPlayers} isFetching={isFetchingNextPage} tableRowRef={ref} />
                <div className="mt-10">
                    <DifficultySelection difficulty={difficulty} setDifficulty={setDifficulty} clickHandler={handleDifficultyClick} />
                </div>
            </PlayerDialog>
        </div>
    )
}

export default FallingWordLeaderboard