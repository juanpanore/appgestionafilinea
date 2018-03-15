import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:9640/gestionpagosprevencionapi/",
});

export default instance;
