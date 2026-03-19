import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import logo from "@/assets/logo-upid.png";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Metodologia", href: "#metodologia" },
  { label: "Serviços", href: "#servicos" },
  { label: "Portfólio", href: "#portfolio" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      {/* Top bar */}
      <div className="border-b border-border/30">
        <div className="container mx-auto flex items-center justify-end gap-6 py-2 px-4 text-xs text-muted-foreground">
          <a href="https://wa.me/5532984941759" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Phone className="w-3 h-3" /> (32) 98494-1759
          </a>
          <a href="mailto:comercial@upid.tec.br" className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <Mail className="w-3 h-3" /> comercial@upid.tec.br
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <a href="#inicio">
          <img src={logo} alt="UP iD" className="h-10" />
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://wa.me/5532984941759"
          className="hidden md:inline-flex gradient-green text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
        >
          Falar com Especialista
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border/30 pb-4">
          <nav className="flex flex-col items-center gap-4 pt-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://wa.me/5532984941759"
              className="gradient-green text-primary-foreground font-semibold text-sm px-5 py-2.5 rounded-lg"
            >
              Falar com Especialista
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
