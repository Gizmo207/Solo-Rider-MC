import { cn } from "../../lib/utils";
import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-5 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const variantClasses = {
  default: "bg-solo-red text-white hover:bg-red-700",
  outline: "border border-solo-red text-solo-red bg-transparent hover:bg-solo-red hover:text-white",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "rounded font-semibold transition flex items-center justify-center",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
export default Button;

// Utility function for classnames
