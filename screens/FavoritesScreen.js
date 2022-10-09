// import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dummy-data';
// import { FavoritesContext } from '../store/context/favorites-context';
import { useSelector } from 'react-redux';

function FavoritesScreen() {
  // const favortieMealsCtx = useContext(FavoritesContext);
  const favortieMealIds = useSelector((state) => state.favoriteMeals.ids);
  // const favortieMeals = MEALS.filter((meal) => favortieMealsCtx.ids.includes(meal.id));
  const favortieMeals = MEALS.filter((meal) => favortieMealIds.includes(meal.id));
  if(favortieMeals.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>
          No favorite meals found. Start adding some!
        </Text>
      </View>
    );
  }
  return <MealsList items={ favortieMeals } />
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  }
});