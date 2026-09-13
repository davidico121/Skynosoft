import { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-margin-mobile md:px-margin-desktop ${className}`}
    >
      {children}
    </div>
  );
}
