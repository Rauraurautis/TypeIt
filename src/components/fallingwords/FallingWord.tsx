import { FC, useEffect, useRef, useState } from 'react'
import { Difficulty, Word } from '../../lib/util/types'
import { formatAnimationTime, generateNewWord, getNewestWord, getRandomSpot, isLetter, isSuccessfulWord, randomAnimationTime } from '../../lib/util'
import { useWordfallStore } from '../../lib/store'

interface FallingWordProps {

    inputRef: React.MutableRefObject<HTMLInputElement | null>

}

const FallingWord: FC<FallingWordProps> = ({ inputRef }) => {
    const { difficulty, gameRunning, setGameRunning, setAllWords, setSuccessfulWords, allWords, successfulWords } = useWordfallStore()
    const wordRef = useRef<HTMLDivElement | null>(null)
    const [leftPercentage, setLeftPercentage] = useState<number | null>(null)
    const [typedLetters, setTypedLetters] = useState("")
  
    useEffect(() => {
        if (!gameRunning) return
        const word = generateNewWord()
        const newLeft = getRandomSpot()
        setLeftPercentage(newLeft)

        if (allWords.length - successfulWords.length === 6) {
            setGameRunning(false)
            setAllWords(allWords.slice(0, allWords.length - 1))
            return
        }

        inputRef?.current?.focus()
        const animTime = randomAnimationTime(difficulty)

        // Resets animation and sets position of the new dropping word
        if (wordRef && wordRef.current) {
            wordRef.current.style.animation = 'none';
            wordRef.current.style.left = '0%';
            void wordRef.current.offsetWidth; // Trigger reflow to reset the animation
            wordRef.current.style.left = leftPercentage + "%"
            wordRef.current.style.animation = `dropDown ${formatAnimationTime(animTime)}s linear forwards`;
        }

        const timeout = setTimeout(() => {

            setLeftPercentage(getRandomSpot())
            setTypedLetters("")
            setAllWords([...allWords, { word, left: newLeft }])
        }, animTime)

        return () => {
            clearTimeout(timeout)
        }
    }, [allWords])

    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isLetter(e.key)) {
            const lastWord = getNewestWord(allWords)
            if (typedLetters.length + 1 === lastWord.length && typedLetters + e.key === lastWord) {
                setTypedLetters("")
                setSuccessfulWords([...successfulWords, allWords[allWords.length - 1]])
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
                <div className={`absolute`} ref={wordRef}>
                    <input ref={inputRef} value={typedLetters} className="w-full absolute bg-transparent  focus:outline-none text-transparent" onChange={() => { }} onKeyDown={e => handleInput(e)} />
                    {
                        getNewestWord(allWords).split("").map((letter, i) => {
                            if (wordRef?.current?.offsetWidth) {
                                if ((wordRef.current.offsetWidth + wordRef.current.offsetLeft)) {

                                }
                            }

                            return (
                                <p className={`inline text-3xl ${letter === typedLetters[i] ? "text-green-700" : !typedLetters[i] ? "text-white" : "text-red-700"}`} key={i}>{letter}</p>
                            )
                        })
                    }


                </div>}

        </>
    )

}

export default FallingWord