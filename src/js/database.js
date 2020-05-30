const firebase = require("firebase");
require("firebase/firestore");
var db = firebase.firestore();


export function storeUser(res){
  db.collection("users").doc(res.data.login).set({
      name: res.data.name,
      github_URL: res.data.url,
  })
  .then(function(docRef) {
      console.log("Document written");
  })
  .catch(function(error) {
      console.error("Error adding document", error);
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
