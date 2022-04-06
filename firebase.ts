import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export const firebaseConfig = {
  apiKey: 'AIzaSyCN5YwXuKukBOuuze0fIAr7yK11EDfbrsY',
  authDomain: 'twitter-clone-63559.firebaseapp.com',
  projectId: 'twitter-clone-63559',
  storageBucket: 'twitter-clone-63559.appspot.com',
  messagingSenderId: '290612917267',
  appId: '1:290612917267:web:b64c1518ba8b7b81b03be6',
}

// Initialize firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export default app
export { db, storage }
