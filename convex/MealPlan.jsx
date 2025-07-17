import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateMealPlan = mutation({
  args: {
    recipeId: v.id("recipes"),
    date: v.string(),
    mealType: v.string(),
    uid: v.id("Users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("mealPlan", {
      recipeId: args.recipeId,
      date: args.date,
      mealType: args.mealType,
      uid: args.uid,
    });
    return result;
  },
});

// export const GetTodaysMealPlan=query({
//     args:{
//         uid:v.id('Users'),
//         date:v.string()
//     },
//     handler:async(ctx,args)=>{
//         const mealPlan=await ctx.db.query('mealPlan')
//         .filter(q=>q.add(q.eq(q.field('uid'),args.uid)))

//     }
// })
