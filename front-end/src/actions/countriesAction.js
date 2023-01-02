import axios from 'axios'

export const startFetchCountries = (handleCountries) => {
    return async (dispatch) => {
        const response = await axios.get("https://www.universal-tutorial.com/api/countries/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYWRha2thbGFAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiNV93WWpiZ19PWC10Y2ZTWDEzUmVfajRuZm15RGNTX0RERDduVG5MUm9lUU1KUzVqWUlLQU8xQXVrTDd6WnF6bEVOcyJ9LCJleHAiOjE2NzI2ODA2NTJ9.UVrj-4vTPF6sUP0RHHVltUx6tg9aP58LmJjj3lOTtP8",
                "Accept": "application/json"
              }
        })
        const data = response.data
        handleCountries(data)
    }
}

export const startFetchStates = (country, handleStates) => {
    return async (dispatch) => {
        const response = await axios.get(`https://www.universal-tutorial.com/api/states/${country}`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYWRha2thbGFAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiNV93WWpiZ19PWC10Y2ZTWDEzUmVfajRuZm15RGNTX0RERDduVG5MUm9lUU1KUzVqWUlLQU8xQXVrTDd6WnF6bEVOcyJ9LCJleHAiOjE2NzI2ODA2NTJ9.UVrj-4vTPF6sUP0RHHVltUx6tg9aP58LmJjj3lOTtP8",
                "Accept": "application/json"
              }
        })

        const data = response.data
        handleStates(data)
    }
}

export const startFetchCities = (state, handleCities) => {
    return async (dispatch) => {
        const response = await axios.get(` https://www.universal-tutorial.com/api/cities/${state}`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYWRha2thbGFAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiNV93WWpiZ19PWC10Y2ZTWDEzUmVfajRuZm15RGNTX0RERDduVG5MUm9lUU1KUzVqWUlLQU8xQXVrTDd6WnF6bEVOcyJ9LCJleHAiOjE2NzI2ODA2NTJ9.UVrj-4vTPF6sUP0RHHVltUx6tg9aP58LmJjj3lOTtP8",
                "Accept": "application/json"
              }
        })

        const data = response.data
        handleCities(data)
    }
}