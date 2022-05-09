import { getAuth, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
export default function loginPopUp(){
    console.log('teste 3')
        
        const provider = new GoogleAuthProvider();
        const auth = getAuth()
        signInWithPopup(auth,provider).then((result)=>{
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            console.log('firebase login result',{result}, {token})
        }).catch((error)=>{
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log('deu ruim login',error )
        })
    
    }