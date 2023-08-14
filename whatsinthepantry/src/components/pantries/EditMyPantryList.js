import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { deletePantryIngredient, removeCustomIngredientFromPantry, removeCustomIngredientToPantry, updateCustomIngredientQuantity, updateIngredientQuantity } from "../dataManager/pantryManager.js"
import { getCustomIngredientsbyUserId, getUserPantryIngredients } from "../dataManager/ingredientManager.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const EditMyPantryList = ({ userPantryIngredients, userCustomIngredients, setUserPantryIngredients, setUserCustomIngredients }) => {
    const [edit, setEdit] = useState()
    const [customEdit, setCustomEdit] = useState()

    const navigate = useNavigate()

    const pantryUserObject = JSON.parse(localStorage.getItem("pantry_user"))

    const getNewUserPantryIngredients = () => {
        getUserPantryIngredients(pantryUserObject.id)
            .then(res => setUserPantryIngredients(res))
    }

    const handleDeletePantryEntry = (evt) => {
        evt.preventDefault()
        
        return deletePantryIngredient(parseInt(evt.target.value))
        .then(res => getNewUserPantryIngredients())
    }
    
    const handleIngredientQuantityEditSubmit = (evt) => {
        evt.preventDefault()
        
        return updateIngredientQuantity(parseInt(evt.target.id), parseInt(evt.target[0].value))
        .then(res => getNewUserPantryIngredients())
    }
    
    const getNewCustomPantryIngredients = () => {
        getCustomIngredientsbyUserId(pantryUserObject.id)
            .then(res => setUserCustomIngredients(res))
    }

    const handleDeleteCustomPantryEntry = (evt) => {
        evt.preventDefault()
        
        return removeCustomIngredientFromPantry(parseInt(evt.target.value))
        .then(res => getNewCustomPantryIngredients())
    }
    
    const handleCustomIngredientQuantityEditSubmit = (evt) => {
        evt.preventDefault()
        
        return updateCustomIngredientQuantity(parseInt(evt.target.id), parseInt(evt.target[0].value))
        .then(res => getNewCustomPantryIngredients())
    }
    

    return <>
        <h2>My Pantry</h2>
        <h4>Ingredient List</h4>
        <Button
                className="toMyPantry"
                color="warning"
                onClick={() => navigate(`/`)}
            >
                Finish Editing
            </Button>
        <article className="ingredients">
            {
                userPantryIngredients.map(
                    (ingredient) => {
                        return <>
                            <section className="ingredient" key={ingredient.id}>
                                <div className="ingredientName">{ingredient?.ingredient.name}</div>
                                <div className="measurementType">{ingredient.quantity} {ingredient?.ingredient.measurementType}(s)</div>
                                <Form onSubmit={handleIngredientQuantityEditSubmit} key={ingredient.id} id={ingredient.id}>
                                    <Row className="row-cols-lg-auto g-3 align-items-center">
                                        <Col>
                                            <Label
                                                className="visually-hidden"
                                                for="quantity"
                                            >
                                                Quantity
                                            </Label>
                                            <Input
                                                id={ingredient.id}
                                                type="number"
                                                name="quantity"
                                                placeholder={ingredient.quantity}
                                                onChange={(evt) => { setEdit(evt.target.value) }}
                                            />
                                        </Col>
                                        <Col>
                                            <Button
                                                className="submitBtn"
                                                color="success"
                                                for="quantity"
                                                type="submit"
                                                key={ingredient.id}>
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                <Button
                                    className="deleteBtn"
                                    color="danger"
                                    value={ingredient.id}
                                    onClick={handleDeletePantryEntry}
                                >
                                    Delete
                                </Button>
                            </section>
                        </>
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
                                <Form onSubmit={handleCustomIngredientQuantityEditSubmit} key={ingredient.id} id={ingredient.id}>
                                    <Row className="row-cols-lg-auto g-3 align-items-center">
                                        <Col>
                                            <Label
                                                className="visually-hidden"
                                                for="quantity"
                                            >
                                                Quantity
                                            </Label>
                                            <Input
                                                id={ingredient.id}
                                                type="number"
                                                name="quantity"
                                                placeholder={ingredient.quantity}
                                                onChange={(evt) => { setEdit(evt.target.value) }}
                                            />
                                        </Col>
                                        <Col>
                                            <Button
                                                className="submitBtn"
                                                color="success"
                                                for="quantity"
                                                type="submit"
                                                key={ingredient.id}>
                                                Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                                <Button
                                    className="deleteBtn"
                                    color="danger"
                                    value={ingredient.id}
                                    onClick={handleDeleteCustomPantryEntry}
                                >
                                    Delete
                                </Button>
                            </section>
                        }
                    }
                )
            }
        </article>
    </>
}