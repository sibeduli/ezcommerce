import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 48, className = "" }: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt="EZCommerce"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

export function LogoWithText({ size = 32, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo size={size} />
      <span className="text-foreground text-xl font-bold">
        <span className="text-primary">ez</span> commerce
      </span>
    </div>
  );
}
