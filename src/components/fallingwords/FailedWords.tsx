import { FC } from 'react'
import { getNewestWord } from '../../lib/util'
import { Word } from '../../lib/types'


interface FailedWordsProps {
    allWords: Word[]
    successfulWords: Word[]
    gameRunning: boolean
}

const FailedWords: FC<FailedWordsProps> = ({ allWords, successfulWords, gameRunning }) => {

    return (
        <>
            {
                gameRunning ? (
                    allWords
                        .filter(word => !successfulWords.some(succWord => succWord.word === word.word) && word.word !== getNewestWord(allWords))
                        .map((word, i) => (
                            <p className={`absolute text-3xl top-[95%] text-red-700`} style={{ left: `${word.left}%` }} key={i}>
                                {word.word}
                            </p>
                        ))
                ) : (
                    allWords
                        .filter(word => !successfulWords.some(succWord => succWord.word === word.word))
                        .map((word, i) => (
                            <p className={`absolute text-3xl top-[95%] text-red-700`} style={{ left: `${word.left}%` }} key={i}>
                                {word.word}
                            </p>
                        ))
                )
            }

        </>
    )
}

export default FailedWords