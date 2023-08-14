const API = `http://localhost:8088`

export const getAllIngredients = () => {
    return fetch(`${API}/ingredients`)
        .then(response => response.json())
}

export const getUserPantryIngredients = (userId) => {
    return fetch(`${API}/pantries?userId=${userId}&_expand=ingredient`)
        .then(response => response.json())
}

export const getCustomIngredientsbyUserId = (userId) => {
    return fetch(`${API}/customIngredients?userId=${userId}`)
        .then(response => response.json())
}

export const getCustomIngredientbyId = (ingId) => {
    return fetch(`${API}/customIngredients/${ingId}`)
        .then(response => response.json())
}

export const deleteCustomIngredient = (ingId) => {
    return fetch(`${API}/customIngredients/${ingId}`, {
        method: "DELETE"
    })
        .then(res => res.json())
}

export const addNewCustomIngredient = (newCustomIngredient) => {
    return fetch(`${API}/customIngredients`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCustomIngredient)
    })
        .then(res => res.json())
}

export const editCustomIngredient = (ingredientId, newCustomIngredient) => {
    return fetch(`${API}/customIngredients/${ingredientId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCustomIngredient)
    })
        .then(res => res.json())
}