import { useCallback, useEffect, useRef } from "react"

export const usePopup = (callback: () => void, isOpen: boolean) => {
    const ref = useRef<HTMLDivElement>(null)

    const closePopup = () => {
        callback()
    }

    const clickHandler = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback()
        }
    }

    useEffect(() => {
        document.addEventListener('click', clickHandler)
        window.addEventListener('resize', closePopup)
        return () => {
            document.removeEventListener('click', clickHandler)
            window.removeEventListener('resize', closePopup)
        }
    }, [isOpen])

    return ref
}