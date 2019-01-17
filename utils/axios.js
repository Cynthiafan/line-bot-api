import axios from 'axios';

const service = axios.create({
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default service;
