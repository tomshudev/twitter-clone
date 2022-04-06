import { SparklesIcon } from '@heroicons/react/outline'
import Input from './Input'
import Posts from './Posts'

const Feed = () => {
  return (
    <div className="main">
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-700 bg-black py-2 px-3 text-[#d9d9d9]">
        <h2 className="text-lg font-bold sm:text-xl">Home</h2>
          <div className="hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0">
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>

      <Input />

      <div className="pb-20 text-white">
        <Posts />
      </div>
    </div>
  )
}

export default Feed
