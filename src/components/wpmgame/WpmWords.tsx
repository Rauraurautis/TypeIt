import { FC, useEffect, useRef, useState } from 'react'
import { generateWords } from '../../lib/util'
import React from 'react'

interface WpmWordsProps {
    generatedWords: string
    typedLetters: string
    textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>
    handleInput: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

const WpmWords: FC<WpmWordsProps> = React.memo(({ generatedWords, typedLetters, textareaRef, handleInput }) => {






    return (
        <div className="text-2xl absolute p-5 cursor-pointer">
            {generatedWords.split("").map((letter, i) => (
                <p key={i + letter} className={`inline ${typedLetters[i] === letter ? "text-green-700" : typedLetters[i] !== undefined ? "text-red-700" : "text-white"}`}>{letter}</p>
            ))}
            <textarea ref={textareaRef} className="text-2xl bg-transparent outline-none absolute top-0 left-0 w-full h-full text-justify resize-none text-transparent cursor-default"
                value={generatedWords.slice(0, typedLetters.length)} onKeyDown={(e) => handleInput(e)} onChange={() => { }} />
        </div>
    )
})

export default WpmWords