import { useCallback } from "react"

export const useGetImageUrl = (callback: (imageUrl: string) => void) => {
    const getImageUrl = useCallback((event: any) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader()
          reader.onload = (e) => {
            callback(e.target!.result as string)
          }
          reader.readAsDataURL(event.target.files[0])
        }
    }, [])

    return getImageUrl
}