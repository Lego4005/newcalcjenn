import Image from 'next/image';

interface LogoProps {
  isCollapsed?: boolean;
}

export default function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className="flex items-center p-4">
      <Image
        src="/roca-logo-new.png"
        alt="Roca Title Logo"
        width={isCollapsed ? 48 : 160}
        height={isCollapsed ? 48 : 64}
        className="object-contain"
        priority
      />
    </div>
  );
} 