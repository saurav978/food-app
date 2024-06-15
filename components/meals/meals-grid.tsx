import { MealType } from "@/types/meal-types";
import classes from "./meals-grid.module.css";
import MealItem from "./meal-item";
type MealsGridPropsType = {
  meals: MealType[];
};

export default function MealsGrid({ meals }: MealsGridPropsType) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
