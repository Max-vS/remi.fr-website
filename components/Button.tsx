import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import React from "react";

const buttonVariants = tv({
  base: [
    // Button
    "text-[14px] select-none font-bold",
    "m-[6px] px-[6px] py-[3px]",
    "focus:outline focus:outline-[#6666CC] focus:outline-[2px]",

    // WindowUndepressable (fixed shadow syntax)
    "bg-[#DDDDDD]",
    "border border-black border-[1px]",
    "rounded-[6px]",
    "shadow-[inset_-1px_-1px_0px_#808080,inset_-2px_-2px_0px_#AAAAAA,inset_1px_1px_0px_#AAAAAA,inset_2px_2px_0px_#FFFFFF]",

    // WindowDepressable (fixed active state)
    "active:bg-[#808080]",
    "active:text-white",
    "active:shadow-[inset_-1px_-1px_0px_#808080,inset_-2px_-2px_0px_#393939,inset_1px_1px_0px_#202020,inset_2px_2px_0px_#393939]",

    // Disabled state
    "disabled:shadow-none",
    "disabled:bg-[#CCCCCC]",
    "disabled:border-[#808080]",
    "disabled:text-[#808080]",
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
      small: ["text-[7px]", "rounded-[3px]"],
    },
    shape: {
      rectangle: "",
      square: [
        "w-[48px] p-[12px]",
        "rounded-none",
        "aspect-square",
        "[&>img]:w-full",
      ],
    },
  },
  compoundVariants: [
    {
      shape: "square",
      size: "small",
      class: [
        "w-[24px] !important",
        "h-[24px] !important",
        "p-[3px]",
        "[&>img]:w-[90%]",
      ],
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
