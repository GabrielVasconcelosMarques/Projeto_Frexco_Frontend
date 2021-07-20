import axios from 'axios';

const api = axios.create({baseUrl: 'http://localhost:3005/sistema'});

export default api;