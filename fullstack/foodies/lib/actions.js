"use server";

import { redirect } from "next/navigation";

import { saveMeal } from "./meals";

// Helper function to validate text input
function isInvalidText(text) {
	return !text || text.trim() === "";
}


// Server action to handle meal sharing form submission
export async function shareMeal(prevState, formData) { //prevState is the state passed from the client, formData is the data from the form submission
	const meal = {
		title: formData.get("title"),
		summary: formData.get("summary"),
		instructions: formData.get("instructions"),
		image: formData.get("image"),
		creator: formData.get("name"),
		creator_email: formData.get("email"),
	};

	// Basic validation
	if (
		isInvalidText(meal.title) ||
		isInvalidText(meal.summary) ||
		isInvalidText(meal.instructions) ||
		isInvalidText(meal.creator) ||
		isInvalidText(meal.creator_email) ||
		!meal.creator_email.includes("@") ||
		!meal.image ||
		meal.image.size === 0
	) {
		return {
			message: "Invalid input. Please fill in all fields correctly.",
		};
	}

	// Save meal to "database"
	await saveMeal(meal);
	redirect("/meals");
}
