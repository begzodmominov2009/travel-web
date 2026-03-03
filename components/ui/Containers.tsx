import { childrenType } from "@/types/ChildrenType";
import React, { Children } from "react";

const Containers = ({ children, className }: childrenType) => {
  return <div className={`container mx-auto px-2 sm:px-0 2xl:px-33 ${className}`}>{children}</div>;
};

export default Containers;
