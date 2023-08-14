import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap"

export const MyPantryList = ({ userPantryIngredients, userCustomIngredients }) => {

    const navigate = useNavigate()

    const pantryUserObject = JSON.parse(localStorage.getItem("pantry_user"))

    return <>
        <div className="pantryHead">
            <h2>My Pantry</h2>
            <h4>Ingredient List</h4>

            <Button
                className="editPantry"
                color="warning"
                onClick={() => navigate(`/editmypantry`)}
            >
                Edit Pantry
            </Button>
        </div>
        <article className="ingredients">
            {
                userPantryIngredients.map(
                    (ingredient) => {
                        return <section className="ingredient" key={ingredient.id}>
                            <div className="ingredientName">{ingredient?.ingredient.name}</div>
                            <div className="measurementType">{ingredient.quantity} {ingredient?.ingredient.measurementType}(s)</div>
                        </section>
                    }
                )
            }
        </article>
        <h4>Custom Ingredient List</h4>
        <article className="custom--ingredients">
            {
                userCustomIngredients.map(
                    (ingredient) => {
                        if (ingredient.isAdded === true) {
                            return <section className="custom--ingredient" key={ingredient.id}>
                                <div className="custom--ingredientName">{ingredient.name}</div>
                                <div className="measurementType">{ingredient.quantity} {ingredient.measurementType}(s)</div>
                            </section>
                        }
                    }
                )
            }
        </article>
    </>
}