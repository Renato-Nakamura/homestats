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
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  FieldPath,
  limit,
} from "firebase/firestore";

import { getToken } from "firebase/messaging";

const loginPopUp = async (group?) => {
  const { $auth } = useNuxtApp();
  let logged = await verifyLogin();
  // const auth = getAuth();
  const provider = new GoogleAuthProvider();

  if (logged) {
    if (group) {
      const email = await getUserEmail();
      const res = await enterGroup(group, email)
        .then(() => {
          navigateTo("/home");
        })
        .catch((err) => err);
      return res;
    }
    navigateTo("/home");
    return;
  }
  const res = await signInWithPopup($auth, provider)
    .then(async (result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      if (group) {
        const email = await getUserEmail();
        const res = await enterGroup(group, email)
          .then(() => {
            navigateTo("/home");
          })
          .catch((err) => err);
        return res;
      }
      navigateTo("/home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log("deu ruim login", error);
    });
  return res;
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
  return user;
};

const getFirebaseIdToken = async () => {
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

const getUserEmail = async () => {
  // const auth = getAuth();
  const { $auth } = useNuxtApp();
  let email = $auth.currentUser.email;
  return email;
};

const addGroup = async (groupName: string, invited: string[] = []) => {
  const { $auth, $db } = useNuxtApp();
  const uid = await getUserUid();
  const name = await $auth.currentUser.displayName;
  const groupExists = (await getGroup(groupName, uid)).exists();
  if (groupExists) return false;
  let res = await setDoc(doc($db, "groups", groupName + "_" + uid), {
    name: groupName,
    members: [uid],
    invited: invited,
    created: { date: new Date(), name: name, uid: uid },
    lastChangeBy: { date: new Date(), name: name, uid: uid },
  });
  //o convidado é mandado para o back enviar notificaçao e depois altera
  return groupName + "_" + uid;
};

const getGroup = async (groupName, uid) => {
  const { $db } = useNuxtApp();
  const group = await getDoc(doc($db, "groups", groupName + "_" + uid));
  return group;
};

const getGroupsByUid = async (uid?: string) => {
  console.log("entrou");
  const { $db } = useNuxtApp();
  if (!uid) uid = await getUserUid();
  console.log({ uid });

  const groups = collection($db, "groups");
  const q = query(groups, where("members", "array-contains", uid));
  const groupsByUid = await getDocs(q);
  return groupsByUid.docs;
};

const getRecentJsonData = async (group) => {
  const { $db } = useNuxtApp();
  const col = collection($db, group);
  const q = query(col, orderBy("timestamp", "desc"), limit(1));
  let jsonData: any = await getDocs(q);
  // if(jsonData.docs.length) jsonData=jsonData.docs[0].data()
  return jsonData;
};

const getTokenFCM = () => {
  const { $messaging } = useNuxtApp();
  getToken($messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY.toString() })
    .then((token) => {
      console.log("token", token);
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
};

const enterGroup = async (group, email) => {
  console.log(group, email);
  const { $db } = useNuxtApp();
  const docInfo = doc($db, "groups", group);
  const document = await getDoc(docInfo);
  console.log("Renatoo", document.data());
  if (!document.exists()) {
    throw "documento não exite";
  }
  const invited:string[] = document.data().invited

  if (invited.length == 0) {
    throw "voce n foi convidado";
  }
  if(invited.includes(email)){
    const members:string[] = document.data().members
    const index = invited.indexOf(email)
    const uid = await getUserUid()
    if(!uid) throw "tente novamente"
    members.push(uid)
    updateDoc(docInfo,{
      invited: invited.splice(1,index),
      members: members,
      lastChangeBy: { date: new Date(), name: email, uid: uid },
    })
  }
};

export {
  loginPopUp,
  getFirebaseIdToken,
  verifyLogin,
  addGroup,
  getUserUid,
  getGroupsByUid,
  getRecentJsonData,
  getTokenFCM,
};
