import { useState } from "react";

export default function Togglable(props) {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const unhide = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={hide}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={unhide}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
}
