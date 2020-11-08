import React from 'react'
import RecipeList from './RecipeList'
import Recipe from './Recipe'

export default function App() {
  return (
    <RecipeList recipes={sampleRecipes} />
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Rice',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put rice in cookern2.Put salt in rice\n3.Eat rice"
  },
  {
    id: 2,
    name: 'Idly',
    servings: 5,
    cookTime: '0:45',
    instructions: "1. Put Idly in cooker\n2.Put oil in Idly\n3.Eat idly"
  },
]