import { useEffect } from "react";
import { useState } from "react";

export function usePromise({ initialState, promise }) {
  const [data, setData] = useState(initialState);

  useEffect(() => {
    if (promise) {
      let ignore = false;

      promise.then((json) => !ignore && setData(json));

      return () => {
        ignore = true;
      };
    }
  }, [promise]);

  return data;
}
