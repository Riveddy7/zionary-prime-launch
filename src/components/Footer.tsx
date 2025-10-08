import { PiLinkedinLogo, PiEnvelope } from "react-icons/pi";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[hsl(var(--background-dark))] border-t border-white/10">
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-2xl font-bold text-[hsl(var(--text-primary))] mb-4">
              Zionary
            </h3>
            <p className="text-[hsl(var(--text-secondary))] font-light leading-relaxed">
              Consultora boutique de arquitectura de procesos y optimización
              operativa.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-[hsl(var(--text-primary))] font-semibold mb-4">
              Navegación
            </h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("case-study")}
                  className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors font-light"
                >
                  Caso de Estudio
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors font-light"
                >
                  Proceso
                </button>
              </li>
              <li>
                <a
                  href="/caso-estudio/itn"
                  className="text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors font-light"
                >
                  Caso ITN Completo
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-[hsl(var(--text-primary))] font-semibold mb-4">
              Contacto
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:eduardo@zionary.com"
                className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors font-light"
              >
                <PiEnvelope className="w-5 h-5" />
                eduardo@zionary.com
              </a>
              <a
                href="https://linkedin.com/company/zionary"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--accent))] transition-colors font-light"
              >
                <PiLinkedinLogo className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[hsl(var(--text-secondary))]/60 text-sm">
              © {new Date().getFullYear()} Zionary. Todos los derechos
              reservados.
            </p>
            <p className="text-[hsl(var(--text-secondary))] font-light text-center md:text-right max-w-md">
              Diseñamos los sistemas que construyen el futuro de tu empresa.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
