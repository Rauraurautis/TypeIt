import { CollectionReference, DocumentData, addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import { Difficulty, PlayerScoreData } from "../types";
import { Score } from "../../components/fallingwords/FallingWordLeaderboard";


const wordfallCollections: Record<Difficulty, CollectionReference<DocumentData, DocumentData>> = {
    hard: collection(db, "wordfallscores_hard"),
    medium: collection(db, "wordfallscores_medium"),
    easy: collection(db, "wordfallscores_easy")
}

const wpmCollection = collection(db, "wpmscores")

export const getWordfallScores = async (difficulty: Difficulty) => {
    try {
        const q = query(wordfallCollections[difficulty], orderBy("player.score", "desc"))
        const snapshot = await getDocs(q)
        console.log(snapshot)
        const data: Score[] = []
        //@ts-ignore
        snapshot.forEach(doc => data.push(doc.data()))
        return data
    } catch (error) {
        console.error(error)
    }
}

export const addWordfallScore = async (difficulty: Difficulty, data: PlayerScoreData) => {
    try {
        const docRef = await addDoc(wordfallCollections[difficulty], { player: data })
        return docRef
    } catch (error) {
        console.error(`Error adding document: ${error}`)
    }
}

export const getWpmScores = async () => {
    try {

        const q = query(wpmCollection, orderBy("player.score", "desc"))
        const snapshot = await getDocs(q)
        const data: Score[] = []
        //@ts-ignore
        snapshot.forEach(doc => data.push(doc.data()))
        return data
    } catch (error) {
        console.error(error)
    }
}

export const addWpmScore = async (data: PlayerScoreData) => {
    try {
        const docRef = await addDoc(wpmCollection, { player: data })
        return docRef
    } catch (error) {
        console.error(`Error adding document: ${error}`)
    }
}