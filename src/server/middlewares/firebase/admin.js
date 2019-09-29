import * as admin from 'firebase-admin';
import config from '@/config/firebase-admin-credentials.json'

admin.initializeApp({ credential: admin.credential.cert(config) })

export default admin

