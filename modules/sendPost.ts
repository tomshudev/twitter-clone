import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../firebase'
import { TwitterSession } from '../pages/api/auth/[...nextauth]'
import {Post} from '../types/Post'

export const sendPost = async (
  textInput: string,
  imageUrl: string,
  session: TwitterSession
) => {
  const docRef = await addDoc(collection(db, 'posts'), {
    uid: session.user.uid,
    username: session.user.name,
    userImg: session.user.image,
    tag: session.user.tag,
    text: textInput,
    timestamp: serverTimestamp(),
  } as Post)

  if (imageUrl) {
    const imageRef = ref(storage, `posts/${docRef.id}/image`)
    await uploadString(imageRef, imageUrl, 'data_url')
    const downloadUrl = await getDownloadURL(imageRef)
    await updateDoc(docRef, { image: downloadUrl })
  }
}
