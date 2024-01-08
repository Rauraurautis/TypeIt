import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { generateWords, isLetter } from '../../lib/util'
import { useTimer } from '../../hooks/useTimer'
import WpmDashboard from './WpmDashboard'
import WpmWords from './WpmWords'
import { useWpmWords } from '../../hooks/useWpmWords'
import { useDialog } from '../../hooks/useDialog'

interface WpmGameProps {

}

const WpmGameField: FC<WpmGameProps> = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const { time, startTimer, resetTimer, timerRunning, timerComplete } = useTimer()
  const { generatedWords, previouslyTypedLetters, typedLetters, setGeneratedWords, setPreviouslyTypedLetters, setTypedLetters } = useWpmWords()

  useEffect(() => {
    textareaRef?.current?.focus()
    generateWords(15)
  }, [])

  useEffect(() => {
    if (typedLetters.length === generatedWords.length) {
      setPreviouslyTypedLetters(prev => prev + typedLetters)
      setTypedLetters("")
      setGeneratedWords(generateWords(15))
    }
  }, [typedLetters])

  const handleInput = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (timerComplete) return
    if (!timerRunning) startTimer()
    if (isLetter(e.key)) setTypedLetters(prev => prev + e.key)
    if (e.key === "Backspace") setTypedLetters(prev => prev.slice(0, prev.length - 1))
  }, [timerComplete])

  const handleRestart = useCallback(() => {
    setGeneratedWords(generateWords(15))
    setTypedLetters("")
    setPreviouslyTypedLetters("")
    resetTimer()
  }, [])
  

  return (
    <div className="w-[40%] min-w-[350px] relative bg-black bg-opacity-10 h-[80%] flex flex-col items-center justify-center" onClick={() => !timerComplete && textareaRef?.current?.focus()}>
      <WpmDashboard generatedWords={generatedWords} handleRestart={handleRestart} previouslyTypedLetters={previouslyTypedLetters} time={time} timerComplete={timerComplete} typedLetters={typedLetters} />
      <WpmWords generatedWords={generatedWords} handleInput={handleInput} typedLetters={typedLetters} textareaRef={textareaRef} />
    </div >
  )
}

export default WpmGameField