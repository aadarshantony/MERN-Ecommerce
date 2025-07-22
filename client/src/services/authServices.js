import api from "../api";


export const signupUser = async (userData) => {
  try {
    const res = await api.post('/auth/signup', userData);
    console.log(res.data.message)
    return res.data;
  } catch (err) {
    throw err.response?.data || err;

  }
}

export const loginUser = async (credentials) => {
  try {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}


export const logoutUser = async () => {
  try {
    const res = await api.post('/auth/logout');
    
    return res
  } catch (err) {
    throw err.response?.data || err;
  }
}