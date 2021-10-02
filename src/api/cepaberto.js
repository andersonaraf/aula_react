import axios from "axios";

const AUTH_TOKEN = "Token token=2719a39afde6fc47c3eecd2df1c8bf2a";

export const getLatLong = async (cep) => {
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    const response = await axios.get(
        `https://www.cepaberto.com/api/v3/cep?cep=${cep}`
    );
   
    return response.data;
};