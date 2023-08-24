import app from "firebase/app";
import { firebaseConfig } from "./constants";
import "firebase/auth"; 
import "firebase/database";
import { getUser, updateUser } from "./localstorage";

class Firebase {
  constructor() {
   if(app.apps.length === 0){
      app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.database()
    this.user = {}; 
  }
}
  login(e, p) {
    return new Promise((resolve, reject) => {
      this.auth
        .signInWithEmailAndPassword(e, p)
        .then(luser => {
            var userId = this.auth.currentUser.uid;
            var userRef = this.db.ref("users/" + userId)
                this.db.ref(userRef).once('value').then((snap)=>{
                       var  {user} = getUser();
                       user = snap.val() && snap.val().uid ? snap.val() : user;
                       user.uid = userId;
                       user.timestamp = Date.now();
                       updateUser(user);
                       resolve(user);
                });
        })
        .catch(e => reject(e));
    });
  }
  signOut() {
    const cfg = {
      user: {
          uid: "",
          snips: [],
          tags: [],
          createOn: "Today",
          onboard: false,
          pro: false
      }
  }
    updateUser(cfg);
    localStorage.clear();
    return this.auth.signOut();
  }

}

export default new Firebase();