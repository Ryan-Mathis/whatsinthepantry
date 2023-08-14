import { Outlet, Route, Routes } from "react-router-dom"
import { AllIngredientsList } from "../ingredients/AllIngredientsList.js"
import { MyPantryList } from "../pantries/MyPantryList.js"
import { useEffect, useState } from "react"
import { getUserPantryIngredients } from "../dataManager/ingredientManager.js"
import { UserCustomIngredients } from "../ingredients/CustomIngredientsList.js"
import { getCustomIngredientsbyUserId } from "../dataManager/ingredientManager.js"
import { EditMyPantryList } from "../pantries/EditMyPantryList.js"
import { NewIngredientForm } from "../ingredients/NewIngredientForm.js"
import { CustomIngredientEdit } from "../ingredients/CustomIngredientEdit.js"


export const ApplicationViews = () => {
    const [userPantryIngredients, setUserPantryIngredients] = useState([])
    const [userCustomIngredients, setUserCustomIngredients] = useState([])
    const localPantryUser = localStorage.getItem("pantry_user")
    const pantryUserObject = JSON.parse(localPantryUser)

    useEffect(
        () => {
            getUserPantryIngredients(pantryUserObject.id)
                .then((userPantryArray) => {
                    setUserPantryIngredients(userPantryArray)
                })
        },
        []
    )
    
    useEffect(
        () => {
            getCustomIngredientsbyUserId(pantryUserObject.id)
                .then((userCustomIngredientsArray) => {
                    setUserCustomIngredients(userCustomIngredientsArray)
                })
        }, []
    )



	return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>
                
                <Route path="allingredients" element={ <AllIngredientsList userPantryIngredients={userPantryIngredients} setUserPantryIngredients={setUserPantryIngredients}/> } />

                <Route path="mycustomingredients" element={ <UserCustomIngredients userCustomIngredients={userCustomIngredients} setUserCustomIngredients={setUserCustomIngredients}/> } />
                <Route path="mycustomingredients/:ingredientId/edit" element={<CustomIngredientEdit setUserCustomIngredients={setUserCustomIngredients}/>} />

                <Route path="addcustomingredient" element={<NewIngredientForm setUserCustomIngredients={setUserCustomIngredients} />} />

                <Route path="" element={ <MyPantryList userPantryIngredients={userPantryIngredients} setUserPantryIngredients={setUserPantryIngredients} userCustomIngredients={userCustomIngredients}/> } />

                <Route path="editmypantry" element={<EditMyPantryList userPantryIngredients={userPantryIngredients} setUserPantryIngredients={setUserPantryIngredients} userCustomIngredients={userCustomIngredients} setUserCustomIngredients={setUserCustomIngredients}/> } />

            </Route>
        </Routes>
    )
}