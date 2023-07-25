import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Ingredients.css"

export const AllIngredientsList = () => {
    const [ingredients, setIngredients] = useState([])
    const navigate = useNavigate()

    const localPantryUser = localStorage.getItem("pantry_user")
    const pantryUserObject = JSON.parse(localPantryUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/ingredients`)
                .then(response => response.json())
                .then((ingredientsArray) => {
                    setIngredients(ingredientsArray)
                })
        },
        []
    )
    
    
    return <>
        <h2>Ingredient List</h2>

        <article className="ingredients">
            {
                ingredients.map(
                    (ingredient) => {
                        return <>
                        <section className="ingredient" key={ingredient.id}>
                            <div class="ingredientName">{ingredient.name}</div>
                        <button className="addIngredient">Add</button>
                        </section>
                        
                        </>
                    }
                )
            }
        </article>
    </>
}