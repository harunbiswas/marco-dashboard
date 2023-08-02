import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";
import Sidebar from "./components/header/Sidebar";
import Root from "./components/root/Root";

function App() {
  const [padding, setPadding] = useState(0);
  const [isFull, setIsFull] = useState(true);
  useEffect(() => {
    const nav = document.getElementById("nav");
    setPadding(nav.offsetWidth);
  }, [isFull]);
  return (
    <div className="app">
      <BrowserRouter>
        <div
          style={{
            paddingLeft: `${padding}px`,
          }}
          className="main"
        >
          <Header />
          <div className="main-body">
            <Root />
          </div>
        </div>
        <Sidebar isFull={isFull} setIsFull={setIsFull} />
      </BrowserRouter>
    </div>
  );
}

export default App;
