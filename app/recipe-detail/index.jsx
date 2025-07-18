import { View, Text, Platform, FlatList } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import RecipeIntro from '../../components/RecipeIntro';
import RecipeIngredients from '../../components/RecipeIngredients';
import RecipeSteps from '../../components/RecipeSteps';
import Button from '../../components/shared/Button';
import ActionSheet from 'react-native-actions-sheet';
import AddToMealActionSheet from '../../components/AddToMealActionSheet';
import Colors from '../../shared/Colors';

export default function RecipeDetail() {
  const actionSheetRef = useRef(null);
  const { recipeId } = useLocalSearchParams(); // works fine with `router.push({ pathname: '/recipe-detail', params: { recipeId: "xxx" } })`

  const [recipeIdState, setRecipeIdState] = useState(null);

  useEffect(() => {
    if (typeof recipeId === 'string') {
      setRecipeIdState(recipeId);
    }
  }, [recipeId]);

  const recipeDetail = useQuery(
    api.Recipes.GetRecipeById,
    recipeIdState ? { id: recipeIdState } : "skip"
  );

  // 🌀 Loading fallback
  if (!recipeIdState || !recipeDetail) {
    return (
      <View style={{ padding: 20, paddingTop: Platform.OS === 'ios' ? 40 : 30 }}>
        <Text>Loading recipe...</Text>
      </View>
    );
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
  );
}
