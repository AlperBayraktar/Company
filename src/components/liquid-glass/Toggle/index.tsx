const Toggle = ({ isChecked, setIsChecked, disabled = false }: any) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => !disabled && setIsChecked(!isChecked)}
        disabled={disabled}
        className={`
        relative w-12 h-6 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-lg
        ${
          isChecked
            ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 border-blue-300/40"
            : "bg-white/10 border-white/25"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      >
        <div
          className={`
        absolute inset-0 rounded-full transition-opacity duration-300
        ${
          isChecked
            ? "bg-gradient-to-br from-white/20 to-transparent opacity-60"
            : "bg-gradient-to-br from-white/15 to-transparent opacity-40"
        }
      `}
        ></div>
        <div
          className={`
        absolute top-0.25 transition-all duration-300 w-5 h-5 rounded-full backdrop-blur-lg shadow-lg
        ${
          isChecked
            ? `left-6 bg-gradient-to-br from-white/90 to-white/70 border border-white/30`
            : "left-0.5 bg-gradient-to-br from-white/70 to-white/50 border border-white/20"
        }
      `}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-transparent to-white/30 opacity-60"></div>
        </div>
      </button>
    </div>
  );
};

export default Toggle;
