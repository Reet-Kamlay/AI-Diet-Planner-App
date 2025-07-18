import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import {UserContext} from './../../context/UserContext'
import { useRouter } from 'expo-router';
import HomeHeader from '../../components/HomeHeader';
import TodayProgress from '../../components/TodayProgress';
import GenerateRecipeCard from '../../components/GenerateRecipeCard';
import TodaysMealPlan from '../../components/TodaysMealPlan';
import { FlatList } from 'react-native-actions-sheet';
export default function Home() {
    const {user}=useContext(UserContext)
    const router=useRouter();
    useEffect(()=>{
        if(!user?.weight){
            router.replace('/preferance')
        }
    })
  return (
    <FlatList
    data={[]}
    renderItem={()=>null}
    ListHeaderComponent={
    <View style={{
      padding:20
    }}>
      <HomeHeader/>
      <TodayProgress/>
      <GenerateRecipeCard/>
      <TodaysMealPlan/>
    </View>}
    ></FlatList>
  )
}