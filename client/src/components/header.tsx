import React from "react";

type Props = {
  title: string;
  button?: React.ReactNode;
  isSmallText?: boolean;
};

export default function Header({ title, button, isSmallText = false }: Props) {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1 className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold`}>
        {title}
      </h1>
      {button}
    </div>
  );
}
