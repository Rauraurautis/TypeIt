import { FC, useEffect, useState } from 'react'
import { useWordfallStore } from '../../lib/store'
import { useDialog } from '../../hooks/useDialog'
import PlayerDialog from '../ui/PlayerDialog'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { getWordfallScores, getWpmScores } from '../../lib/db/dbfunctions'
import { Difficulty } from '../../lib/types'
import Back from '../ui/svgs/Back'
import Leaderboard from '../ui/Leaderboard'

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
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["wpmscores"], queryFn: async () => {
      const data = await getWpmScores()
      return data
    }, staleTime: 30000
  })

  useEffect(() => {
    refetch()
  }, [difficulty])

  return (
    <div className="h-[50%] z-20">
      <PlayerDialog height='full' padding={20}>
        <button className=" top-5 left-5 absolute" onClick={toggleLeaderboard}><Back /></button>
        <Leaderboard data={data} isFetching={isFetching} />
      </PlayerDialog>
    </div>
  )
}



export default WpmLeaderboard