import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="text-base text-white/60">
            Estrategia, contenido y automatización para crecer ventas con
            claridad.
          </p>
        </div>
        <div className="space-y-3 text-base text-white/70">
          <p className="font-semibold text-white">Contacto</p>
          <p>Email: hola@ipeakagency.com</p>
          <p>WhatsApp: +00 000 000 000</p>
          <div className="flex gap-3 text-white/60">
            <a
              href="#"
              className="transition hover:text-white"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="#"
              className="transition hover:text-white"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="transition hover:text-white"
              aria-label="Facebook"
            >
              Facebook
            </a>
          </div>
        </div>
        <div className="space-y-3 text-base text-white/70">
          <p className="font-semibold text-white">Legal</p>
          <div className="flex flex-col gap-2">
            <Link href="#" className="transition hover:text-white">
              Términos
            </Link>
            <Link href="#" className="transition hover:text-white">
              Privacidad
            </Link>
          </div>
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} iPeak Agency. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
