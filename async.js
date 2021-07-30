const redux = require('redux');
const createStore = redux.createStore;
const middleWare = redux.applyMiddleware;
const thunk = require('redux-thunk').default;
const axios = require('axios')


const initialState = {
    loading : false,
    users : [],
    error : ''
}
const fetch_user_request = 'FETCH_USER_REQUEST';
const fetch_user_success = 'FETCH_USER_SUCCESS';
const fetch_user_failure = 'FETCH_USER_FAILURE';

// list of user
const fetchUserRequest = () => {
    return {
        type : fetch_user_request
    }
}
// fetch success
const fetchUserSuccess = (user) => {
    return {
        type: fetch_user_success,
        payload: user
    }
}
// fetch error
const fetchUserFailure = (error) => {
    return {
        type: fetch_user_failure,
        payload: error
    }
}
const reducer = (state=initialState, action) => {
    switch(action.type){
        case fetch_user_request:
            return {
                ...state,
                loading : true
            }
        case fetch_user_success:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error : ''
            }
        case fetch_user_failure:
            return {
                ...state,
                loading: false,
                user: [],
                error: action.payload
            }
    }
}
const fetchUser = () => {
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response=>{
                const users = response.data.map(user=>user.address);
                dispatch(fetchUserSuccess(users))
            })
            .catch(error=>{
                dispatch(fetchUserFailure(error.message))
            })
    }
}
const store = createStore(reducer, middleWare(thunk));
store.subscribe(()=>{
    console.log(store.getState())
});
store.dispatch(fetchUser())