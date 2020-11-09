import React, { useContext } from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App'

export default function RecipeList(props) {
    // using props
    // const { recipes, handleRecipeAdd, handleRecipeDelete } = props;

    // using context
    const { recipes } = props;
    const { handleRecipeAdd } = useContext(RecipeContext);

    return (
        <div className="recipe-list">
            <div>
                {
                    recipes.map(recipe => {
                        return (
                            <Recipe
                                key={recipe.id}
                                {...recipe}
                            // handleRecipeDelete={handleRecipeDelete}  // using props
                            />
                        )
                    })
                }
            </div>
            <br />
            <div className="recipe-list__add-recipe-btn-container">
                <button
                    className="btn btn--primary"
                    onClick={handleRecipeAdd}
                >
                    Add Recipe
                </button>
            </div>
        </div>
    )
}
