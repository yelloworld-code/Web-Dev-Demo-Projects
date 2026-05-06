import sql from "better-sqlite3";

const db = sql("meals.db"); // This will create the database file if it doesn't exist

export async function getMeals() {
	await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay of 2 seconds to mimic a real database query
	return db.prepare("SELECT * FROM meals").all();
	//.all() returns an array of all rows in the meals table
	//.get() would return only the first row, and .run() is used for insert/update/delete operations
	//.run() returns an object with information about the operation, but not the data itself
}
