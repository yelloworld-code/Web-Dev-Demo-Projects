import sql from "better-sqlite3";
import slugify from "slugify";  // A library for converting strings into URL-friendly slugs by replacing spaces and special characters with hyphens and converting the text to lowercase, making it suitable for use in URLs (e.g., "Spaghetti Bolognese" becomes "spaghetti-bolognese")
import xss from "xss";   // A library for sanitizing user input to prevent Cross-Site Scripting (XSS) attacks by removing potentially harmful HTML or JavaScript code from the input
import fs from "node:fs"; // Node.js built-in module for file system operations, used to save uploaded images to the server's file system

const db = sql("meals.db"); // This will create the database file if it doesn't exist

export async function getMeals() {
	await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay of 2 seconds to mimic a real database query
	return db.prepare("SELECT * FROM meals").all();
	//.all() returns an array of all rows in the meals table
	//.get() would return only the first row, and .run() is used for insert/update/delete operations
	//.run() returns an object with information about the operation, but not the data itself
}

export function getMeal(slug) {
	return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
	meal.slug = slugify(meal.title, { lower: true }); // Convert the meal title into a URL-friendly slug (e.g., "Spaghetti Bolognese" becomes "spaghetti-bolognese")
	meal.instructions = xss(meal.instructions); // Sanitize the instructions to prevent XSS attacks by removing any potentially harmful HTML or JavaScript code


	const extension = meal.image.name.split(".").pop();  // Extract the file extension from the original image file name (e.g., "jpg", "png") by splitting the name at the dot and taking the last part
	const fileName = `${meal.slug}.${extension}`;   // Generate a unique file name for the image by combining the meal slug and the original file extension (e.g., "spaghetti-bolognese.jpg")

	const stream = fs.createWriteStream(`public/images/${fileName}`); // Create a writable stream to save the image file in the public/images directory with the generated file name
	const bufferedImage = await meal.image.arrayBuffer();   // Read the image file as an ArrayBuffer, which is a binary representation of the file's data, allowing it to be written to the file system

	stream.write(Buffer.from(bufferedImage), (error) => { 
		if (error) {
			throw new Error("Saving image failed!");
		}
	});   // Write the image data to the file system using the writable stream. If there's an error during the write operation, an error is thrown with a message indicating that saving the image failed.

	meal.image = `/images/${fileName}`; // Update the meal object to store the path to the saved image, which can be used later to display the image in the application (e.g., "/images/spaghetti-bolognese.jpg")

	db.prepare(
		`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `,
	).run(meal);
}