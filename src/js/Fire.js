const firebase = require('firebase/app');
require('firebase/firestore');

var config = require('../server/firebase_config.js');

class Fire {
  constructor() {
    this.username = "";
    console.log(firebase.apps.length)
		if (!firebase.apps.length) {
			firebase.initializeApp({
        apiKey: "AIzaSyDbnMja9tFjlu0oNyEYbWlanQFs7yGm0IE",
        authDomain: "year-in-review-89e1b.firebaseapp.com",
        databaseURL: "https://year-in-review-89e1b.firebaseio.com",
        projectId: "year-in-review-89e1b",
        storageBucket: "year-in-review-89e1b.appspot.com",
        messagingSenderId: "1090132386714",
        appId: "1:1090132386714:web:2e365ed2bfcca7b4749023",
        measurementId: "G-YZHN2ESS4R"
      });
		}
    this.db = firebase.firestore();
	}

  storeUser(res) {
    this.username = res.data.login;
    this.db.collection("users").doc(res.data.login).set({
        name: res.data.name,
        github_URL: res.data.url,
    })
    .then(function(docRef) {
        console.log("User written");
    })
    .catch(function(error) {
        console.error("Error adding document", error);
    });
  };
  storeFormInput(state, collectionname, docname, isSubmit){
    var docRef = this.db.collection("users").doc(this.username).collection(collectionname).doc(docname)
    docRef.set(state)
    .then(function(docRef) {
        if (isSubmit) alert("Submitted! Feel free to Resubmit.");
    })
    .catch(function(error) {
        console.error("Error adding document", error);
    });
  }

  getPreviousFormInput(callback_withform, collection, doc){
    console.log("getting Previous Form Input");
    var docRef = this.db.collection("users").doc(this.username).collection(collection).doc(doc);
    docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Previous Form Input exists");
          callback_withform(doc.data())
      } else {
          // doc.data() will be undefined in this case
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  display(username){
    var docRef = this.db.collection("users").doc(username);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data().name);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

  }
}

const singleton = new Fire();
export default singleton;
