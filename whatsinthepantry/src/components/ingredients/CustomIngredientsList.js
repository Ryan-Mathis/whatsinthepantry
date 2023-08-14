import { deleteCustomIngredient, getCustomIngredientsbyUserId } from "../dataManager/ingredientManager.js"
import { Button } from "reactstrap"
import "./Ingredients.css"
import { addCustomIngredientToPantry } from "../dataManager/pantryManager.js"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"



export const UserCustomIngredients = ({ userCustomIngredients, setUserCustomIngredients }) => {
    const navigate = useNavigate()

    const pantryUserObject = JSON.parse(localStorage.getItem("pantry_user"))

    const getUserCustomIngredients = () => {
        getCustomIngredientsbyUserId(pantryUserObject.id)
            .then(res => setUserCustomIngredients(res))
    }

    const handleAddCustomIngredient = (evt) => {
        evt.preventDefault()

        const ingredientToBeAdded = {
            customIngredientId: parseInt(evt.target.value),
            quantity: 1
        }
        return addCustomIngredientToPantry(ingredientToBeAdded.customIngredientId)
            .then(getCustomIngredientsbyUserId(pantryUserObject.id))
            .then(window.alert(`Ingredient Added`))
    }

    const handleDeleteCustomIngredient = (evt) => {
        evt.preventDefault()

        return deleteCustomIngredient(parseInt(evt.target.value))
            .then(res => getUserCustomIngredients())
    }

    return <>
        <h2>My Custom Ingredients</h2>

        <h3>Ingredient List</h3>
        <article className="ingredients">
            <Button
                className="addNewCustIngBtn"
                color="warning"
                onClick={() => navigate(`/addcustomingredient`)}>
                Add New Ingredient
            </Button>
            {
                userCustomIngredients.map(
                    (ingredient) => {
                        return <>
                            <section className="custom--ingredient" key={ingredient.id}>
                                <div className="custom--ingredientName" key={ingredient.id}>{ingredient.name}</div>
                                <Button
                                className="custom--Btn"
                                color="warning"
                                onClick={() => navigate(`/mycustomingredients/${ingredient.id}/edit`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className="custom--Btn"
                                    color="success"
                                    value={ingredient.id}
                                    onClick={handleAddCustomIngredient}
                                >
                                    Add
                                </Button>
                                <Button
                                    className="custom--Btn"
                                    color="danger"
                                    value={ingredient.id}
                                    onClick={handleDeleteCustomIngredient}
                                >
                                    Delete
                                </Button>
                            </section>
                        </>
                    }
                )
            }

        </article>
    </>
}