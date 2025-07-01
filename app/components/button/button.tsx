import React from "react";

const Button = ({ name, link }: { name: string; link: string }) => {
  return (
    <div>
      {" "}
      <a
        href={link}
        className=" bg-yellow/80 text-dark-blue font-bold hover:bg-yellow px-4 py-3 text-sm rounded-md"
      >
        {name}
      </a>
    </div>
  );
};

export default Button;
