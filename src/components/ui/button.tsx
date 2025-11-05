import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wide ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-display",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-3 border-accent shadow-thick hover:shadow-thick-hover hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-soft active:translate-x-[2px] active:translate-y-[2px]",
        destructive: "bg-destructive text-destructive-foreground border-3 border-accent shadow-thick hover:shadow-thick-hover hover:translate-x-[-2px] hover:translate-y-[-2px]",
        outline: "border-4 border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground shadow-soft hover:shadow-thick",
        secondary: "bg-secondary text-secondary-foreground border-3 border-accent shadow-thick hover:shadow-thick-hover hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-soft active:translate-x-[2px] active:translate-y-[2px]",
        ghost: "hover:bg-muted hover:text-foreground border-2 border-transparent hover:border-accent",
        link: "text-primary underline-offset-4 hover:underline font-bold",
        hero: "bg-gradient-hero text-primary-foreground border-4 border-accent shadow-thick hover:shadow-thick-hover hover:translate-x-[-4px] hover:translate-y-[-4px] font-bold text-lg",
        accent: "bg-accent text-accent-foreground border-3 border-primary shadow-thick hover:shadow-thick-hover hover:translate-x-[-2px] hover:translate-y-[-2px]",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-xs",
        lg: "h-14 px-10 py-4 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
