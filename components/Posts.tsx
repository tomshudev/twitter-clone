import { useEffect } from 'react'
import useSWR from 'swr'
import { useBufferedData } from '../hooks/useBufferedData'
import { Post as PostType } from '../types/Post'
import Post from './Post'

const Posts = () => {
  const {
    data: posts,
    stale,
    update,
  } = useBufferedData<PostType[]>('/api/posts')

  return (
    <div className="relative">
      {stale && (
        <div className="absolute inset-x-0 top-3 z-10 flex justify-center">
          <button
            onClick={update}
            className="flex items-center rounded-full bg-blue-500 px-4 py-1 text-white shadow-lg focus:outline-none"
          >
            See new tweets
          </button>
        </div>
      )}
      {!posts ? (
        <div>Loading posts...</div>
      ) : (
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  )
}

export default Posts
