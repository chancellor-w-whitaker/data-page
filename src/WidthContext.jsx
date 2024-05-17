import { createContext, useContext } from "react";

import { useElementSize } from "./hooks/useElementSize";

const WidthContext = createContext(null);

export function WidthProvider({ children }) {
  const [squareRef, { width = 0 }] = useElementSize();

  return (
    <div ref={squareRef}>
      <WidthContext.Provider value={width}>{children}</WidthContext.Provider>
    </div>
  );
}

export function useWidth() {
  return useContext(WidthContext);
}
