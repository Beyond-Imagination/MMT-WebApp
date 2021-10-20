import { useReducer, useEffect } from 'react';
import axios from 'axios';
import useStorage from './useStorage';

interface IAction {
  error?: Error;
  data?: any;
  type: 'LOADING' | 'SUCCESS' | 'ERROR';
}

interface IState {
  loading: boolean;
  data: any;
  error: Error | null;
}

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const BASE_URL = 'http://api.moment.beyond-imagination.ml';

export default function useApi(
  endpoint: string,
  method: 'get' | 'post' | 'put' | 'delete',
): [IState, (params: any) => Promise<void>] {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async (params: any) => {
    dispatch({ type: 'LOADING' });
    try {
      let url = `${BASE_URL}${endpoint}`;
      let data;
      const token = useStorage().sessionStorage.getItem('KAKAO_ACCESS_TOKEN');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (method === 'get') {
        const queryParams = new URLSearchParams(params).toString();
        url = `${url}?${queryParams}`;
        const res = await axios.get(url, config);
        data = res.data;
      } else {
        const res = await axios[method](url, params, config);
        data = res.data;
      }

      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  return [state, fetchData];
}
