import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Post } from '../types/Post'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { getTimeForPost } from '../modules/getTimeSince'
import {
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/outline'
import {HeartIcon as HeartIconFilled} from '@heroicons/react/solid'
import { likePost } from '../modules/likePost'
import { useSession } from 'next-auth/react'
import { TwitterSession } from '../pages/api/auth/[...nextauth]'
import useSWR from 'swr'
import { deletePost } from '../modules/deletePost'

const getUserDetails = (session: TwitterSession) => ({
  uid: session.user.uid!,
  name: session.user.name!,
})

const Post: FC<{ post: Post; postPage?: boolean }> = ({ post, postPage }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const {data: likesObj} = useSWR(`/api/likes?pid=${post.id}`)
  const [userDetails] = useState(getUserDetails(session as TwitterSession))
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (!likesObj) return
    if (likesObj.likes[userDetails.uid] && !liked) {
      setLiked(true)
    }

    setLikesCount(Object.values(likesObj.likes).length)
  }, [likesObj])

  const navigate = (id: string) => {
    router.push(`/${id}`)
  }

  const postActions = useMemo(
    () => ({
      like: () => {
        if (session?.user) {
          setLiked(!liked)
          setLikesCount((likesCount || 0) + (!liked ? 1 : -1))
          likePost(post.id, userDetails, !liked)
        }
      },
      delete: () => {
        deletePost(post.id)
      }
    }),
    [post.id, liked]
  )

  const handleClick = useCallback((action: 'like' | 'delete') => (e: any) => {
    e.stopPropagation()
    postActions[action]()
  }, [postActions, liked])

  return (
    <div
      className={`flex flex-col p-3 ${
        !postPage && 'cursor-pointer border-b border-gray-700'
      }`}
      onClick={() => !postPage && navigate(post.id)}
    >
      <div className="flex space-x-3 px-2 pt-2">
        <Image
          className="h-10 w-10 rounded-full"
          src={post.userImg}
          alt="user avatar"
          height={40}
          width={40}
        />
        <div className="flex w-full items-center">
          <span className="mr-3 font-bold">{post.username}</span>
          <span className="mr-3 opacity-60">@{post.tag}</span>
          <span className="mr-3 opacity-60">
            {getTimeForPost(post.timestamp)}
          </span>
          <span className="icon ml-auto flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-[#6e767d]" />
          </span>
        </div>
      </div>
      <div className="flex flex-col pl-16">
        <span>{post.text}</span>
        {post.image && (
          <div className="image-container">
            <Image
              src={post.image}
              alt={post.id}
              layout="fill"
              className="image"
            />
          </div>
        )}
      </div>

      <div className="mx-auto flex w-10/12 justify-between text-[#6e767d]">
        <div className="group flex cursor-pointer items-center space-x-1">
          <div className="icon h-14 w-14 group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
            <ChatIcon className="w-7 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        <div className="group flex cursor-pointer items-center space-x-1" onClick={handleClick('delete')}>
          <div className="icon h-14 w-14 group-hover:bg-red-600/10">
            <TrashIcon className="w-7 group-hover:text-red-600" />
          </div>
        </div>
        <div className="group flex cursor-pointer items-center space-x-1" onClick={handleClick('like')}>
          <div className="icon h-14 w-14 group-hover:bg-pink-600/10">
          {liked ? (
                <HeartIconFilled className="w-7 text-pink-600 group-hover:text-pink-600/90" />
              ) : (
                <HeartIcon className="w-7 group-hover:text-pink-600" />
              )}
          </div>
          {
            likesCount && (<span>
              {likesCount}
            </span>)
          }
        </div>
        <div className="group flex cursor-pointer items-center space-x-1">
          <div className="icon h-14 w-14 group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
            <ShareIcon className="w-7 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
