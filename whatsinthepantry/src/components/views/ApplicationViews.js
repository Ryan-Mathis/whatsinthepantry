import { Outlet, Route, Routes } from "react-router-dom"
import { AllIngredientsList } from "../ingredients/AllIngredientsList.js"
import { MyPantryList } from "../pantries/MyPantryList.js"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>What'sInThePantry?</h1>
                    <Outlet />
                </>
            }>
                
                <Route path="allingredients" element={ <AllIngredientsList /> } />

                <Route path="mypantry" element={ <MyPantryList /> } />

            </Route>
        </Routes>
    )
}