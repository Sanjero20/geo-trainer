import Link from "next/link";
import Image from "next/image";

const githubLink = "https://github.com/sanjero20";

function Footer() {
  return (
    <footer className="pt-2 text-center text-primary/80">
      <div className="flex h-full items-center justify-center gap-1">
        Made with ❤️ by
        <Link
          href={githubLink}
          target="_blank"
          className="flex items-center gap-1"
        >
          <span className="hover:underline">Sanjero20</span>
          <Image
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            width={32}
            height={32}
            alt="github"
            className="opacity-80"
          />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
