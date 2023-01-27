import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/mada/';
const BASE_URL = 'http://43.201.2.159:1301/mada/';

export default axios.create({
    baseURL: BASE_URL,
});