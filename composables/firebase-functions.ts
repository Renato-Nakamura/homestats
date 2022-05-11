import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

const loginPopUp = () => {
  console.log("teste 3");
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("firebase login result", { result }, { token });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("deu ruim login", error);
    });
};

const verifyLogin = async () => {
  const auth = getAuth();
  let user = await new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user, "logado");
        resolve(user);
      } else {
        resolve(undefined);
      }
    });
  });
  console.log(user)
  return user;
};

const getFirebaseIdToken = async () => {
  const auth = getAuth();
  let token = await auth.currentUser.getIdToken(true).then((idToken) => {
    return idToken;
  });
  return token;
};

export { loginPopUp, getFirebaseIdToken, verifyLogin };
