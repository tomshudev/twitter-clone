import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'

export default function handler(req: any, res: any) {
  const { pid } = req.query
  onSnapshot(collection(db, 'posts', pid, 'likes'), (snapshot) => {
    const likes = snapshot.docs.length > 0 ? snapshot.docs.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr.data(),
      }),
      {}
    ) : {}
    res.status(200).json({
      likes,
    })
  })
}
