// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import React from "react";

import { WidthProvider } from "./WidthContext";
import App from "./wrapper/components/App";
import LeafletApp from "./leaflet/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WidthProvider>
      <App
        department={"Institutional Effectiveness & Research"}
        heading={"Data Pages"}
      />
      {/* <LeafletApp></LeafletApp> */}
      {/* <Router>
        <Routes>
          <Route
            element={
              <App
                department={"Institutional Effectiveness & Research"}
                heading={"Data Pages"}
              />
            }
            path="/"
          ></Route>
          <Route element={<LeafletApp></LeafletApp>} path="/leaflet"></Route>
        </Routes>
      </Router> */}
    </WidthProvider>
  </React.StrictMode>
);

/*

- make sure template follows visual identity guide
- add template to cdn
- test out placing a component on the server on a link
- deploy data page from chad's device and update freshman profile title

*/

/*
- when the parent re-renders, it will re-render all of the parent's jsx
- however, it will not re-render the children prop
- sometimes you cannot get away with using the children prop, because it depends on values from a parent component in the form of props
- when looking at the flame graph, there cannot be a gap in the flame graph, right?
- component composition is still good for ledgibility and reducing prop drilling
*/
