import { View, Text, Platform, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AnalyticsUpIcon, CookBookIcon, Login03Icon, Purse01Icon, ServingFoodIcon } from '@hugeicons/core-free-icons'
import { Image } from 'expo-image'
import {UserContext} from './../../context/UserContext'
import Colors from './../../shared/Colors'
import { HugeiconsIcon } from '@hugeicons/react-native'
import { useRouter } from 'expo-router'
import { signOut } from 'firebase/auth'
import {auth } from './../../services/FirebaseConfig'
const MenuOptions=[
  {
    title:'My Progress',
    icon:AnalyticsUpIcon,
    path:'/(tabs)/Progress'
  },
  {
    title:'Explore Recipes',
    icon:CookBookIcon,
    path:'/(tabs)/Meals'
  },
  {
    title:'Ai Recipes',
    icon:ServingFoodIcon,
    path:'/generate-ai-recipe'
  },
  {
    title:'Biling',
    icon:Purse01Icon,
    path:'Biling'
  },
  {
    title:'Logout',
    icon:Login03Icon,
    path:'logout'
  }
]

export default function Profile(){
  const {user,setUser} = useContext(UserContext)
  const router=useRouter();
  const OnMenuOptionClick=(menu)=>{
    if(menu.path==='logout'){
      signOut(auth).then(()=>{
        console.log('SIGNOUT')
        setUser(null);
        router.replace('/')
      })
      return;
    }
    router.push(menu?.path)
  }
  return(
    <View style={
      {
        padding:20,
        paddingTop:Platform?.OS==='ios'?40:25
      }
    }>
      <Text style={{
        fontSize:25,
        fontWeight:'bold'
      }}>Profile</Text>
      <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:15
      }}>
      <Image source={require('./../../assets/images/react-logo.png')}
      style={{
      width:100,
      height:100,
      borderRadius:99
      }}/>
      <Text style={{
        fontSize:20,
        fontWeight:'bold',
        marginTop:5
      }}>{user?.name}</Text>
      <Text style={{
        fontSize:16,
        color:Colors.GRAY,
        marginTop:5
      }}>{user?.email}</Text>
      </View>

      <FlatList 
      data={MenuOptions}
      style={{
        marginTop:20
      }}
      renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>OnMenuOptionClick(item)}
        style={{
          display:'flex',
          flexDirection:'row',
          gap:6,
          alignItems:'center',
          padding:15,
          borderWidth:0.2,
          borderRadius:15,
          backgroundColor:Colors.WHITE,
          elevation:1
        }}>  
          <HugeiconsIcon icon={item.icon} size={35} color={Colors.PRIMARY}/>
          <Text style={{
            fontSize:20,
            fontWeight:'300'
          }}>{item.title}</Text>
        </TouchableOpacity>
  )}
  />
    </View>
  )
}