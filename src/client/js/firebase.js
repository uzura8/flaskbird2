import firebase from 'firebase/app'
import 'firebase/app';
import 'firebase/auth'
import config from '@/config/config'

const firebasecConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  //messagingSenderId: config.firebase.messagingSenderId,
}

export default {
  init() {
    firebase.initializeApp(firebasecConfig)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  },
}
