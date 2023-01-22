import { useState } from 'react';
import axios from 'axios';
import { uniAlert } from '../utils/commonUtil';
import { getErrorMessage, getReturnObj } from '../utils/callUtil';
import { useLoadingDispatch } from '../contexts/loadingContext';

axios.defaults.baseURL = 'http://localhost:3000/mada/';

export const useAxios = () => {

    const [response, setResponse] = useState(null);
    const loadingDispatch = useLoadingDispatch();

    const axiosFetch = async (configObj) => {
        const {
            method,
            url,
            requestConfig = {},
        } = configObj;

        try {
            loadingDispatch({
                type   : 'SET_LOADING',
                loading: true,
            });
            const res = await axios[method](url, {
                ...requestConfig,
            });
            const { returnCode, returnMessage, returnData } = getReturnObj(res);
            switch (returnCode) {
                case 0 :
                    setResponse(returnData);
                    break;
                case 1 :
                    uniAlert({ returnMessage, isError: false }, setResponse(returnData));
                    break;
                case -1 :
                    uniAlert({ returnMessage, isError: true });
                    break;
                default:
                    break;
            }
        } catch (err) {
            uniAlert({ returnMessage: getErrorMessage(err), isError: true });
        } finally {
            loadingDispatch({
                type   : 'SET_LOADING',
                loading: false,
            });
        }
    };

    return [response, axiosFetch];
};

export default useAxios;