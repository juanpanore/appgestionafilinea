import axios from "axios";

const instance = axios.create({
    baseURL: "http://192.168.2.108:9640/gestionpagosprevencionapi/"
});

export default instance;
