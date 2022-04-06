import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebase'

export default function handler(req: any, res: any) {
  const { pid } = req.query
  onSnapshot(doc(db, 'posts', pid), (snapshot) => {
    res.status(200).json({
      ...snapshot.data(),
      id: pid
    })
  })
}
