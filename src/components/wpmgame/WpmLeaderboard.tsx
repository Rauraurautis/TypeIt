import { FC, useEffect } from 'react'
import PlayerDialog from '../ui/PlayerDialog'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getNextWpmBatch } from '../../lib/db/dbfunctions'
import Back from '../ui/svgs/Back'
import Leaderboard from '../ui/Leaderboard'
import { useInView } from 'react-intersection-observer'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

interface WpmLeaderboardProps {
  toggleLeaderboard: () => void
  dialogRef: React.MutableRefObject<HTMLDivElement | null>
}

export type Score = {
  player: {
    name: string
    score: number
  }
}

const WpmLeaderboard: FC<WpmLeaderboardProps> = ({ toggleLeaderboard, dialogRef }) => {
  const { ref, inView } = useInView();

  const fetchScores = async ({ pageParam }: { pageParam: QueryDocumentSnapshot<DocumentData, DocumentData> | null }) => {
    const newScores = pageParam ? await getNextWpmBatch(pageParam) : await getNextWpmBatch()
    if (newScores) {
      return { data: newScores.data, docs: newScores.docs }
    }
    return { data: [], docs: [] }

  }

  const { data,
    fetchNextPage,
    isFetchingNextPage, hasNextPage }
    = useInfiniteQuery({
      queryKey: ["wpmscores"],
      queryFn: fetchScores,
      getNextPageParam: (lastPage, pages) => {

        if (lastPage) {
          return lastPage?.docs[1]
        }
        return null
      },
      initialPageParam: null
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
  }, [inView, hasNextPage, fetchNextPage])


  const allPlayers = data?.pages.flatMap(item => {
    if (item?.data) {
      return item.data.map(innerItem => innerItem);
    } else {
      return [];
    }
  });



  return (
    <div className="h-[50%] z-20">
      <PlayerDialog height='full' padding={20}>
        <button className=" top-5 left-5 absolute" onClick={toggleLeaderboard}><Back /></button>
        <Leaderboard data={allPlayers} isFetching={isFetchingNextPage} tableRowRef={ref} />
      </PlayerDialog>
    </div>
  )
}



export default WpmLeaderboard