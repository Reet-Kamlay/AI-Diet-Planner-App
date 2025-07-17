import { View, Text, Platform, FlatList } from 'react-native'
import React, { useRef } from 'react'
import RecipeIntro from '../../components/RecipeIntro'
import { useLocalSearchParams } from 'expo-router'
import { useQuery } from 'convex/react'
import { api } from '../../convex/_generated/api'
import Colors from '../../shared/Colors'
import RecipeIngredients from '../../components/RecipeIngredients'
import RecipeSteps from '../../components/RecipeSteps'
import Button from '../../components/shared/Button'
import ActionSheet from 'react-native-actions-sheet'
import AddToMealActionSheet from '../../components/AddToMealActionSheet'

export default function RecipeDetail() {
  const { recipeId } = useLocalSearchParams()
  const actionSheetRef = useRef(null)

  const recipeDetail = useQuery(api.Recipes.GetRecipeById, {
    id: recipeId || 'j97asgvpemgye57djhcpc3978h7kv6mh',
  })

  if (!recipeDetail) {
    return (
      <View style={{ padding: 20, paddingTop: Platform.OS === 'ios' ? 40 : 30 }}>
        <Text>Loading recipe...</Text>
      </View>
    )
  }

  return (
    <>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <View
            style={{
              padding: 20,
              paddingTop: Platform.OS === 'ios' ? 40 : 30,
              backgroundColor: Colors.WHITE,
              minHeight: '100%',
            }}
          >
            <RecipeIntro recipeDetail={recipeDetail} />
            <RecipeIngredients recipeDetail={recipeDetail} />
            <RecipeSteps recipeDetail={recipeDetail} />

            <View style={{ marginTop: 15 }}>
              <Button title={'Add to Meal Plan'} onPress={() => actionSheetRef.current?.show()} />
            </View>
          </View>
        }
      />

      <ActionSheet ref={actionSheetRef}>
        <AddToMealActionSheet
          recipeDetail={recipeDetail}
          hideActionSheet={() => actionSheetRef.current?.hide()}
        />
      </ActionSheet>
    </>
  )
}
