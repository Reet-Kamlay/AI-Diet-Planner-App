// aimodel.jsx

import axios from "axios";

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;
const GROQ_MODEL = "llama3-8b-8192"; // or "llama3-70b-8192"

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// ⏱️ Calculate Calories
export const CalculateCaloriesAI = async (PROMPT) => {
  const res = await axios.post(
    GROQ_API_URL,
    {
      model: GROQ_MODEL,
      messages: [{ role: "user", content: PROMPT }],
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

// 🍲 Generate Recipe
export const GenerateAIRecipe = async (PROMPT) => {
  const res = await axios.post(
    GROQ_API_URL,
    {
      model: GROQ_MODEL,
      messages: [{ role: "user", content: PROMPT }],
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
};

// 🖼️ Recipe Image Generation (unchanged)
const BASE_URL = "https://aigurulab.tech";
export const GenerateRecipeImage = async (prompt) =>
  await axios.post(
    BASE_URL + "/api/generate-image",
    {
      width: 1024,
      height: 1024,
      input: prompt,
      model: "sdxl", // or "flux"
      aspectRatio: "1:1", // only for flux
    },
    {
      headers: {
        "x-api-key": process.env.EXPO_PUBLIC_AIRGURU_LAB_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
