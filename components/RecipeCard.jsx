import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { HugeiconsIcon } from "@hugeicons/react-native";
import { Clock01FreeIcons, Fire02Icon } from "@hugeicons/core-free-icons";
import Colors from "../shared/Colors";
import { Link } from "expo-router";
import { Image } from "expo-image";

export default function RecipeCard({ recipe }) {
  const recipeJson = recipe?.jsonData;
  return (
    <Link href={'/recipe-detail?recipeId='+recipe?._id} style={{
        flex: 1,
        margin: 5,
      }}>
    <View>
      <Image
        source={{ uri: recipe?.imageUrl }}
        style={{
          width: "100%",
          height: 100,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
        <View style={{
          padding: 10,
          backgroundColor: Colors.WHITE,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
            }}
          >
            {recipe?.recipeName}
          </Text>
          <View style={[styles.infoContainer,{marginTop:6}]}>
            <View style={styles.infoContainer}>
              <HugeiconsIcon icon={Fire02Icon} color={Colors.RED} size={18}/>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.GRAY,
                }}
              >
                {recipeJson?.calories} kcal
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <HugeiconsIcon icon={Clock01FreeIcons} color={Colors.RED} size={18}/>
              <Text
                style={{
                  fontSize: 14,
                  color: Colors.GRAY,
                }}
              >
                {recipeJson?.cookTime} Min
              </Text>
            </View>
          </View>
        </View>
      </View>
      </Link>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    
    alignItems: "center",
  },
});
