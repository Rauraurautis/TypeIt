import { useInfiniteQuery } from '@tanstack/react-query'
import { FC } from 'react'

interface LeaderboardInfiniteProps {

}

const scores = [{ player: "Pekka", score: 22 }, { player: "Jorma", score: 242 }, { player: "Rarar", score: 2 }, { player: "mulkku", score: 2 }, { player: "Rauno", score: 255 }, { player: "Peku", score: 12 },]

const fetchScores = async ({ pageParam = 1 }) => {
    await new Promise(res => setTimeout(res, 500))
    return scores.slice(pageParam - 1 * 2, pageParam * 2)
}

const LeaderboardInfinite: FC<LeaderboardInfiniteProps> = ({ }) => {
    const { data,
        fetchNextPage,
        isFetching }
        = useInfiniteQuery({
            queryKey: ["scores"],
            queryFn: fetchScores,
            getNextPageParam: (_, pages) => {
                return pages.length + 1
            },
            initialData: {
                pages: [],
                pageParams: [1]
            },
            initialPageParam: 1

        })


    return <div>LeaderboardInfinite</div>
}

export default LeaderboardInfinite