import { FC } from 'react'

interface PlayerDialogProps {
    children: React.ReactNode
}

const PlayerDialog: FC<PlayerDialogProps> = ({ children }) => {
    return (
        <div className="bg-black bg-opacity-10 p-5 animate-fadeIn">
            <div className="flex flex-col items-center">
                {children}
            </div>
        </div>
    )

}

export default PlayerDialog