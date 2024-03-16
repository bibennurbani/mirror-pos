import React from "react";
import "./App.css";
import { observer } from "mobx-react-lite";
import RouteProvider from "./contexts/RouteProvider";

const App: React.FC = observer(() => {
  return (
    <div className="App">
      <RouteProvider />
    </div>
  );
});

export default App;
