'use server';

import { saveMeal } from "./meals";
import { redirect } from "next/navigation"; // A function from Next.js that allows you to programmatically redirect the user to a different page after an action is completed (e.g., after sharing a meal, the user is redirected to the meals listing page)

export async function shareMeal(formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  await saveMeal(meal);
  redirect("/meals");
}
