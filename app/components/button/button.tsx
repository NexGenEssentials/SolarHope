import React from "react";

const Button = ({
  name,
  link,
  external = false,
}: {
  name: string;
  link: string;
  external?: boolean;
}) => {
  return (
    <div>
      {" "}
      <a
        href={link}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className=" bg-yellow/80 text-dark-blue font-bold hover:bg-yellow px-4 py-3 text-sm rounded-md"
      >
        {name}
      </a>
    </div>
  );
};

export default Button;
