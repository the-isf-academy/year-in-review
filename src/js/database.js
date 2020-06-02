const firebase = require("firebase");
require("firebase/firestore");
var db = firebase.firestore();
var USERNAME = "";

export function storeUser(res){
  USERNAME = res.data.login;
  db.collection("users").doc(res.data.login).set({
      name: res.data.name,
      github_URL: res.data.url,
  })
  .then(function(docRef) {
      console.log("User written");
  })
  .catch(function(error) {
      console.error("Error adding document", error);
  });
}
export function storeFormInput(state, collectionname, docname){
  var docRef = db.collection("users").doc(USERNAME).collection(collectionname).doc(docname).set(state)
  docRef.then(function(docRef) {
      alert("Submitted! Feel free to Resubmit.");
  })
  .catch(function(error) {
      console.error("Error adding document", error);
  });
}

export function getPreviousFormInput(callback_withform, collection, doc){
  console.log("getting Previous Form Input");
  var docRef = db.collection("users").doc(USERNAME).collection(collection).doc(doc);
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

export function display(username){
  var docRef = db.collection("users").doc(username);
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
