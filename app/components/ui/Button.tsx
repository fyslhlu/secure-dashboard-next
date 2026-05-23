type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
}: ButtonProps) {
  const baseClasses =
    "rounded-2xl px-5 py-3 text-sm font-semibold transition shadow-sm";

  const variantClasses = {
    primary: "bg-violet-600 text-white hover:bg-violet-700",
    secondary:
      "border border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}