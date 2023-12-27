import zustand, { create } from "zustand";
import { Difficulty, Word } from "./util/types";
import { generateWords } from "./util";

interface WordfallStore {
    difficulty: Difficulty | null
    gameRunning: boolean
    allWords: Word[]
    successfulWords: Word[]
    setAllWords: (words: Word[]) => void
    setSuccessfulWords: (words: Word[]) => void
    setGameRunning: (gameRunning: boolean) => void
    setDifficulty: (difficulty: Difficulty) => void
}

const useWordfallStore = create<WordfallStore>((set, get) => ({
    difficulty: null,
    gameRunning: false,
    allWords: [],
    successfulWords: [],
    setDifficulty(difficulty: Difficulty) {
        set(state => ({ ...state, difficulty }))
    },
    setGameRunning(gameRunning: boolean) {
        set(state => ({ ...state, gameRunning }))
    },
    setAllWords(words: Word[]) {
        set(state => ({ ...state, allWords: words }))
    },
    setSuccessfulWords(words: Word[]) {
        set(state => ({ ...state, successfulWords: words }))
    },

}))

interface WpmStore {
    generatedWords: string[]
    gameRunning: boolean
    generateWords: (amount: number) => void
    setGameRunning: (gameRunning: boolean) => void
}

const useWpmStore = create<WpmStore>((set, get) => ({
    generatedWords: [],
    gameRunning: false,
    setGameRunning(gameRunning: boolean) {
        set(state => ({ ...state, gameRunning }))
    },
    generateWords(amount: number) {
        const words = generateWords(amount).split(" ")
        set(state => ({ ...state, generatedWords: words }))
    }

}))

export { useWordfallStore, useWpmStore }