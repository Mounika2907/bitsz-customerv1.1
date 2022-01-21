import axios from "axios";

const instance = axios.create({
    // baseURL: "http://10.10.5.143:8081/vkycv1/api/vkyc/"
    baseURL: process.env.REACT_APP_BASE_URL
});

instance.defaults.headers.common['Content-Type'] = "application/json";
instance.defaults.headers.common['apikey'] = "Zuayuqehj3h4j324h4j3h3jhsdajhajsdh";
instance.defaults.headers.common['authkey'] = "p3to7Vf2R76pvesGajKnFL4frYwhtc";

instance.interceptors.request.use(
    request => {
        // request.headers.common['authkey'] = "p3to7Vf2R76pvesGajKnFL4frYwhtc";
        return request;
    },
    error => {
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    response => {        
        return response;
    },
    error => {        
        return Promise.reject(error);
    }
);


export default instance;