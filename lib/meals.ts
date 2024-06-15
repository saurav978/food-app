import fs from "node:fs";
import { MealType } from "@/types/meal-types";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // throw new Error("Some error occurred");
  return db.prepare<MealType[], MealType>("SELECT * FROM meals").all();
}

export function getMeal(slug: string) {
  return db
    .prepare<any[], any>("SELECT * FROM meals where slug = ? ")
    .get(slug);
}

export async function saveMeal(meal: MealType) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);
  if (typeof meal.image === "string") {
    return;
  }
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  });
  meal.image = `/images/${fileName}`;

  db.prepare(
    `
    INSERT INTO meals
    (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (@title, @summary, @instructions,@creator, @creator_email, @image, @slug)
  `
  ).run(meal);
}
