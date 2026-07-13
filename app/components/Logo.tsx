import Image from "next/image";

/* Weißes Logo im Dark Mode, Navy-Logo im Light Mode (CSS-Umschaltung via .dark-only/.light-only) */
export function Logo({
  className = "h-[22px] w-auto",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <>
      <Image
        src="/media/logo-white.png"
        alt="Fortis"
        width={92}
        height={26}
        priority={priority}
        className={`dark-only ${className}`}
      />
      <Image
        src="/media/logo-navy.png"
        alt="Fortis"
        width={92}
        height={26}
        priority={priority}
        className={`light-only ${className}`}
      />
    </>
  );
}
