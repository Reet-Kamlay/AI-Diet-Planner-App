import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Colors from '../shared/Colors';

export default function RecipeIngredients({recipeDetail}) {
    const ingrdients=(recipeDetail?.jsonData)?.ingredients;
    console.log(ingrdients)
  return (
    <View style={{
        marginTop:15
    }}><View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    }}>
      <Text style={{
        fontSize:20,
        fontWeight:'bold'
      }}>Ingredients</Text>
      <Text style={{
        fontSize:20
      }}>{ingrdients?.length}</Text>
      </View>
      <FlatList data={ingrdients}
        renderItem={({item,index})=>{
            return(
            <View style={{
                marginTop:10,
                display:'flex',
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center'
            }}>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    gap:5

                }}>
                    <Text style={{
                        padding:7,
                        fontSize:23,
                        backgroundColor:Colors.SECONDARY,
                        borderRadius:99
                    }}>{item?.icon}</Text>
                    <Text style={{
                        fontSize:17,
                        fontWeight:'600'
                    }}>{item?.ingredients}</Text>
                </View>
                <Text style={
                    {
                        color:Colors.GRAY,
                        fontSize:16
                    }
                }>
                    {item?.quantity}
                </Text>
            </View>
            )
      }}>

      </FlatList>
    </View>
  )
}