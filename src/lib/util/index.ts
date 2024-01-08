import { faker } from "@faker-js/faker"
import { Difficulty, Word } from "../types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const isPage = (name: string, location: string) => {
    return name === location
}

export const isLetter = (input: string) => {
    return input.length === 1
}

const amountPerDifficulty: Record<Difficulty, number> = {
    easy: 4,
    medium: 6,
    hard: 9
}

export const generateNewWord = (difficulty: Difficulty, allWords: Word[]) => {
    let word = ""
    const wordLength = amountPerDifficulty[difficulty]
    while (!word) {
        const newWord = faker.word.words(1)
        if (newWord.length === wordLength && !allWords.some(word => word.word === newWord)) {
            word = newWord
        }
    }

    return word
}


export const generateWords = (amount: number, difficulty?: Difficulty) => {
    if (difficulty) {
        const words = []
        const maxWordLength = amountPerDifficulty[difficulty]
        while (words.length < 15) {
            const word = faker.word.words(1)
            if (word.length === maxWordLength) {
                words.push(word)
            }
        }
        return words.join(" ")
    }
    return faker.word.words(amount)
}

export const calculateWords = (typedWords: string, lastGeneratedWords: string) => {
    const typedWordsArr = typedWords.split(" ")
    const lastGeneratedWordsArr = lastGeneratedWords.split(" ")
    if (!lastGeneratedWordsArr.includes(typedWordsArr[typedWordsArr.length - 1])) {
        return typedWordsArr.length - 1
    }
    return typedWordsArr.length

}

export const lettersMatch = (firstLetters: string[], secondLetters: string[]) => {
    for (let i = 0; i < firstLetters.length; i++) {
        if (firstLetters[i] !== secondLetters[i]) return false
    }
    return true
}

export const getRandomSpot = () => {
    return Math.floor(Math.random() * 90)
}

export const isSuccessfulWord = (word: string, successfulWords: string[]) => {
    return successfulWords.includes(word)
}

export const randomAnimationTime = (difficulty: Difficulty | null) => {
    if (difficulty === "easy") return Math.floor(Math.random() * 3000) + 3000
    if (difficulty === "medium") return Math.floor(Math.random() * 3000) + 2000
    return Math.floor(Math.random() * 3000) + 1000

}

export const formatAnimationTime = (time: number) => {
    const firstTwo = time + "".slice(0, 2)
    return firstTwo[0] + "." + firstTwo[1]
}

export const getNewestWord = (wordArray: Word[]) => {
    return wordArray[wordArray.length - 1].word
}