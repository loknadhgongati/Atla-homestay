
import axios from 'axios';


export const extractApiErrors = (resError) => {
  let errors = [{ title: 'Error!', detail: 'Ooops, something went wrong!' }];

  if (resError && resError.data && resError.data.errors) {
    errors = resError.data.errors;
  }

  return errors;
}


export const fetchRentals = () => dispatch => {

  axios.get('/api/rentals/')
    .then(res => {
      const rentals = res.data;
      dispatch({
        type: 'FETCH_RENTALS',
        rentals
      })
    })
    .catch(error => {
      console.error("Error in fetchRentals:", error.response?.status, error.response?.data);
      dispatch({
        type: 'FETCH_RENTALS_ERROR',
        error: error.response?.data || 'Failed to fetch rentals'
      });
    });
}

export const fetchRentalById = rentalId => async dispatch => {
  dispatch({ type: 'IS_FETCHING_RENTAL' });
  try {
    if (!rentalId) {
      throw new Error('Rental ID is undefined');
    }
    const res = await axios.get(`/api/rentals/${rentalId}`);
    dispatch({
      type: 'FETCH_RENTAL_BY_ID',
      rental: res.data
    });
  } catch (error) {
    console.error("Error in fetchRentalById:", error.message, error.response?.status, error.response?.data);
    dispatch({
      type: 'FETCH_RENTAL_BY_ID_ERROR',
      error: error.response?.data || error.message || 'Failed to fetch rental'
    });
  }
};

export const createRental = rental => {
  return {
    type: 'CREATE_RENTAL',
    rental
  }
}
// AUTH ACTIONS

export const registerUser = (registerData) => {
  return axios
    .post('/api/users/register', registerData)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})))
}

export const loginUser = (loginData) => {
  return axios
    .post('/api/users/login', loginData)
    .then(res => res.data)
    .catch(error => Promise.reject(extractApiErrors(error.response || {})))
}

export const userAuthenticated = (decodedToken) => {
  return {
    type: 'USER_AUTHENTICATED',
    username: decodedToken.username || ''
  }
}