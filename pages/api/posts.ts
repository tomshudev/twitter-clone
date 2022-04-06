import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase'

export default function handler(_: any, res: any) {
  onSnapshot(
    query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
    (snapshot) => {
      res.status(200).json(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        })
      )
    }
  )
}
