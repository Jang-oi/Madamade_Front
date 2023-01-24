import { useState } from 'react';
import { customAlert } from '../utils/commonUtil';
import { getErrorMessage, getReturnObj } from '../utils/callUtil';
import { useLoadingDispatch } from '../contexts/loadingContext';

export const useAxios = () => {

    const [response, setResponse] = useState(null);
    const loadingDispatch = useLoadingDispatch();

    const axiosFetch = async (configObj) => {
        const { axiosInstance, method, url, requestConfig = {} } = configObj;

        try {
            loadingDispatch({ type: 'SET_LOADING', loading: true });
            const res = await axiosInstance[method.toLowerCase()](url, { ...requestConfig });
            const { returnCode, returnMessage, returnData } = getReturnObj(res);

            switch (returnCode) {
                case 0 :
                    setResponse(returnData);
                    break;
                case 1 :
                    customAlert({ text: returnMessage, isError: false }, setResponse(returnData));
                    break;
                case -1 :
                    customAlert({ text: returnMessage, isError: true });
                    break;
                case -2 :
                    customAlert({ text: returnMessage, isError: true });
                    break;
                default:
                    break;
            }
            return returnData;
        } catch (err) {
            customAlert({ text: getErrorMessage(err), isError: true });
        } finally {
            loadingDispatch({ type: 'SET_LOADING', loading: false });
        }
    };

    return [axiosFetch, response];
};