# 🧠🥗 AI Diet Planner App

An AI-powered mobile app built with **React Native**, **Expo**, and **Convex**, designed to help users plan healthy meals using personalized diet recommendations, recipe breakdowns, and real-time nutrition analysis.

> 📲 Built with React Native + Expo  
> ☁️ Backend powered by Convex & Firebase  
> 🤖 Uses AI to suggest meals, track ingredients, and generate diet plans

---

## 🚀 Features

- 🧠 AI-generated meal recommendations
- 📅 Meal planning & scheduling by day/time
- 🥘 Detailed recipe view with steps and ingredients
- 🍎 Nutrition breakdown (calories, protein, carbs, fats)
- ➕ Add recipes to your daily meal plan
- 🔍 Ingredient-based search
- 🔐 User authentication via Firebase
- 📦 Convex database integration for real-time sync
- 📱 Smooth mobile UI with React Native + Expo

---

## 🛠️ Tech Stack

- **Frontend:** React Native (with `expo-router`)
- **Backend:** Convex (Serverless Functions + Database)
- **Authentication:** Firebase Auth
- **APIs:** OpenRouter / OpenAI for AI meal planning
- **Dev Tools:** Tailwind (via NativeWind), HugeIcons, EAS Build, `.env` for secrets

---

## 📁 Folder Structure

```
app/
  (home)
  recipe/
  meal-plan/
  components/
  hooks/
  convex/
  lib/
  assets/
.env
app.config.js
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Reet-Kamlay/AI-Diet-Planner-App.git
cd AI-Diet-Planner-App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file with:

```env
EXPO_PUBLIC_CONVEX_URL=your_convex_url
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_key
EXPO_PUBLIC_OPENROUTER_API_KEY=your_openrouter_or_openai_key
EXPO_PUBLIC_AIRGURU_LAB_API=your_custom_api_if_used
```

> Make sure these are also added to `app.config.js` under `extra`.

### 4. Run the App

```bash
npx expo start
```

You can run it on your emulator or your physical device with the Expo Go app.

---

## 📸 Screenshots (optional)

_Add screenshots here once the UI is finalized._

---

## 📦 Deployment

This project is EAS-ready for build and deployment:

```bash
eas build --platform android
```

---

## 📌 TODO / Future Features

- 📝 Save meal history
- 💬 Chat-style AI interface
- 📊 Weekly nutrition summary
- 📷 Upload food images for calorie detection
- 🌐 Offline support

---

## 🙏 Acknowledgements

- [Convex](https://www.convex.dev/)
- [Firebase](https://firebase.google.com/)
- [OpenRouter](https://openrouter.ai/) / [OpenAI](https://openai.com/)
- [Expo](https://expo.dev/)
- [NativeWind](https://www.nativewind.dev/)

---

## 📜 License

MIT © 2025 [Reet Kamlay](https://github.com/Reet-Kamlay)
