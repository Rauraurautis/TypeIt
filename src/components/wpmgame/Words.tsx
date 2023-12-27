import { FC, useState } from 'react'
import { generateWords } from '../../lib/util'
import { useWpmStore } from '../../lib/store'


interface WordsProps {

}

const Words: FC<WordsProps> = ({ }) => {
    const generatedWords = useWpmStore(state => state.generatedWords)


    return (
        <div className="w-[50%]">
            {generatedWords}
        </div>
    )
}

export default Words