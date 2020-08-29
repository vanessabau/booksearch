import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeleteBtn(props) {
  return (
    <button
      type="button"
      className="btn btn-danger btn-sm m-4"
      {...props}
      role="button"
      tabIndex="0"
    >
      Delete
    </button>
  );
}

export default DeleteBtn;

{
  /* <span className="delete-btn" {...props} role="button" tabIndex="0">
      ✗
    </span> */
}
