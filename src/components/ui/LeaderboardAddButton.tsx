import { useMutation } from '@tanstack/react-query';
import { FC, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { addWordfallScore, addWpmScore } from '../../lib/db/dbfunctions';
import { useDialog } from '../../hooks/useDialog';
import { Difficulty } from '../../lib/types';
import Button from './Button';
import React from 'react';

interface LeaderboardAddButtonProps {
    score: number
    addScore: Function
    difficulty?: Difficulty
}

const LeaderboardAddButton: FC<LeaderboardAddButtonProps> = ({ score, addScore, difficulty}) => {
    const [scoreAdded, setScoreAdded] = useState(false)
    const { isOpen, toggleDialog } = useDialog()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const addMutation = useMutation({
        mutationFn: async (name: string) => {
            console.log(name)
            if (difficulty) {
                console.log({ name, score })
                const newScore = await addScore(difficulty, { name, score })
                return newScore
            }
            const newScore = await addScore({ name, score })
            return newScore
        },
        onSuccess: () => {
            setScoreAdded(true)
        },
        onError: () => console.log("error")
    })
    console.log(scoreAdded)

    const handleClick = (values: FieldValues) => {
        addMutation.mutate(values.name)
    }
    return (
        <>
            {isOpen && !scoreAdded ? <form onSubmit={handleSubmit(handleClick)} className="flex flex-col items-center gap-5 w-[75%]">
                <div className="">
                    <input {...register("name", { required: true, minLength: 2 })} placeholder='Enter name' className="text-black" />
                    {errors.name && <p className="text-red-500 text-xs">Provide a proper name</p>}
                </div>
                <Button backgroundColor='cyan' textColor='white' className='animate-spin' type="submit">Enter leaderboard</Button>
            </form> :
                <>
                    {scoreAdded ? <h2>Score added to the leaderboard!</h2> : <Button backgroundColor='cyan' textColor='white' onClick={toggleDialog}>Add to leaderboard?</Button>}
                </>
            }
        </>
    )
}

export default LeaderboardAddButton