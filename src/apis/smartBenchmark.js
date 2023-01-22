import axios from 'axios';

const BASE_URL = 'http://localhost:3000/mada/';

export default axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
});
