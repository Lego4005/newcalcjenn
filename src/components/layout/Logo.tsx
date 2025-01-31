import Image from 'next/image';

interface LogoProps {
  isCollapsed?: boolean;
}

export default function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className="flex items-center p-4">
      <Image
        src="https://rocatitle.com/wp-content/uploads/2022/03/PNG-01_main_600px_wide_2.png"
        alt="Roca Title Logo"
        width={isCollapsed ? 48 : 160}
        height={isCollapsed ? 48 : 64}
        className="object-contain"
        style={{ height: 'auto' }}
        priority
      />
    </div>
  );
}