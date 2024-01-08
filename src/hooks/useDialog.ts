import { useCallback, useEffect, useRef, useState } from "react"

export const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false)
    const dialogRef = useRef<HTMLDivElement | null>(null)

    const handleClickOutside = useCallback((evt: MouseEvent) => {
        if (dialogRef.current && !dialogRef.current.contains(evt.target as Node)) {
            setIsOpen(false)
        }
    }, [])

    const toggleDialog = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return { isOpen, dialogRef, toggleDialog }


}