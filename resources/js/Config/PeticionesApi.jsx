import axios from 'axios';

export const obtenerDataApi = async (url) => {
    const response = await axios.get(url);
    if (response.data.alert) return alert(response.data.alert)
    if (response.data.message) return alert(response.data.message)
    return response;
}

export const enviarFormApi = async (url, data) => {
    const response = await axios.post(url, data);
    if (response.data.alert) return alert(response.data.alert)
    if (response.data.message) return alert(response.data.message)
}