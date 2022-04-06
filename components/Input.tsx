import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline'
import { useCallback, useEffect, useRef, useState } from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { useGetPopupPosition } from '../hooks/useGetPopupPosition'
import { useGetImageUrl } from '../hooks/useGetImageUrl'
import { usePopup } from '../hooks/usePopup'
import { sendPost as sendPostFunction } from '../modules/sendPost'
import { useSession } from 'next-auth/react'
import { TwitterSession } from '../pages/api/auth/[...nextauth]'
import Image from 'next/image'

const Input = () => {
  const { data: session } = useSession()
  const [input, setInput] = useState('')
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [showEmojis, setShowEmojis] = useState(false)
  const filePickerRef = useRef<HTMLInputElement>(null)
  const { buttonRef, getPopupPosition } = useGetPopupPosition(320)
  const addImageToPost = useGetImageUrl(setSelectedImage)
  const [isLoading, setIsLoading] = useState(false)

  const closePopup = () => {
    if (showEmojis) {
      setShowEmojis(false)
    }
  }

  const pickerRef = usePopup(closePopup, showEmojis)

  const sendPost = async () => {
    if (isLoading) return
    setIsLoading(true)

    await sendPostFunction(input, selectedImage, session as TwitterSession)

    setIsLoading(false)
    setInput('')
    setSelectedImage(null)
  }

  const addEmoji = useCallback(
    (e) => {
      let sym = e.unified.split('-')
      let codesArray: any[] = []
      sym.forEach((el: string) => {
        codesArray.push(`0x${el}`)
      })
      let emoji = String.fromCodePoint(...codesArray)
      setInput(`${input}${emoji}`)
    },
    [input]
  )

  return (
    <div
      className={`flex items-start space-x-3 overflow-y-scroll border-b border-gray-700 p-3 ${
        isLoading && 'opacity-60'
      }`}
    >
        <Image
          height={50}
          width={50}
          src={session?.user?.image || ''}
          alt="User profile"
          className="rounded-full"
        />
      <div className="w-full divide-y divide-gray-700">
        <div className={`${selectedImage && 'pb-7'} space-y-2.5`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            className="min-h-[50px] w-full bg-transparent text-lg tracking-wide text-[#d9d9d9] placeholder-gray-500 outline-none"
            placeholder="What's happening?"
          />

          {selectedImage && (
            <div className="relative mb-2">
              <div
                className="absolute top-1 left-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
                onClick={() => setSelectedImage(null)}
              >
                <XIcon className="h-5 text-white" />
              </div>
              <img
                src={selectedImage}
                alt="Current selected image"
                className="max-h-80 rounded-2xl object-contain"
              />
            </div>
          )}
        </div>

        {!isLoading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current?.click()}
              >
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                <input
                  type="file"
                  hidden
                  onChange={addImageToPost}
                  ref={filePickerRef}
                />
              </div>

              <div className="icon rotate-90">
                <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div
                className="icon"
                onClick={() => setShowEmojis(!showEmojis)}
                ref={buttonRef}
              >
                <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div className="icon">
                <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div ref={pickerRef}>
                {showEmojis && (
                  <Picker
                    style={{
                      position: 'absolute',
                      maxWidth: '320px',
                      borderRadius: '20px',
                      zIndex: 500,
                      ...getPopupPosition(),
                    }}
                    onSelect={addEmoji}
                    theme="dark"
                  />
                )}
              </div>
            </div>
            <button
              onClick={sendPost}
              disabled={!input.trim() && !selectedImage}
              className="rounded-full bg-[#1d9bf0] px-4 py-1.5 font-bold text-white shadow-md hover:bg-[#1a8cd8] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1d9bf0]"
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
