// ------------------------------------
// Constants
// ------------------------------------

import update from 'immutability-helper';

export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const UPDATE_TEST_VALUE = 'UPDATE_TEST_VALUE'

// ------------------------------------
// Actions
// ------------------------------------
export function increment (value = 1) {
  return {
    type    : COUNTER_INCREMENT,
    data : value
  }
}

export const updateTestValue = (data) => {
  return {
    type : UPDATE_TEST_VALUE,
    data: data
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : COUNTER_DOUBLE_ASYNC,
          data : getState().counter.count
        })
        resolve()
      }, 200)
    })
  }
}


// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [COUNTER_INCREMENT]    : (state, action) => {
    let data = state.count + action.data
    return update(state, {count:{$set:data}});
  },
  [COUNTER_DOUBLE_ASYNC] : (state, action) => {
    let data = 2 * action.data
    return update(state, {count:{$set:data}});
  },
  [UPDATE_TEST_VALUE] : (state,action) => {
    return update(state , {test :{$set : action.data.test}});
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  count : 0,
  test : ""
}
export default function counterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
