import { MouseEvent, ReactNode } from "react";
import { ColorRing } from "react-loader-spinner";
interface ChildProp {
  loading: boolean;
  children: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  disabled?:boolean
}
export function NewLoadingButton({
  children,
  className,
  loading,
  type,
  onClick,
  disabled
}: ChildProp) {
  return (
    <button disabled={disabled}
      type={type ? type : "submit"} onClick={onClick}
      className={`w-full flex items-center justify-center h-10 bg-primary rounded-md font-semibold text-white text-[14px] ${
        loading && "pointer-events-none bg-primary/25"
      } ${className}`}
    >
      {children}
      {loading && (
        <ColorRing
          visible={true}
          height="20"
          width="20"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      )}
    </button>
  );
}
