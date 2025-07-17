import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const GetTodaysMealPlan = query({
  args: {
    uid: v.id("Users"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const mealPlans = await ctx.db
      .query("mealPlan")
      .filter((q) =>
        q.and(q.eq(q.field("uid"), args.uid))
      )
      .collect();

    const results = await Promise.all(
      mealPlans.map(async (mealPlan) => {
        const recipe = await ctx.db.get(mealPlan.recipeId);
        return {
          mealPlan,
          recipe,
        };
      })
    );
    return results;
  },
});

export const updateStatus=mutation({
    args:{
        id:v.id('mealPlan'),
        status:v.optional(v.boolean())
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.patch(args.id,{
            status:args.status
        })
    }
})
