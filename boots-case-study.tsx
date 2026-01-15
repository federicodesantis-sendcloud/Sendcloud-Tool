import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function BootsCaseStudy() {
  return (
    <div className="min-h-screen bg-[#0a1e4d] text-white p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Main content section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left column - Headline and CTA */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Augusto Abbigliamento investe 60€ e ne fattura 1890€ con i whatsapp di{" "}
              <span className="text-[#3db4d2]">Sendcloud</span>
            </h1>
            <div className="mt-6">{/* CTA rimossa */}</div>
          </div>

          {/* Right column - Image and stats */}
          <div>
            <Card className="bg-[#b3e0e8] text-[#0a1e4d] rounded-lg overflow-hidden">
              {/* Image section */}
              <div className="w-full">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zYxZ7bi0RdQ23yE4KBc3TiaL4yLqaJ.png"
                  alt="Abbigliamento sportivo in montagna"
                  width={600}
                  height={400}
                  className="w-full object-cover"
                />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 p-6">
                {/* Sector */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#0a1e4d]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase font-medium">SETTORE</p>
                    <p className="font-medium">Abbigliamento Sportivo</p>
                  </div>
                </div>

                {/* Size */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#0a1e4d]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                      <path d="M12 3a6 6 0 0 1-9 9 9 9 0 0 0 9 9Z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase font-medium">DIMENSIONI</p>
                    <p className="font-medium">700 ordini/mese</p>
                  </div>
                </div>

                {/* Region */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#0a1e4d]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase font-medium">REGIONE</p>
                    <p className="font-medium">Italia</p>
                  </div>
                </div>

                {/* Platform */}
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#0a1e4d]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12.5 2h-1V1h1zm0 21h-1v1h1zm9.5-10.5v-1h1v1zM2 11.5v-1H1v1zm15.5-5.5h-1V5h1zm0 13h-1v1h1zm-11-13v1H5v-1zm0 13v1H5v-1z"></path>
                      <path d="M7.5 8a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0z"></path>
                      <path d="M7.5 16a4.5 4.5 0 1 0 9 0 4.5 4.5 0 1 0-9 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm uppercase font-medium">PIATTAFORMA</p>
                    <p className="font-medium">WooCommerce</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Stats and About section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Stats column */}
          <div className="lg:col-span-1 space-y-12">
            <div className="border-l-4 border-[#3db4d2] pl-4">
              <div className="text-5xl font-bold text-white">€ 60</div>
              <div className="text-[#3db4d2] text-sm mt-2">BUDGET SPESO</div>
            </div>

            <div className="border-l-4 border-[#3db4d2] pl-4">
              <div className="text-5xl font-bold text-white">€ 1890</div>
              <div className="text-[#3db4d2] text-sm mt-2">FATTURATO</div>
            </div>

            <div className="border-l-4 border-[#3db4d2] pl-4">
              <div className="text-5xl font-bold text-white">+ 27</div>
              <div className="text-[#3db4d2] text-sm mt-2">VENDITE</div>
            </div>

            <div className="border-l-4 border-[#3db4d2] pl-4">
              <div className="text-5xl font-bold text-white">3050%</div>
              <div className="text-[#3db4d2] text-sm mt-2">ROI</div>
            </div>
          </div>

          {/* About section */}
          <div className="lg:col-span-3">
            <Card className="bg-[#0c2a6a] p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-[#3db4d2] mb-6">Chi è Augusto Abbigliamento</h2>
              <p className="text-white leading-relaxed">
                Augusto Abbigliamento è un negozio di abbigliamento sportivo italiano specializzato in attrezzature per
                l'outdoor e l'escursionismo. Utilizzando i servizi di Sendcloud, sono riusciti a trasformare un piccolo
                investimento in un notevole ritorno economico, dimostrando l'efficacia dei canali di messaggistica
                diretta per il commercio al dettaglio nel settore sportivo.
              </p>
            </Card>
          </div>
        </div>

        {/* Tracking section */}
        <div className="mt-16">
          <Card className="bg-[#0a1e4d] border-[#3db4d2] border-2 p-8 rounded-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left column - Tracking interface mockup */}
              <div>
                <div className="bg-[#0a1e4d] rounded-lg overflow-hidden shadow-lg">
                  {/* Header with logo and navigation */}
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div className="w-24">
                        <svg viewBox="0 0 100 30" className="text-[#0a1e4d]">
                          <path
                            d="M23.3,7.3c-0.4-0.1-0.8-0.2-1.3-0.2c-3.2,0-5.8,2.7-5.8,5.9c0,3.2,2.6,5.9,5.8,5.9c0.4,0,0.9-0.1,1.3-0.2 c-3.8,0.7-7.1-2.3-7.1-5.7C16.2,9.6,19.5,6.6,23.3,7.3z"
                            fill="currentColor"
                          />
                          <path
                            d="M34.8,7.3c-0.4-0.1-0.8-0.2-1.3-0.2c-3.2,0-5.8,2.7-5.8,5.9c0,3.2,2.6,5.9,5.8,5.9c0.4,0,0.9-0.1,1.3-0.2 c-3.8,0.7-7.1-2.3-7.1-5.7C27.7,9.6,31,6.6,34.8,7.3z"
                            fill="currentColor"
                          />
                          <path
                            d="M46.3,7.3c-0.4-0.1-0.8-0.2-1.3-0.2c-3.2,0-5.8,2.7-5.8,5.9c0,3.2,2.6,5.9,5.8,5.9c0.4,0,0.9-0.1,1.3-0.2 c-3.8,0.7-7.1-2.3-7.1-5.7C39.2,9.6,42.5,6.6,46.3,7.3z"
                            fill="currentColor"
                          />
                          <path
                            d="M57.8,7.3c-0.4-0.1-0.8-0.2-1.3-0.2c-3.2,0-5.8,2.7-5.8,5.9c0,3.2,2.6,5.9,5.8,5.9c0.4,0,0.9-0.1,1.3-0.2 c-3.8,0.7-7.1-2.3-7.1-5.7C50.7,9.6,54,6.6,57.8,7.3z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div className="flex space-x-6 text-sm text-white">
                        <span>Shop</span>
                        <span>FAQ</span>
                        <span>Contact Us</span>
                      </div>
                    </div>
                  </div>

                  {/* Tracking status */}
                  <div className="p-6 bg-[#0c2a6a]">
                    <div className="mb-1 text-xs text-white/70 uppercase">CURRENT STATUS</div>
                    <h3 className="text-xl font-bold text-white">In Transit</h3>
                    <p className="text-sm text-white/80">Estimated Delivery: Tue, 19 April 2022</p>
                  </div>

                  {/* Product images */}
                  <div className="p-4 flex space-x-2">
                    <div className="flex-1 relative">
                      <div className="flex items-center text-xs mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-4 h-4 mr-1 text-pink-500"
                        >
                          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"></path>
                          <path d="M17.5 6.5h.01"></path>
                        </svg>
                        @augustoabbigliamento
                      </div>
                      <Image
                        src="/placeholder.svg?key=hiking-boots"
                        alt="Scarponi da trekking"
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <Image
                        src="/placeholder.svg?key=outdoor-jacket"
                        alt="Giacca outdoor"
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover rounded"
                      />
                      <Button
                        className="absolute bottom-2 right-2 bg-[#0a1e4d] hover:bg-[#0a1e4d]/90 text-white text-xs py-1 px-3"
                        size="sm"
                      >
                        SHOP NOW
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Chart and text */}
              <div>
                <div className="flex items-end h-32 mb-6 justify-center">
                  <div className="w-16 h-24 bg-[#3db4d2] rounded-md mx-2"></div>
                  <div className="w-16 h-32 bg-[#3db4d2] rounded-md mx-2"></div>
                  <div className="w-16 h-40 bg-[#3db4d2] rounded-md mx-2"></div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  WhatsApp Business <span className="text-[#3db4d2]">per aumentare le vendite</span>
                </h2>
                <p className="text-white leading-relaxed">
                  "Abbiamo iniziato a utilizzare Sendcloud per gestire le nostre comunicazioni WhatsApp con i clienti.
                  Con un investimento minimo di soli 60€, siamo riusciti a generare 1890€ di fatturato in un solo mese.
                  La piattaforma ci ha permesso di inviare messaggi personalizzati, promozioni e aggiornamenti
                  direttamente ai nostri clienti, risultando in 27 vendite aggiuntive che non avremmo ottenuto
                  altrimenti. Il ROI del 3050% parla da sé - questa è stata una delle nostre strategie di marketing più
                  efficaci."
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
