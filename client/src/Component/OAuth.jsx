import { Button } from 'flowbite-react';
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {signInSuccess} from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
    const handleGoogleClick = async()=>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({prompt :'select_account'})
        
        try{
            const resultsFromGoogle = await signInWithPopup(auth ,provider);
            console.log(resultsFromGoogle);

            const res= await fetch('http://localhost:8000/api/auth/google',{
                method:"POST",
                headers:{'content-type':'application/json'},
                body: JSON.stringify({
                    name:resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    gooolePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            })
            const data = await res.json()
            if(res.ok){
                dispatch(signInSuccess(data))
                console.log("the success dispatch the data that is",data)
                 navigate('/')
            }
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div>
      <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle/> 
        Continue with Google
        </Button>
    </div>
  )
}

export default OAuth;
