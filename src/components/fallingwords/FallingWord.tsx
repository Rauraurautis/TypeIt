import { FC, useEffect, useRef, useState } from 'react'
import { Difficulty, Word } from '../../lib/types'
import { formatAnimationTime, generateNewWord, getNewestWord, getRandomSpot, isLetter, isSuccessfulWord, randomAnimationTime } from '../../lib/util'

interface FallingWordProps {
    gameRunning: boolean
    successfulWords: Word[]
    difficulty: Difficulty | null
    allWords: Word[]
    setGameRunning: React.Dispatch<React.SetStateAction<boolean>>
    setAllWords: React.Dispatch<React.SetStateAction<Word[]>>
    setSuccessfulWords: React.Dispatch<React.SetStateAction<Word[]>>
    inputRef: React.MutableRefObject<HTMLInputElement | null>

}

const FallingWord: FC<FallingWordProps> = ({ inputRef, setGameRunning, gameRunning, allWords, setAllWords, difficulty, successfulWords, setSuccessfulWords }) => {
    const wordRef = useRef<HTMLDivElement | null>(null)
    const [leftPercentage, setLeftPercentage] = useState<number | null>(null)
    const [typedLetters, setTypedLetters] = useState("")
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)


    // Resets game
    useEffect(() => {
        if (difficulty) {
            setAllWords([])
            setSuccessfulWords([])
        }
    }, [difficulty, gameRunning])

    useEffect(() => {
        if (!gameRunning) return

        if (allWords.length - successfulWords.length === 6) {
            setGameRunning(false)
            setAllWords(allWords.slice(0, allWords.length - 1))
            return
        }

        inputRef?.current?.focus()
        const animTime = 2000

        // Resets animation and sets position of the new dropping word
        if (wordRef && wordRef.current) {
            wordRef.current.style.animation = 'none';
            wordRef.current.style.left = '0%';
            void wordRef.current.offsetWidth; // Trigger reflow to reset the animation
            wordRef.current.style.opacity = "100"
            wordRef.current.style.left = leftPercentage + "%"

            wordRef.current.style.animation = `dropDown ${formatAnimationTime(animTime)}s linear`;
        }

        const timeout = setTimeout(() => {
            setTypedLetters("")
            const word = generateNewWord(difficulty as Difficulty, allWords)
            const newLeft = getRandomSpot()
            setLeftPercentage(newLeft)
            setAllWords([...allWords, { word, left: newLeft }])
        }, animTime)

        setTimer(timeout)

        return () => {
            clearTimeout(timeout)
            setTimer(null)
        }

    }, [allWords, successfulWords])

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isLetter(e.key)) {
            const lastWord = getNewestWord(allWords)
            if (typedLetters.length + 1 === lastWord.length && typedLetters + e.key === lastWord) {

                if (wordRef && wordRef.current) {
                    wordRef.current.style.top = wordRef.current.offsetTop + "px"

                    wordRef.current.style.animation = "textGrow 0.5s linear forwards"
                }
                setTypedLetters(prev => prev + e.key)
                clearTimeout(timer as NodeJS.Timeout)

                setTimeout(() => {
                    setSuccessfulWords([...successfulWords, allWords[allWords.length - 1]])
                }, 500)

                return
            }
            setTypedLetters(prev => prev + e.key)
        }
        if (e.key === "Backspace") {
            setTypedLetters(prev => prev.slice(0, prev.length - 1))
        }
    }



    return (
        <>
            {(allWords[0] && !successfulWords.some(succWord => succWord.word === getNewestWord(allWords))) &&
                <div className={`absolute text-3xl`} ref={wordRef}>
                    <input ref={inputRef} value={typedLetters} className="w-full absolute bg-transparent focus:outline-none text-transparent" onChange={() => { }} onKeyDown={e => handleInput(e)} />
                    {
                        getNewestWord(allWords).split("").map((letter, i) => {
                            return (
                                <p className={`inline  ${letter === typedLetters[i] ? "text-green-700" : !typedLetters[i] ? "text-white" : "text-red-700"}`} key={i}>{letter}</p>
                            )
                        })
                    }


                </div>}

        </>
    )

}

export default FallingWord