import { createContext, useReducer, useContext } from 'react';

const initialState = {
    keyword: [],
    date   : {},
    review : [],
};

const fetchDataReducer = (state, action) => {
    switch (action.type) {
        case 'SET_KEYWORD_DATA':
            return {
                ...state,
                keyword: action.keyword,
            };
        case 'SET_DATE_DATA':
            return {
                ...state,
                date: action.date,
            };
        case 'SET_REVIEW_DATA':
            return {
                ...state,
                review: action.review,
            };
        default:
            throw new Error(`UnHandled action type : ${action.type}`);
    }
};

const FetchDataStateContext = createContext(null);
const FetchDataDispatchContext = createContext(null);

export const FetchDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(fetchDataReducer, initialState);
    return (
        <FetchDataStateContext.Provider value={state}>
            <FetchDataDispatchContext.Provider value={dispatch}>{children}</FetchDataDispatchContext.Provider>
        </FetchDataStateContext.Provider>
    );
};

export const useFetchDataState = () => {
    const state = useContext(FetchDataStateContext);
    if (!state) throw new Error('cannot find FetchDataProvider');
    return state;
};

export const useFetchDataDispatch = () => {
    const dispatch = useContext(FetchDataDispatchContext);
    if (!dispatch) throw new Error('cannot find FetchDataProvider');
    return dispatch;
};
