import ReactDOM from "react-dom/client";
import React from "react";

import { WidthProvider } from "./WidthContext";
import { Masonry } from "./components/Masonry";
import App from "./wrapper/components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WidthProvider>
      <App>
        <Masonry></Masonry>
      </App>
    </WidthProvider>
  </React.StrictMode>
);
