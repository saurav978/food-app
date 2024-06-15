export type MealType = {
  id?: string;
  title: string;
  slug?: string;
  image: string | File;
  summary: string;
  creator: string;
  creator_email: string;
  instructions: string;
};
