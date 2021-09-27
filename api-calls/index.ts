import axios from 'axios';
import config from '../config';

export const fetcher = axios.create({ baseURL: config.apiUrl });
