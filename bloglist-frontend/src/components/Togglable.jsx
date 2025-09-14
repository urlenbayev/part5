import { forwardRef } from "react";
import { useState, useImperativeHandle } from "react";

function Togglable(props, ref) {
  const [visible, setVisible] = useState(false);

  const hide = { display: visible ? "none" : "" };
  const unhide = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

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
export default forwardRef(Togglable);
