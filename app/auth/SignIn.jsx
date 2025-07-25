import { View, Text, Image,  Alert } from 'react-native'
import React, { useContext, useState } from 'react'
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import { Link } from 'expo-router'
import { auth } from '../../services/FirebaseConfig'
import { useConvex } from 'convex/react'
import { UserContext } from '../../context/UserContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { api } from '../../convex/_generated/api'

export default function SignIn() {
    const [email,setEmail]=useState();
    const[password,setPassword]=useState();
    const convex=useConvex();
    const {user,setUser}=useContext(UserContext);
    const onSignIn=()=>{
        if(!email || !password){
            Alert.alert("Missing Fields!","Enter all field values")
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const userData=await convex.query(api.Users.GetUser,{
        email:email
    })
    console.log(userData);
    setUser(userData);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Alert.alert("Incorrect Email & Password","Please enter valid email and password")
  });
    }
  return (
    <View style={{display:"flex",
        alignItems:"center",
        padding:20
    }}>
       <Image source={require("../../assets/images/react-logo.png")}
       style={{
        width:150,
        height:150,
        marginTop:60
       }}/>
       <Text style={{fontSize:35,
        fontWeight:'bold'
       }}>Welcome Back</Text>
        <View style={{marginTop:20,
            width:"100%",
        }}><Input placeholder={"Email"} onChangeText={setEmail}/>
        <Input placeholder={"Password"} password={true} onChangeText={setPassword}/></View>
       <View style={{
        marginTop:15,
        width:"100%"
       }}>
        <Button title={'Sign In'} onPress={()=>onSignIn()}/>
            <Text style={{
                textAlign:"center",
                fontSize:16,
                marginTop:15
            }}> Don&apos;t have an account?</Text>
            <Link href={'/auth/SignUp'}><Text style={{
                textAlign:"center",
                fontSize:16,
                marginTop:5,
                fontWeight:"bold"
            }}>Create New Account</Text></Link>
       </View>
    </View>
  )
}