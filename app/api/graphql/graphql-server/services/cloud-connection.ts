import admin from 'firebase-admin'

const projectId = process.env.FIREBASE_PROJECT_ID
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

if (!projectId || !clientEmail || !privateKey) {
  throw new Error('Firebase credentials are not set in the environment variables.')
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey
    })
  })
}

export const db = admin.firestore()

export type DB = admin.firestore.Firestore

export type Doc = Omit<
  admin.firestore.QueryDocumentSnapshot<admin.firestore.DocumentData, admin.firestore.DocumentData>,
  'createTime' | 'updateTime'
>

export type DocRef = admin.firestore.DocumentReference

export type InputData = FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData>

export type WriteResult = FirebaseFirestore.WriteResult
