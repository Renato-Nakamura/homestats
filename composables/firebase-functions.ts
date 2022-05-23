import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  FieldPath,
  limit
} from "firebase/firestore";

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

const addGroup = async (groupName: string, invited: string[] = []) => {
  const { $auth, $db } = useNuxtApp();
  const uid = await getUserUid();
  const name = await $auth.currentUser.displayName;
  const groupExists = (await getGroup(groupName, uid)).exists();
  console.log("aaa", groupExists, uid, name);
  if (groupExists) return false;
  let res = await setDoc(doc($db, "groups", groupName + "_" + uid), {
    name: groupName,
    members: [uid],
    invited: invited,
    created: { date: new Date(), name: name, uid: uid },
    lastChangeBy: { date: new Date(), name: name, uid: uid },
  });
  //o convidado é mandado para o back enviar notificaçao e depois altera
  return res;
};

const getGroup = async (groupName, uid) => {
  const { $db } = useNuxtApp();
  const group = await getDoc(doc($db, "groups", groupName + "_" + uid));
  return group;
};

const getGroupsByUid = async (uid?: string) => {
  console.log('entrou')
  const { $db } = useNuxtApp();
  if (!uid) uid = await getUserUid();
  console.log({uid})

  const groups = collection($db, "groups");
  const q = query(groups, where("members", "array-contains", uid));
  const groupsByUid = await getDocs(q)
  return groupsByUid.docs
};

const getRecentJsonData = async (group)=> {
  
  const { $db } = useNuxtApp();
  const col = collection($db, group);
  const q = query(col, orderBy('timestamp','desc'),limit(1));
  let jsonData:any =  await getDocs(q)
  // if(jsonData.docs.length) jsonData=jsonData.docs[0].data()
  return jsonData
}

export {
  loginPopUp,
  getFirebaseIdToken,
  verifyLogin,
  addGroup,
  getUserUid,
  getGroupsByUid,
  getRecentJsonData
};
