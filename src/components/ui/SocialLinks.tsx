import { InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { EASE, FOCUS } from "@/components/ui/page-kit";

const links = [
  {
    href: "https://www.linkedin.com/in/david-owoeye",
    label: "David Owoeye on LinkedIn",
    icon: LinkedinLogo,
  },
  {
    href: "https://www.instagram.com/davidowoeye_",
    label: "David Owoeye on Instagram",
    icon: InstagramLogo,
  },
];

/** The two icon links next to David's name, used on every founder sign-off across the site. */
export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors duration-300 ${EASE} hover:text-primary-soft ${FOCUS}`}
        >
          <link.icon size={20} weight="fill" aria-hidden />
        </a>
      ))}
    </div>
  );
}
