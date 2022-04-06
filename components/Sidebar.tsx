import Image from 'next/image'
import SidebarLink from './SidebarLink'
import { DotsHorizontalIcon, HomeIcon } from '@heroicons/react/solid'
import {
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { usePopup } from '../hooks/usePopup'
import { useState } from 'react'
import { useGetPopupPosition } from '../hooks/useGetPopupPosition'
import { motion } from 'framer-motion'
import { signOut, useSession } from 'next-auth/react'
import { TwitterSession } from '../pages/api/auth/[...nextauth]'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()
  const {data: session} = useSession()
  const [settingsOpen, setSettingOpen] = useState(false)
  const closeSettings = () => {
    if (settingsOpen) {
      setSettingOpen(false)
    }
  }

  const height = 40
  const settingsRef = usePopup(closeSettings, settingsOpen)
  const { buttonRef, getPopupPosition } = useGetPopupPosition(150)

  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      <div className="hoverAnimation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>
      <div className="my-2.5 flex flex-col gap-y-2.5 xl:ml-24">
        <span onClick={() => router.push('/')}><SidebarLink text="Home" Icon={HomeIcon} active={router.pathname === '/'} /></span>
        <SidebarLink text="Explore" Icon={HashtagIcon} />
        <SidebarLink text="Notifications" Icon={BellIcon} />
        <SidebarLink text="Messages" Icon={InboxIcon} />
        <SidebarLink text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarLink text="Lists" Icon={ClipboardIcon} />
        <SidebarLink text="Profile" Icon={UserIcon} />
        <SidebarLink text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      <button className="ml-auto hidden h-[52px] w-56 rounded-full bg-[#1d9bf0] text-lg font-bold text-white shadow-md transition duration-200 ease-out hover:bg-[#1a8cd8] xl:inline">
        Tweet
      </button>
      <div className="hoverAnimation mt-auto min-w-fit flex items-center justify-between text-[#d9d9d9] xl:ml-auto xl:-mr-4">
        <Image
          className="h-10 w-10 rounded-full"
          src={session?.user?.image || ''}
          alt="user avatar"
          height={40}
          width={40}
        />
        <div className="hidden leading-5 xl:inline ml-3">
          <h4 className="font-bold">{session?.user?.name}</h4>
          <p className="text-[#6e767d]">@{(session as TwitterSession)?.user?.tag}</p>
        </div>
        <DotsHorizontalIcon
          ref={buttonRef as any}
          onClick={() => setSettingOpen(true)}
          className="ml-7 hidden h-7 w-7 rounded-full p-1 hover:bg-[#424242] xl:inline"
        />
      </div>
      {settingsOpen && (
        <motion.div
          initial={{
            height: 0,
            opacity: 0,
          }}
          animate={{
            height,
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: 'easeOut',
              staggerChildren: 2,
            },
          }}
          ref={settingsRef}
          className="absolute flex h-[150px] w-[150px] flex-col items-center rounded-lg bg-[#424242] p-2 text-white"
          style={{
            bottom: `calc(calc(100vh - ${getPopupPosition().top}px) + ${
              height + 20
            }px)`,
            left: getPopupPosition().left,
          }}
        >
          <motion.button
            onClick={() => signOut()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
          >
            Sign out
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

export default Sidebar
