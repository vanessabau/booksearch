import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <button
      type="button"
      className="btn btn-warning btn-sm m-4"
      {...props}
      role="button"
      tabIndex="0"
    >
      Save
    </button>
  );
}

export default SaveBtn;
