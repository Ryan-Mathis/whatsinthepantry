import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Ingredients.css"
import { Button } from "reactstrap"
import { getAllIngredients, getUserPantryIngredients } from "../dataManager/ingredientManager.js"
import { addIngredient } from "../dataManager/pantryManager.js"


export const AllIngredientsList = ({ userPantryIngredients, setUserPantryIngredients }) => {
    const [ingredients, setIngredients] = useState([])
    const userPantryIngredientIds = []
    const navigate = useNavigate()

    const pantryUserObject = JSON.parse(localStorage.getItem("pantry_user"))
    
    useEffect(
        () => {
            getAllIngredients()
                .then((ingredientsArray) => {
                    setIngredients(ingredientsArray)
                })
        },
        [userPantryIngredients]
    )

    const getUserIngIds = () => {
        console.log(userPantryIngredients)
        userPantryIngredients.map((ing) => userPantryIngredientIds.push(ing.ingredientId))
    }

    getUserIngIds()

    const handleAddIngredient = (evt) => {
        evt.preventDefault()

        const ingredientToBeAdded = {
            userId: pantryUserObject.id,
            ingredientId: parseInt(evt.target.value),
            quantity: 1
        }

        if (userPantryIngredientIds.includes(ingredientToBeAdded.ingredientId)) {
            return window.alert(`That ingredient is already in your pantry!`)
        }
        else {
            return addIngredient(ingredientToBeAdded)
                .then(res => getUserPantryIngredients(res.userId))
                .then(res => setUserPantryIngredients(res))
                .then(window.alert(`Ingredient Added`))
        }
    }





    return <>
        <h3>Ingredient List</h3>

        <article className="ingredients">
            {
                ingredients.map(
                    (ingredient) => {
                        return <>
                            <section className="ingredient" key={ingredient.id}>
                                <div className="ingredientName" key={ingredient.id}>{ingredient.name}</div>
                               <Button
                                            className="addBtn"
                                            color="success"
                                            value={ingredient.id}
                                            onClick={handleAddIngredient}
                                        >
                                            Add
                                        </Button>                                
                            </section>
                        </>
                    }
                )
            }
        </article>
    </>
}