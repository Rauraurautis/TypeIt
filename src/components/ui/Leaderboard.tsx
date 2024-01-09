import { FC } from 'react'
import { Score } from '../../lib/types'
import Spinner from './svgs/Spinner'

interface FallingWordsScoreboardProps {
    data: Score[] | undefined
    isFetching: boolean
    tableRowRef?: (node?: Element | null | undefined) => void
}

const Leaderboard: FC<FallingWordsScoreboardProps> = ({ data, isFetching, tableRowRef }) => {

    return (
        <div className="flex justify-center scrollbar  w-full min-w-[300px] h-[300px] overflow-y-auto" >
            <h1 className="absolute font-bold text-xl">Top {data?.length ?? 0}</h1>
            {isFetching && <div className="h-full flex items-center absolute"><Spinner /></div>}

            <div className="w-full flex flex-col items-center">
                <table className="mt-10 w-full text-slate-300 border-separate border-spacing-y-1 max-h-[300px]">
                    <thead className="uppercase text-sm p-2">
                        <tr >
                            <th className='text-start p-3'>Rank</th>
                            <th className='text-start p-3'>Name</th>
                            <th className='text-start p-3'>Score</th>
                        </tr>
                    </thead>
                    <tbody className="bg-opacity-25 ">
                        {data?.map(({ player }, i) => {
                            if (data && data.length - 1 === i) {
                                return (
                                    <tr key={player.name + player.score + i} ref={tableRowRef} className={`first:bg-yellow-600 ${i === 1 ? "bg-slate-400" : i === 2 ? "bg-yellow-950  bg-opacity-75" : "bg-black bg-opacity-25"}`}>
                                        <td className="p-3">{i + 1}.</td>
                                        <td className="p-3 font-bold">{player.name}</td>
                                        <td className="p-3">{player.score}</td>
                                    </tr>
                                )
                            }

                            return (
                                <tr key={player.name + player.score + i} className={`first:bg-yellow-600 ${i === 1 ? "bg-slate-400" : i === 2 ? "bg-yellow-950  bg-opacity-75" : "bg-black bg-opacity-25"}`}>
                                    <td className="p-3">{i + 1}.</td>
                                    <td className="p-3 font-bold">{player.name}</td>
                                    <td className="p-3">{player.score}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

        </div >
    )
}


export default Leaderboard