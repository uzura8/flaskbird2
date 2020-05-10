import firebase from 'firebase/app'
import 'firebase/app';
import 'firebase/auth'
import firebasecConfig from '@/config/firebase_config'

export default {
  init() {
    firebase.initializeApp(firebasecConfig)
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  },
}
