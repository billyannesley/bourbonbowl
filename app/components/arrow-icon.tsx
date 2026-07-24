import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const iconProps = {
  "aria-hidden": true,
  className: "ui-icon",
  focusable: false,
  size: 18,
  strokeWidth: 1.75,
} as const;

export function ArrowIcon() {
  return <ArrowUpRight {...iconProps} />;
}

export function BackIcon() {
  return <ArrowLeft {...iconProps} />;
}

export function ForwardIcon() {
  return <ArrowRight {...iconProps} />;
}
