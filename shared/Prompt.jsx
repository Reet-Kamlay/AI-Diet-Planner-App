export default{
    CALORIES_PROMPT: `You are a health assistant AI.

Your task:
Given weight, height, gender, and goal, return a JSON object with estimated daily calories and proteins. Assume age is 28. 

Strictly respond with **only valid JSON** — no explanation, no headings, no backticks.

Schema:
{
  "calories": number,
  "proteins": number
}
Do not include any markdown or comments.`,
    GENERATE_RECIPE_OPTION_PROMPT:`:Depends on user instruction create 3 different Receipe variant with Recipe Name with Emoji,
    2 line description and main ingredient list in JSON format with field recipeName,description,ingredients (without size) only, Do not give me text response`,
    GENERATE_COMPLETE_RECIPE_PROMPT:`
    - As per recipeName and description give me recipeName and description as field, Give me all list of ingredients as ingredient,
    - emoji icons for each ingedient as icon, quantity as quantity, along with detail step by step recipe as steps,
    - Total calories as calories (only number), Minutes to cook as cookTime and serving number as serveTo
    - realastic image Text prompt as per recipe as imagePrompt
    - Give me a category List for recipe from [Breakfast,Lunch,salad,Dessert,Fastfood,Drink,Cake] as category
    - Give me response in JSON format only
    - Schema format should be:
    {
    "description": "string",
    "recipeName": "string",
    "calories":  "number",
    "category": ["string"],
    "cookTime":"number",
    "imagePrompt":"string",
    "ingredients":[
        {
            "icon":"string",
            "ingredients":"string",
            "quantity":"string"
        }
        ],
        "serveTo":"number",
        "steps":["string"]    
    
    
    }
    `
}