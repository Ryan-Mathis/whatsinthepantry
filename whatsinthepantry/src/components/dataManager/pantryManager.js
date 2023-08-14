const API = `http://localhost:8088`

export const addIngredient = (ingredientObj) => {
    return fetch(`http://localhost:8088/pantries`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ingredientObj)
    })
        .then(res => res.json())
}

export const addCustomIngredientToPantry = (ingId) => {
    return fetch(`http://localhost:8088/customIngredients/${ingId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isAdded: true
        })
    })
        .then(res => res.json())
}

export const removeCustomIngredientFromPantry = (ingId) => {
    return fetch(`http://localhost:8088/customIngredients/${ingId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isAdded: false
        })
    })
        .then(res => res.json())
}

export const updateIngredientQuantity = (pantryId, newQuantity) => {
    return fetch(`http://localhost:8088/pantries/${pantryId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quantity: newQuantity 
        })
    })
        .then(res => res.json())
}

export const updateCustomIngredientQuantity = (ingId, newQuantity) => {
    return fetch(`http://localhost:8088/customingredients/${ingId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            quantity: newQuantity 
        })
    })
        .then(res => res.json())
}

export const deletePantryIngredient = (pantryId) => {
    return fetch(`${API}/pantries/${pantryId}` , {
        method: "DELETE"
    })
    .then(res => res.json())
}