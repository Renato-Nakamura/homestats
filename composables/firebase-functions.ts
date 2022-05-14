import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { getgroups } from "process";

const loginPopUp = async () => {
  const { $auth } = useNuxtApp();
  let logged = await verifyLogin();
  // const auth = getAuth();
  const provider = new GoogleAuthProvider();
  if (logged) {
    navigateTo("/home");
    return;
  }
  signInWithPopup($auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log("firebase login result", { result }, { token });
      navigateTo("/home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("deu ruim login", error);
    });
};

const verifyLogin = async () => {
  // const auth = getAuth();
  const { $auth } = useNuxtApp();
  let user = await new Promise((resolve, reject) => {
    onAuthStateChanged($auth, (user) => {
      if (user) {
        console.log(user, "logado");
        resolve(user);
      } else {
        resolve(undefined);
      }
    });
  });
  console.log(user);
  return user;
};

const getFirebaseIdToken = async () => {
  // const auth = getAuth();
  const { $auth } = useNuxtApp();
  let token = await $auth.currentUser.getIdToken(true).then((idToken) => {
    return idToken;
  });
  return token;
};

const getUserUid = async () => {
  const { $auth } = useNuxtApp();
  let uid = $auth.currentUser.uid;
  return uid;
};

const addGroup = async (groupName: string, uid: string, uidUsers: string[]) => {
  const { $db } = useNuxtApp();
  const groupExists = getGroup(groupName,uid)
  if(groupExists) return false
  await setDoc(doc($db, "groups", groupName + "_" + uid), {
    name: groupName,
    pessoas: uidUsers,
    created: new Date(),
  });
};

const getGroup = async (groupName, uid) => {
  const { $db } = useNuxtApp();
  const group = await getDoc(doc($db, "groups", groupName + "_" + uid));
  return group;
};

// const getUidByEmail = async (email: string) => {
//   // const { $auth } = useNuxtApp();
//   const auth = getAuth();
//   const res =  auth
//   console.log(res);
//   // let uid = res.
// };

export { loginPopUp, getFirebaseIdToken, verifyLogin, addGroup, getUserUid };
