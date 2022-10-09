import { useLayoutEffect } from 'react';
//import { useContext} from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/dummy-data';
//import { FavoritesContext } from '../store/context/favorites-context';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/redux/favorites';

function MealDetailScreen({ route, navigation }) {
  //const favortiesMealsCtx = useContext(FavoritesContext)
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const DISPATCH = useDispatch();
  
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);
  //const mealIsFavorite = favortiesMealsCtx.ids.includes(mealId);
  const mealIsFavorite = favoriteMealIds.includes(mealId); 


  function changeFavoriteStatus() {
    if(mealIsFavorite) {
      /*favortiesMealsCtx.removeFavorite(mealId)*/
      DISPATCH(removeFavorite({ id: mealId }));
    } else {
      //favortiesMealsCtx.addFavorite(mealId)
      DISPATCH(addFavorite({ id: mealId }));
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            color="white"
            onPress={changeFavoriteStatus}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatus]);

  console.log(favoriteMealIds);
  console.log(mealIsFavorite)
  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
});
