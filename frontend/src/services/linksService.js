import axios from "axios";
const BASE_URL = import.meta.env.VITE_BACKEND_SERVER_URI;



const fetchAllLinks = (username) => {
  const uri = `${BASE_URL}/get-links`;
  return axios.get(uri, { params: { username: username } });
};

const result = {
  fetchAllLinks,
};

export default result;
