import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import React from "react";

const buttonVariants = tv({
  base: [
    // Button
    "text-sm select-none font-bold",
    "m-1.5 px-1.5 py-0.5",
    "focus:outline focus:outline-outline-1 focus:outline-2",

    // WindowUndepressable (fixed shadow syntax)
    "bg-system-2",
    "border border-black",
    "rounded-md",
    "shadow-[inset_-1px_-1px_0px_#808080,inset_-2px_-2px_0px_#AAAAAA,inset_1px_1px_0px_#AAAAAA,inset_2px_2px_0px_#FFFFFF]",

    // WindowDepressable (fixed active state)
    "active:bg-system-5",
    "active:text-white",
    "active:shadow-[inset_-1px_-1px_0px_#808080,inset_-2px_-2px_0px_#393939,inset_1px_1px_0px_#202020,inset_2px_2px_0px_#393939]",

    // Disabled state
    "disabled:shadow-none",
    "disabled:bg-system-3",
    "disabled:border-system-5",
    "disabled:text-system-5",
    "disabled:cursor-not-allowed",
  ],
  variants: {
    variant: {
      default: [
        "shadow-[0_0_0_1px_#AAAAAA,_0_0_0_2px_#DDDDDD,_0_0_0_3px_#000000,_inset_-1px_-1px_0_0_#808080,_inset_1px_1px_0_0_#393939]",
        "active:shadow-[inset_-1px_-1px_#202020,_inset_-2px_-2px_#393939,_inset_1px_1px_#202020,_inset_2px_2px_#393939,_0_0_0_1px_#AAAAAA,_0_0_0_2px_#000000,_inset_-2px_-2px_0_0_#808080,_inset_1px_1px_0_0_#393939]",
        "active:disabled:shadow-none",
      ],
      normal: "",
    },
    size: {
      medium: "",
      small: ["text-xs", "rounded-xs"],
    },
    shape: {
      rectangle: "",
      square: ["w-12 p-3", "rounded-none", "aspect-square", "[&>img]:w-full"],
    },
  },
  compoundVariants: [
    {
      shape: "square",
      size: "small",
      class: ["w-6 !important", "h-6 !important", "p-1", "[&>img]:w-[90%]"],
    },
  ],
  defaultVariants: {
    variant: "normal",
    size: "medium",
    shape: "rectangle",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
            shape,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

export { Button, buttonVariants };
