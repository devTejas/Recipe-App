import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';
// import Recipe from './Recipe';
import { v4 as uuidv4 } from 'uuid';

import '../css/app.css'

// Recipe context for add & delete buttons
export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'recipeApp.recipes';

export default function App() {
    const [recipes, setRecipes] = useState(sampleRecipes);

    // for selecting recipes and editing them
    const [selectedRecipeId, setSelectedRecipeId] = useState();
    const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

    useEffect(
        () => {
            const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (recipeJSON !== null) setRecipes(JSON.parse(recipeJSON))
        }, []
    );

    useEffect(
        () => {
            localStorage.setItem(LOCAL_STORAGE_KEY,
                JSON.stringify(recipes))
        },
        [recipes]
    );

    const recipeContextValue = {
        handleRecipeAdd,
        handleRecipeDelete,
        handleRecipeSelect,
        handleRecipeChange
    }

    // handleRecipeEdit
    function handleRecipeSelect(id) {
        setSelectedRecipeId(id);
    }

    function handleRecipeAdd() {
        const newRecipe = {
            id: uuidv4(),
            name: 'Name',
            servings: 1,
            cookTime: '',
            instructions: '',
            ingredients: [
                {
                    id: uuidv4(),
                    name: '',
                    amount: ''
                }
            ]
        }

        setRecipes([...recipes, newRecipe]);
        handleRecipeSelect(newRecipe.id)
    }

    // handleRecipeChange runs for each and every change of input. We can also add a save button, which on click runs onChange function
    function handleRecipeChange(id, recipe) {
        const newRecipes = [...recipes]
        const index = newRecipes.findIndex(r => r.id === id)
        newRecipes[index] = recipe
        setRecipes(newRecipes)
    }

    function handleRecipeDelete(id) {
        if (selectedRecipeId !== null && selectedRecipeId === id)
            setSelectedRecipeId(undefined)
        setRecipes(
            recipes.filter(recipe => recipe.id !== id)
        );
    }

    return (
        // using context
        <RecipeContext.Provider value={recipeContextValue}>
            <RecipeList recipes={recipes} />
            {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
        </RecipeContext.Provider>

        // using props
        // <RecipeList
        //     recipes={recipes}
        //     handleRecipeAdd={handleRecipeAdd}
        //     handleRecipeDelete={handleRecipeDelete}
        // />
    )
}

const sampleRecipes = [
    {
        id: 1,
        name: 'Plain Rice',
        servings: 3,
        cookTime: '1:45',
        instructions: "1.Put rice in cooker\n2.Put salt in rice\n3.Eat rice",
        ingredients: [
            {
                id: 1,
                name: 'Rice',
                amount: '2 Pounds'
            },
            {
                id: 2,
                name: 'Salt',
                amount: '1 tsp'
            }
        ]
    },
    {
        id: 2,
        name: 'Idly',
        servings: 5,
        cookTime: '0:45',
        instructions: "1.Put Idly in cooker\n2.Put oil in Idly\n3.Eat idly",
        ingredients: [
            {
                id: 1,
                name: 'Idly',
                amount: '1 Pound'
            },
            {
                id: 2,
                name: 'Oil',
                amount: '1 tbs'
            }
        ]
    },
]