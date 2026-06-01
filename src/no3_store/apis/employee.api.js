import axios from "axios";

export const employeeAllGetApi = async () => {
    try {
        const response = await axios.get("http://localhost:3001/employees")
        return response.data
    } catch (error) {
        return error
    }
}

export const employeeAllPostApi = async (dataobj) => {
    try {
        const response = await axios.post("http://localhost:3001/employees", dataobj)
        return response.data
    } catch (error) {
        return error
    }
}

export const employeeAllPutApi = async (dataobj) => {
    try {
        const response = await axios.put(`http://localhost:3001/employees/${dataobj.id}`, dataobj)
        return response.data
    } catch (error) {
        return error
    }
}

export const employeeDeleteApi = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3001/employees/${id}`)
        return response.data
    } catch (error) {
        return error
    }
}