import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Latex from "react-latex";

import "./styles.css";

function App() {
  const [expression, setExpression] = useState(" ");
  return (
    <div className="App">
      <h1>Math Editor and Viewer Example</h1>
      <MathInput onChange={ev => setExpression(ev.target.latex())} />
      <div style={{ margin: 20 }} />
      <Latex>{`View: $${expression}$`}</Latex>
    </div>
  );
}

const MathInput = ({ onChange, ...rest }) => {
  const ref = useRef();
  useEffect(() => {
    Guppy.use_osk(new GuppyOSK({ goto_tab: "arithmetic", attach: "focus" }));
    const guppy = new Guppy(ref.current);
    guppy.event("change", onChange);
  }, []);

  return <div ref={ref} {...rest} />;
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
