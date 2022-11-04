const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async() => {
    // Run your code here, after you have insured that the connection was made
   
   // Iteration 2?
    // const myRecipe = await Recipe.create({
    //   title: 'Borsch',
    //   level: 'Easy Peasy',
    //   ingredients: ['bla','something','x','d'],
    //   cuisine: 'Russian',
    //   dishType: 'soup',
    // })
    // console.log(myRecipe.title)

    //Iteration 3
    const allRecipes = await Recipe.insertMany(data)
    allRecipes.forEach(recipe => console.log(recipe.title))

    // Iteration 4
    const updatedRigatoni = await Recipe.findOneAndUpdate(
      {title : 'Rigatoni alla Genovese'}, 
      {duration : 100},
      {new : true}
    )
    console.log(updatedRigatoni)

    // Iteration 5
    const deletedCarrotCake = await Recipe.deleteOne({title: 'Carrot Cake'})
    console.log(deletedCarrotCake)

    // Iteration 6
    await mongoose.disconnect()

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
