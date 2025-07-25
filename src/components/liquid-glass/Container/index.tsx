import { cn } from "../../cn";

const Container = ({
  children,
  className,
  contentParentClassName = "",
}: any) => {
  return (
    <div
      className={cn(
        "relative p-4 rounded-3xl backdrop-blur-xl bg-gradient-to-r from-white/8 via-white/12 to-white/8 border-t border-white/25 border-l border-white/20 border-r border-white/15 border-b border-white/10 shadow-2xl",
        className
      )}
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-purple-400/10 opacity-30"></div>
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      <div className={cn("relative z-10", contentParentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default Container;
