import { createContext, useReducer, useContext } from 'react';

const initialState = {
    url: '',
};

const urlReducer = (state, action) => {
    switch (action.type) {
        case 'SET_URL':
            return {
                ...state,
                url: action.url,
            };
        default:
            throw new Error(`UnHandled action type : ${action.type}`);
    }
};

const UrlStateContext = createContext(null);
const UrlDispatchContext = createContext(null);

export const UrlProvider = ({ children }) => {
    const [state, dispatch] = useReducer(urlReducer, initialState);
    return (
        <UrlStateContext.Provider value={state}>
            <UrlDispatchContext.Provider value={dispatch}>{children}</UrlDispatchContext.Provider>
        </UrlStateContext.Provider>
    );
};

export const useUrlState = () => {
    const state = useContext(UrlStateContext);
    if (!state) throw new Error('cannot find UrlProvider');
    return state;
};

export const useUrlDispatch = () => {
    const dispatch = useContext(UrlDispatchContext);
    if (!dispatch) throw new Error('cannot find UrlProvider');
    return dispatch;
};
