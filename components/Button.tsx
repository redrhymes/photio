import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: "light" | "dark" | "outline" | "champagne";
  arrow?: boolean;
  arrowDirection?: "right" | "up-right";
};

export function Button({ href, children, variant = "outline", arrow = true, arrowDirection = "up-right", className = "", ...props }: Props) {
  const styles = [
    "button-pill",
    variant === "light" && "button-pill-solid",
    variant === "dark" && "button-pill-dark",
    variant === "champagne" && "button-pill-champagne",
  ].filter(Boolean).join(" ");
  const classNames = `${styles} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (arrowDirection === "right"
        ? <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
        : <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />)}
    </>
  );

  if (/^(https?:\/\/|mailto:|tel:)/i.test(href)) {
    return <a href={href} className={classNames} data-cursor-label="View" {...props}>{content}</a>;
  }

  return (
    <Link href={href} className={classNames} data-cursor-label="View" {...props}>
      {content}
    </Link>
  );
}
