import { useRouter } from 'next/router'
import Post from '../components/Post'
import { useBufferedData } from '../hooks/useBufferedData'
import { Post as PostType } from '../types/Post'

const PostPage = () => {
  const router = useRouter()
  const { postId } = router.query
  const { data: post } = useBufferedData<PostType>(`/api/post/${postId}`)

  if (!post) {
    return <div className="main">Loading post...</div>
  }

  return (
    <div className="main">
      <Post post={post} postPage />
    </div>
  )
}

export default PostPage
