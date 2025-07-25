import { cn } from "../../cn";

const Button = ({
  children,
  className,
  bgClassName = "",
  rounded = false,
  onClick,
  disabled,
}: any) => {
  return (
    <button
      className={cn(
        "backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg hover:bg-white/20 hover:cursor-pointer transition-all duration-200 flex items-center justify-center group",
        rounded ? "rounded-full p-1" : "px-2 py-1 rounded-sm",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-150",
          rounded ? "rounded-full" : "",
          bgClassName
        )}
      ></div>
      {children}
    </button>
  );
};

export default Button;
