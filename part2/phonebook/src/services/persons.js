import axios from 'axios'

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseURL)
}

const create = newObject => {
    return axios.post(baseURL, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseURL}/${id}`, newObject)
}

const deletePerson = id => {
    return axios.delete(`${baseURL}/${id}`)
}

export default {
    baseUrl: baseURL,
    getAll: getAll,
    create: create,
    update: update,
    deletePerson: deletePerson
}
