export type Word = {
    word: string
    left: number
}

export type Difficulty = "easy" | "medium" | "hard"

export type Gamemode = "wordfallgame" | "wpmgame" | null

export type PlayerScoreData = {
    name: string
    score: number
}

export type Score = {
    player: {
        name: string
        score: number
    }
}