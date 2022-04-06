import { Timestamp } from "firebase/firestore"

export const getTimeForPost = (timestamp: {
    seconds: number
    nanoseconds: number
  }) => {
    const postsMilliseconds = new Timestamp(
      timestamp.seconds,
      timestamp.nanoseconds
    ).toMillis()
    const postDate = new Date(postsMilliseconds)
    const timeSincePost = (Date.now() - postsMilliseconds) / 1000
    let timeSinceString
  
    if (timeSincePost < 120) {
      timeSinceString = 'Few seconds ago'
    } else if (timeSincePost < 3600) {
      timeSinceString = `${Math.round(timeSincePost / 60)} minutes ago`
    } else if (timeSincePost < 64800) {
      timeSinceString = `${Math.round(timeSincePost / 60 / 60)} hours ago`
    } else {
      timeSinceString = `${postDate.getDate()}/${
        postDate.getMonth() + 1
      }/${postDate.getFullYear()}`
    }
  
    return timeSinceString
  }