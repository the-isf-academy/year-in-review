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
      console.log("Document written");
  })
  .catch(function(error) {
      console.error("Error adding document", error);
  });
}
export function storeFormInput(state){
  db.collection("users").doc(USERNAME).collection("reflections").doc("June2020").set(state)
  .then(function(docRef) {
      alert("Submitted! Feel free to Resubmit.");
  })
  .catch(function(error) {
      console.error("Error adding document", error);
  });
}

export function getPreviousFormInput(req, res){
    var docRef = db.collection("users").doc(USERNAME).collection(req.collection).doc(req.doc);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            res.fields = doc.data();
        } else {
            console.log("No such document exists for this user");
        }
    }).catch(function(error) {
        console.log("Error getting document: ", error);
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
