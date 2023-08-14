import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { addNewCustomIngredient, getCustomIngredientsbyUserId } from "../dataManager/ingredientManager.js"

export const NewIngredientForm = ({ setUserCustomIngredients }) => {
    const navigate = useNavigate()

    const pantryUserObject = JSON.parse(localStorage.getItem("pantry_user"))

    const [customIngredient, setCustomIngredient] = useState({
        name: "",
        measurementType: ""
    })

    const getUserCustomIngredients = () => {
        getCustomIngredientsbyUserId(pantryUserObject.id)
            .then(res => setUserCustomIngredients(res))
    }

    const handleNewCustomIngredientSubmit = (evt) => {
        evt.preventDefault()

        const newIngredientToSendToAPI = {
            userId: pantryUserObject.id,
            name: customIngredient.name,
            measurementType: customIngredient.measurementType,
            isAdded: false,
            quantity: 1
        }

        return addNewCustomIngredient(newIngredientToSendToAPI)
            .then(res => getUserCustomIngredients())
            .then(() => { navigate("/mycustomingredients") })

    }

    return <>
        <Form onSubmit={handleNewCustomIngredientSubmit}>
            <Label
                for="customIngredientName"
            >
                Custom Ingredient Name:
            </Label>
            <Input
                id="customIngredientName"
                type="text"
                name="customIngredientName"
                onChange={(event) => {
                    const copy = { ...customIngredient }
                    copy.name = event.target.value
                    setCustomIngredient(copy)
                }} />
            <FormGroup>
                <legend>
                    How would you like to track your ingredient's quantity?
                </legend>
                <FormGroup check>
                    <Input
                        name="measurements"
                        type="radio"
                        checked
                        value="teaspoon"
                        onChange={(event) => {
                            const copy = { ...customIngredient }
                            copy.measurementType = event.target.value
                            setCustomIngredient(copy)
                        }}
                    />
                    {' '}
                    <Label check>
                        Teaspoons
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Input
                        name="measurements"
                        type="radio"
                        value="tablespoon"
                        onChange={(event) => {
                            const copy = { ...customIngredient }
                            copy.measurementType = event.target.value
                            setCustomIngredient(copy)
                        }}
                    />
                    {' '}
                    <Label check>
                        Tablespoons
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Input
                        name="measurements"
                        type="radio"
                        value="cup"
                        onChange={(event) => {
                            const copy = { ...customIngredient }
                            copy.measurementType = event.target.value
                            setCustomIngredient(copy)
                        }}
                    />
                    {' '}
                    <Label check>
                        Cups
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Input
                        name="measurements"
                        type="radio"
                        value="fluid oz"
                        onChange={(event) => {
                            const copy = { ...customIngredient }
                            copy.measurementType = event.target.value
                            setCustomIngredient(copy)
                        }}
                    />
                    {' '}
                    <Label check>
                        Fluid Ounces
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Input
                        name="measurements"
                        type="radio"
                        value="quart"
                        onChange={(event) => {
                            const copy = { ...customIngredient }
                            copy.measurementType = event.target.value
                            setCustomIngredient(copy)
                        }}
                    />
                    {' '}
                    <Label check>
                        Quarts
                    </Label>
                </FormGroup>
            </FormGroup >
            <Button>
                Submit
            </Button>

        </Form >
    </>
}