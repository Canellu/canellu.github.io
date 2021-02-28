var firebaseConfig = {
  apiKey: "AIzaSyC_zBlRHNDDs0Q7oZAxpv3TbCRNup1ziSA",
  authDomain: "lunaludo-52758.firebaseapp.com",
  projectId: "lunaludo-52758",
  storageBucket: "lunaludo-52758.appspot.com",
  messagingSenderId: "743418716187",
  appId: "1:743418716187:web:f05948ef323acf8baa18be",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

//funksjon til å opprette dokument og legge til melding i firestore
function addMessages() {
  var navn = document.querySelector(".navnBoks");
  var email = document.querySelector(".emailBoks");
  var tekst = document.querySelector(".tekstBoks");

  db.collection("Messages")
    .add({
      name: navn.value ?? "",
      email: email.value ?? "",
      msg: tekst.value,
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });

  // document.querySelector("#toFirestoreForm").reset();
}
