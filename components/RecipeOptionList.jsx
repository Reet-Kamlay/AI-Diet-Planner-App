import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import Prompt from "../shared/Prompt";
import { GenerateAIRecipe, GenerateRecipeImage } from "../services/AiModel";
import LoadingDialog from "./LoadingDialog";
import Colors from "../shared/Colors";
import { useMutation } from "convex/react";
import { api } from "./../convex/_generated/api";
import { UserContext } from "./../context/UserContext";
import { useRouter } from "expo-router";

export default function RecipeOptionList({ recipeOption }) {
  const [loading, setLoading] = useState();
  const CreateRecipe = useMutation(api.Recipes.CreateRecipe);
  const { user } = useContext(UserContext);
  const router=useRouter()
  const onRecipeoptionSelect = async (recipe) => {
    setLoading(true);

    const PROMPT = `
Recipe Name: ${recipe?.recipeName}
Description: ${recipe?.description}
${Prompt.GENERATE_COMPLETE_RECIPE_PROMPT}
Only return valid JSON. No markdown or explanation.
    `;

    try {
      // 🧠 Step 1: AI Recipe from Groq
      const result = await GenerateAIRecipe(PROMPT);
      const rawContent = result?.choices?.[0]?.message?.content;
      console.log("🧠 AI raw content:", rawContent);

      // 🧠 Step 2: Extract JSON
      const match = rawContent?.match(/{[\s\S]*}/);
      if (!match) throw new Error("⚠️ No JSON found in AI response");

      const parsedJSONResp = JSON.parse(match[0]);
      console.log("✅ Parsed JSON:", parsedJSONResp);

      // ✅ Step 3: Validate essential fields
      const { recipeName, imagePrompt, steps } = parsedJSONResp;

      if (!recipeName || typeof recipeName !== "string") {
        throw new Error("❌ Missing or invalid recipeName");
      }

      if (!Array.isArray(steps) || steps.length === 0) {
        throw new Error("❌ Steps are missing or invalid");
      }

      if (!imagePrompt || typeof imagePrompt !== "string") {
        throw new Error("❌ imagePrompt missing or invalid");
      }

      // 🎨 Step 4: Generate Image
      const aiImageResp = await GenerateRecipeImage(imagePrompt);
      let imageUrl = aiImageResp?.data?.image;

      // 🛠️ Step 5: Fix Firebase image bucket if needed
      if (imageUrl?.includes("projectss-2025")) {
        imageUrl = imageUrl.replace("projectss-2025", "projects-2025");
        
      }
      if (imageUrl?.includes("ai-guru-laab-images")) {
        imageUrl = imageUrl.replace(
          "ai-guru-laab-images",
          "ai-guru-lab-images"
        );
        
      }
      console.log("🔧 Fixed image URL:", imageUrl);

      if (!imageUrl?.startsWith("http")) {
        throw new Error("❌ Image URL is invalid or missing");
      }

      // 🧾 Step 6: Save to Convex
      if (!user?._id) throw new Error("❌ User ID not found");

      const saveRecipeResult = await CreateRecipe({
        jsonData: parsedJSONResp,
        imageUrl,
        recipeName,
        uid: user._id,
      });

      console.log("✅ Saved to Convex:", saveRecipeResult);
      router.push({
        pathname:'/recipe-detail',
        recipeId:saveRecipeResult
      })
    } catch (e) {
      console.error("🔥 Error in onRecipeoptionSelect:", e.message || e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>RecipeOptionList</Text>
      <View>
        {recipeOption?.map((item, index) => (
          <TouchableOpacity
            onPress={() => onRecipeoptionSelect(item)}
            key={index}
            style={{
              padding: 15,
              borderWidth: 0.2,
              borderRadius: 15,
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item?.recipeName}
            </Text>
            <Text style={{ color: Colors.GRAY }}>{item?.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <LoadingDialog loading={loading} />
    </View>
  );
}
