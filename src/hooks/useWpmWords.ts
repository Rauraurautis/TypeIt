import { useState } from "react"
import { generateWords } from "../lib/util"

export const useWpmWords = () => {
    const [generatedWords, setGeneratedWords] = useState<string>(generateWords(15))
    const [previouslyTypedLetters, setPreviouslyTypedLetters] = useState("")
    const [typedLetters, setTypedLetters] = useState("")

    return { generatedWords, previouslyTypedLetters, typedLetters, setGeneratedWords, setPreviouslyTypedLetters, setTypedLetters }
}