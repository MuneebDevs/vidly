import React from "react";

const Like = props => {
  let classes = "btn fa fa-heart";
  if (!props.liked) classes += "-o";
  return <i onClick={props.onClick} className={classes} aria-hidden="true" />;
};

export default Like;
