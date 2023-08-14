import { useEffect, useState } from "react"
import { Form, useNavigate, useParams } from "react-router-dom"
import { editCustomIngredient, getCustomIngredientbyId, getCustomIngredientsbyUserId } from "../dataManager/ingredientManager.js"
import { Button, FormGroup, Input, Label } from "reactstrap"

export const CustomIngredientEdit = ({setUserCustomIngredients}) => {
    const navigate = useNavigate()
    const { ingredientId } = useParams()

    const pantryUserObject = JSON.parse(localStorage.getItem("pantry_user"))

    const [customIngredient, setCustomIngredient] = useState({
        userId: '',
        name: '',
        measurementType: '',
        isAdded: false,
        quantity: ''
    })

    useEffect(() => {
        getCustomIngredientbyId(ingredientId)
        .then(res => setCustomIngredient(res))
    }, [])

    const getUserCustomIngredients = () => {
        getCustomIngredientsbyUserId(pantryUserObject.id)
            .then(res => setUserCustomIngredients(res))
    }

    const handleEditCustomIngredient = (evt) => {
        evt.preventDefault()

           return editCustomIngredient(ingredientId, customIngredient)
                .then(res => getUserCustomIngredients())
                .then(() => { navigate("/mycustomingredients") })
    }

    return <>
        <div>
            <Label
                for="customIngredientName"
            >
                Custom Ingredient Name:
            </Label>
            <Input
                id="customIngredientName"
                type="text"
                name="customIngredientName"
                placeholder={customIngredient.name}
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
            <Button
            type="button"
            onClick={handleEditCustomIngredient}
            >
                Submit
            </Button>

        </div >


    </>

}