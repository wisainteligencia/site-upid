import {Button} from "@/components/ui/button"
import {ExternalLink} from "lucide-react"
import logoWisa from "@/assets/logo-wisa.png"

const HubWisa = () => {
  return (
    <>
      {/* Hub WiSa Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          <div
            className="rounded-2xl p-8 md:p-12 text-center border shadow-lg"
            style={{
              background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)",
              borderColor: "hsl(var(--border))",
            }}
          >
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full flex items-center justify-center bg-white shadow-lg">
                <img src={logoWisa} alt="Hub WiSa" className="w-[110px] h-[85px] object-contain" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Conheça o Hub WiSa
            </h3>
            <p className="text-base mb-8 max-w-2xl mx-auto text-muted-foreground">
              Somos um ecossistema de inteligência B2B focado em crescimento escalável. 
              Unimos gestão, vendas, tecnologia e educação corporativa para acabar com o seu retrabalho operacional.
            </p>
            <Button size="lg" asChild className="gradient-green text-primary-foreground text-base px-8 py-6 rounded-lg font-semibold">
              <a href="https://hubwisa.com.br" target="_blank" rel="noopener noreferrer">
                Acessar Hub WiSa
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HubWisa;