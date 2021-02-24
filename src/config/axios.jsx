import axios from "axios";

const setBaseUrl = () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE;
};

const setToken = (token) => {
    axios.defaults.headers.common["token"] = token;
};

export { setBaseUrl };
export default setToken;
