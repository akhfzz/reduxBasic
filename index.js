// library
const redux = require('redux');
const reduxLogger = require('redux-logger');

// calls redux
const createStore = redux.createStore;
const combineStore = redux.combineReducers;
const middleWare = redux.applyMiddleware;
const logger = reduxLogger.createLogger()

// type
const SHOPING = 'SHOP';
const BUY_ICE = 'ICE CREAM'

const initialState = {
    numOfCakes : 10,
    numOfIce : 20
}
const initialStateCake = {
    numOfCakes : 10
}
const initialStateIce = {
    numOfIce : 20
}

const Action = () =>{
    return{
        type: SHOPING,
        info: 'first redux action'
    }
}
const iceCream = () =>{
    return{
        type: BUY_ICE,
        info: 'second redux action'
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case SHOPING : return { 
            ...state,
            numOfCakes : state.numOfCakes - 1
        }
        case BUY_ICE: return{
            ...state,
            numOfIce: state.numOfIce - 1
        }
        default: return state
    }
}
const reducerCake = (state=initialStateCake, action) => {
    switch(action.type){
        case SHOPING : return { 
            ...state,
            numOfCakes : state.numOfCakes - 1
        }
        default: return state
    }
}
const reducerIce = (state=initialStateIce, action) => {
    switch(action.type){
        case BUY_ICE : return { 
            ...state,
            numOfIce : state.numOfIce - 1
        }
        default: return state
    }
}

const rootReduce = combineStore({
    cake: reducerCake,
    ice: reducerIce
})


const store = createStore(rootReduce, middleWare(logger));
console.log('Initial state', store.getState())
// registed
const unsubcribe = store.subscribe(() => {})
// here start change state because parameter function
store.dispatch(Action())
store.dispatch(Action())
store.dispatch(Action())
store.dispatch(iceCream())
store.dispatch(iceCream())
unsubcribe()

