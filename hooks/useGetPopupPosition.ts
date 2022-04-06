import { useCallback, useRef } from "react"

export const useGetPopupPosition = (popupWidth: number) => {
    const buttonRef = useRef<HTMLDivElement>(null)
    const getPopupPosition = useCallback(() => {
        const boundingClientRect = buttonRef.current!.getBoundingClientRect()
        return {
            top: boundingClientRect.y + boundingClientRect.height + 10,
            left: boundingClientRect.x - popupWidth / 2 + boundingClientRect.width / 2
        }
    }, [buttonRef.current])

    return {buttonRef, getPopupPosition}
}