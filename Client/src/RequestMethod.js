import axios from "axios";

const BASE_URL = "http://localhost:5000/api"
const TOKEN = 
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2E4ZmM2NTJkOTdjZWNjYzlhZDRjYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MjU5NTczMSwiZXhwIjoxNjUyNjgyMTMxfQ.alvn8qajGoCW-W4U9lX-heA8CFDE4C0z4ki6ByPXaW0"

export const publicRequest = axios.create({
    baseURL: BASE_URL
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
})