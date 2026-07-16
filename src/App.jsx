import { useState } from "react";
import "./App.css";
import Loader from "./components/Loader";

function App() {
  const [loader, setLoader] = useState(false);
  return (
    <div>
      {!loader && <Loader onComplete={() => setLoader(true)} />}
      <p className="text-center text-5xl font-smeibold justify-center">AVI</p>
    </div>
  );
}

export default App;
