import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface NavigationItemType extends HTMLAttributes<HTMLLIElement> {
  title: string;
  image?: string;
  href?: string;
}

const NavigationItem = ({ title, image, href, className, ...props }: NavigationItemType) => {
  const content = (
    <>
      {image && <Image src={image} alt={title} width={16} height={16} />}
      <span>{title}</span>
    </>
  );

  return href ? (
    <Link href={href}>
      <li className={cn("flex flex-row items-center flex-wrap justify-between hover:text-white hover:bg-theme-4 py-0.5 px-1.5 gap-1", className)} {...props}>
        {content}
      </li>
    </Link>
  ) : (
    <li className={cn("flex flex-row items-center flex-wrap justify-between hover:text-white hover:bg-theme-4 py-0.5 px-1.5 gap-1", className)} {...props}>
      {content}
    </li>
  );
};

export default NavigationItem;
