import { useEffect, useState } from "react"

export const useScreenWidth = (screenRef: React.MutableRefObject<HTMLDivElement | null>) => {
    const [screenWidth, setScreenWidth] = useState<number | undefined>(500)
    let timeout: NodeJS.Timeout | null = null

    useEffect(() => {
        const width = screenRef?.current?.offsetWidth ?? 300
        setScreenWidth(width)
        const handleResize = () => {
            if (timeout) clearTimeout(timeout)
            timeout = setTimeout(() => {
                const width = screenRef?.current?.offsetWidth ?? 300
                setScreenWidth(width)
            }, 500);
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            if (timeout) clearTimeout(timeout)
        }
    }, [])

    return { screenWidth }

}