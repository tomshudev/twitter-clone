import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const likePost = async (
  postId: string,
  user: { uid: string; name: string },
  liked: boolean
) => {
  if (liked) {
    await setDoc(doc(db, 'posts', postId, 'likes', user.uid), {
      username: user.name,
    })
  } else {
    await deleteDoc(doc(db, 'posts', postId, 'likes', user.uid))
  }
}
