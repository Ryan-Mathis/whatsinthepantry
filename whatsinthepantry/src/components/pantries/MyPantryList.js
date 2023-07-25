import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const MyPantryList = () => {
    const [userPantryIngredients, setUserPantryIngredients] = useState([])
    const navigate = useNavigate()

    const localPantryUser = localStorage.getItem("pantry_user")
    const pantryUserObject = JSON.parse(localPantryUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/pantries?userId=${pantryUserObject.id}&_expand=ingredient`)
                .then(response => response.json())
                .then((userPantryArray) => {
                    setUserPantryIngredients(userPantryArray)
                })
        },
        []
    )
    
    
    return <>
        <h2>Ingredient List</h2>

        <article className="ingredients">
            {
                userPantryIngredients.map(
                    (ingredient) => {
                        return <section className="ingredient" key={ingredient?.ingredient.id}>
                            <div class="ingredientName">{ingredient?.ingredient.name}</div>
                            <div class="measurementType">{ingredient?.ingredient.measurementType}</div>
                        </section>
                    }
                )
            }
        </article>
    </>
}