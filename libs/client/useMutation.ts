import axios from 'axios';
import { useState } from 'react';

type UseMutationState = { loading: boolean; data: undefined | any; error: undefined | any };
type ReturnType = [(data: any) => void, UseMutationState];

const useMutation = (url: string): ReturnType => {
  const [state, setState] = useState<UseMutationState>({ loading: false, data: undefined, error: undefined });
  const mutation = (data: any) => {
    setState((prev) => ({ ...prev, loading: true }));
    axios
      .post(url, data)
      .then((res) => {
        setState((prev) => ({ ...prev, data: res.data }));
      })
      .catch((error) => {
        setState((prev) => ({ ...prev, error }));
        console.error(error);
      })
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  };
  return [mutation, { ...state }];
};
export default useMutation;
