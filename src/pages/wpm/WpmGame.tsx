
import { FC, SetStateAction, useState } from 'react'
import WpmGameField from '../../components/wpmgame/WpmGameField'
import { useWpmStore } from '../../lib/store'
import PlayerDialog from '../../components/ui/PlayerDialog'
import { useTimer } from '../../hooks/useTimer'


interface WpmGameProps {

}

const WpmGame: FC<WpmGameProps> = ({ }) => {


    return (
        <div className="flex justify-center items-center h-full w-full animate-fadeIn">
            <WpmGameField />
        </div>
    )
}

export default WpmGame