
import { FC, SetStateAction } from 'react'
import WpmGameField from '../../components/wpmgame/WpmGameField'
import { useWpmStore } from '../../lib/store'
import PlayerDialog from '../../components/ui/PlayerDialog'


interface WpmGameProps {

}

const WpmGame: FC<WpmGameProps> = ({ }) => {
    const gameRunning = useWpmStore(state => state.gameRunning)

    return (
        <div className="flex justify-center items-center h-full w-full">
            {gameRunning ?
                <WpmGameField />
                :
                <PlayerDialog>
                    <h1>das</h1>
                </PlayerDialog>}


        </div>
    )
}

export default WpmGame