import Link from "next/link";
import Logo from "@/components/Logo";

const navItems = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Clientes", href: "/#clientes" },
  { label: "Testimonios", href: "/#testimonios" },
  { label: "Planes", href: "/#planes" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="transition hover:opacity-90">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/servicios"
            className="hidden rounded-full border border-white/30 px-4 py-2 text-sm text-white/80 transition hover:border-white/60 hover:text-white sm:inline-flex"
          >
            Ver servicios
          </Link>
          <a
            href="/#contacto"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Agenda una llamada
          </a>
        </div>
      </div>
      <div className="border-t border-white/5 md:hidden">
        <div className="flex items-center gap-4 overflow-x-auto px-6 py-3 text-sm text-white/70">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
