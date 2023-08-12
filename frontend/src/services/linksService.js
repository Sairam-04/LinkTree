import axios from "axios";
const BASE_URL = "http://localhost:1200";

const fetchAllLinks = (username) => {
  const uri = `${BASE_URL}/get-links`;
  return axios.get(uri, { params: { username: username } });
};

const result = {
  fetchAllLinks,
};

export default result;
