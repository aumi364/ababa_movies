import * as React from "react";

export const FvrtIcon = ({
  height = "24px",
  width = "24px",
  color = "black",
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={width}
    viewBox="0 0 30 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.6687 23.19C-0.331346 14.97 -1.47134 6.31999 2.96866 2.18999C6.96866 -1.55001 14.1187 1.01999 14.8587 6.43999C15.7187 1.03999 22.9387 -1.37001 26.8587 2.43999C31.1887 6.67999 29.8787 15.3 14.6687 23.19Z" />
  </svg>
);
