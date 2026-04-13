import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { StitchPageFrame } from "@/components/common/stitch-page-frame";
import { SectionWave } from "@/components/stitch/section-wave";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CaseStudiesProvenScalePage() {
  return (
    <StitchPageFrame signature="case-studies-proven-scale" className="bg-surface text-on-surface">
      <main className="pt-32 pb-20">
        <SectionWave profile="hero" className="max-w-7xl mx-auto px-12 mb-24 grid grid-cols-12 gap-8 items-end">
          {({ itemVariants }) => (
            <>
              <motion.div variants={itemVariants} className="col-span-12 md:col-span-8">
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-tertiary mb-4 block font-semibold">
                  Operational Excellence
                </span>
                <h1 className="text-6xl font-headline font-bold tracking-tighter leading-[1.1] text-on-surface">
                  Precision in practice:
                  <br />
                  Client transformations.
                </h1>
                <p className="mt-8 text-xl text-on-surface-variant font-light max-w-xl leading-relaxed">
                  A selection of case studies demonstrating how RASA&apos;s standardization
                  protocols deliver measurable operational gravity and sustainable growth for elite
                  hospitality brands.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="col-span-12 md:col-span-4 flex justify-end">
                <div className="text-right border-l border-outline-variant pl-8">
                  <div className="text-4xl font-headline font-bold text-primary">24%</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                    Avg. Margin Increase
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </SectionWave>

        <div className="max-w-7xl mx-auto px-12 space-y-12">
          <SectionWave profile="editorial" className="bg-surface-container-lowest grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-sm">
            {({ itemVariants }) => (
              <>
                <motion.div variants={itemVariants} className="relative h-[500px] md:h-auto overflow-hidden">
                  <img
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAP4Uu-xyLhAh3EFBLfk0xoBh2r49YrUsEkxETfkqfj9-uRj5FjIB5kvZHHQo8J4BGFe2mjKGxEAnfRUOnhJ92j0VhZ_PFEqqHXnTDojpyh4Nn9u9CVfMuLDHUdZeaiIGvixojUu0lYZogsa6yS-1c7abxYqdzniIhUWFv09qJOIMp7QzzNXxXSK82ji8leSEKz-p381l_fMbNYt1rWmA2A_yjhoMXEjoKPbuNEjPsc_xV40lNG4ewJDsRqadG5bpnbzGCaM2Vzv0WT"
                    alt="L'Avenue Roasters interior"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <Badge>Standardized</Badge>
                    <span className="text-outline text-[10px] font-bold uppercase tracking-widest">
                      Case Study 01
                    </span>
                  </div>
                  <h2 className="text-4xl font-headline font-bold tracking-tight mb-6">
                    L&apos;Avenue Roasters
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed mb-10">
                    Restructuring a multi-location roastery to eliminate workflow redundancies and
                    unify brand touchpoints across six metropolitan hubs.
                  </p>
                  <div className="grid grid-cols-2 gap-8 py-8 border-y border-outline-variant/20 mb-10">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-outline block mb-2">
                        Before
                      </span>
                      <div className="text-xl font-headline text-error font-medium">18 min avg. ticket</div>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-outline block mb-2">
                        After RASA
                      </span>
                      <div className="text-xl font-headline text-on-surface font-medium">
                        6.5 min avg. ticket
                      </div>
                    </div>
                  </div>
                  <button className="self-start font-headline uppercase text-[11px] font-bold tracking-widest flex items-center gap-2 group">
                    Full Transformation Report
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </>
            )}
          </SectionWave>

          <SectionWave profile="grid" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {({ itemVariants }) => (
              <>
                <motion.article
                  variants={itemVariants}
                  className="bg-surface-container-low p-10 flex flex-col h-full hover:bg-surface-container-high transition-colors"
                >
                  <div className="mb-auto">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-tertiary mb-4">
                      Workflow Systems
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-4">The Nordic Pantry</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Systematizing waste management and inventory for a high-volume artisan bakery.
                    </p>
                  </div>
                  <div className="mt-12">
                    <div className="text-3xl font-headline font-bold text-primary mb-1">32%</div>
                    <div className="text-[10px] uppercase tracking-widest text-outline">
                      Reduction in food waste
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-outline-variant/30 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest">Stockholm, SE</span>
                    <ArrowUpRight className="h-4 w-4 text-outline" />
                  </div>
                </motion.article>

                <motion.article
                  variants={itemVariants}
                  className="bg-surface-container md:col-span-2 grid grid-cols-1 md:grid-cols-5 overflow-hidden"
                >
                  <div className="md:col-span-2 p-10 flex flex-col justify-center">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-tertiary mb-4">
                      Identity &amp; Operations
                    </div>
                    <h3 className="text-2xl font-headline font-bold mb-4">Origin One</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Aligning kitchen operational speed with a premium specialty coffee brand
                      promise.
                    </p>
                    <div className="mt-8">
                      <div className="text-3xl font-headline font-bold text-primary mb-1">+$14.2k</div>
                      <div className="text-[10px] uppercase tracking-widest text-outline">
                        Monthly recurring revenue delta
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3 relative h-64 md:h-full">
                    <img
                      className="absolute inset-0 w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKVKXyQDVXCPhskaIGMohGNREmYwzQp1jjDqjfbajMwBqtiNHxMujsmytaRv-0GRd3YmPA9UsLXkrlFVMtkD0zoIc0oRBPCp_SDUfJRQkL4oeu4kGRHIyfsDcWqtVtet8ACy5DUg-_np_5w2OXOgwec1MGD5w402A8boh727sATmGjk8C0AUPdotF_ihP6qb6hfHtiG7nsb83NUteRBjgP8I05TOwc_Bocsa1dHFHbwWAIjr2cWyF5EkOy1GGxevO779JAzahmpIs9"
                      alt="Origin One espresso line"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </motion.article>
              </>
            )}
          </SectionWave>

          <SectionWave profile="cta" className="bg-inverse-surface text-on-surface py-24 px-16 relative overflow-hidden">
            {({ itemVariants }) => (
              <>
                <div className="max-w-3xl relative z-10">
                  <motion.h2
                    variants={itemVariants}
                    className="text-white text-5xl font-headline font-bold tracking-tighter mb-8"
                  >
                    The &quot;No-Variance"
                    <br />
                    Commitment.
                  </motion.h2>
                  <motion.p variants={itemVariants} className="text-stone-400 text-lg leading-relaxed mb-12">
                    Standardization is not about restriction; it is about creating a baseline of
                    excellence that allows creativity to flourish without compromising
                    profitability. Every case study here represents a custom-engineered operational
                    manual.
                  </motion.p>
                  <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                    <div>
                      <div className="text-white text-2xl font-headline font-bold mb-2">01</div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                        Audit &amp; Diagnosis
                      </div>
                    </div>
                    <div>
                      <div className="text-white text-2xl font-headline font-bold mb-2">02</div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                        Structural Blueprint
                      </div>
                    </div>
                    <div>
                      <div className="text-white text-2xl font-headline font-bold mb-2">03</div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">
                        Execution &amp; Scale
                      </div>
                    </div>
                  </motion.div>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                  <div className="w-full h-full border-l border-white/20 ml-12" />
                </div>
              </>
            )}
          </SectionWave>

          <SectionWave profile="grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {({ itemVariants }) => (
              <>
                <motion.article
                  variants={itemVariants}
                  className="bg-surface-container-lowest p-16 shadow-sm border border-outline-variant/10"
                >
                  <div className="flex flex-col gap-8">
                    <div className="flex justify-between items-start">
                      <h3 className="text-3xl font-headline font-bold">Terra &amp; Grain</h3>
                      <div className="text-[10px] font-bold uppercase tracking-widest border border-outline px-2 py-1">
                        2023
                      </div>
                    </div>
                    <p className="text-on-surface-variant">
                      Implementing centralized commissary kitchen protocols for a boutique 3-unit
                      group in London.
                    </p>
                    <div className="flex gap-12 mt-4">
                      <div>
                        <span className="block text-4xl font-headline font-bold text-tertiary">19%</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-outline">
                          Labor Efficiency Gain
                        </span>
                      </div>
                      <div>
                        <span className="block text-4xl font-headline font-bold text-tertiary">100%</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-outline">
                          Recipe Consistency
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>

                <motion.article variants={itemVariants} className="bg-surface-container-low p-16">
                  <div className="flex flex-col gap-8">
                    <div className="flex justify-between items-start">
                      <h3 className="text-3xl font-headline font-bold">Velo Coffee</h3>
                      <div className="text-[10px] font-bold uppercase tracking-widest border border-outline px-2 py-1">
                        2026
                      </div>
                    </div>
                    <p className="text-on-surface-variant">
                      Complete operational teardown and rebuild for a distressed venture-backed
                      chain.
                    </p>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-white/50 p-4 flex justify-between items-center">
                        <span className="text-xs uppercase tracking-widest font-semibold">
                          Net Profitability
                        </span>
                        <span className="font-headline font-bold text-on-surface">
                          From -4% to +12%
                        </span>
                      </div>
                      <div className="bg-white/50 p-4 flex justify-between items-center">
                        <span className="text-xs uppercase tracking-widest font-semibold">
                          Staff Turnover
                        </span>
                        <span className="font-headline font-bold text-on-surface">65% reduction</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </>
            )}
          </SectionWave>

          <SectionWave profile="cta" className="max-w-7xl mx-auto px-12 mt-32 text-center">
            {({ itemVariants }) => (
              <div className="bg-surface-container py-24">
                <motion.h2 variants={itemVariants} className="text-4xl font-headline font-bold mb-6">
                  Ready to standardize?
                </motion.h2>
                <motion.p variants={itemVariants} className="text-on-surface-variant max-w-xl mx-auto mb-10">
                  We are currently accepting new consultancy projects for Q3 and Q4 2026. Let&apos;s
                  discuss your operational architecture.
                </motion.p>
                <motion.div variants={itemVariants}>
                  <Button variant="inverse" size="lg" className="px-12">
                    Request a Consultation
                  </Button>
                </motion.div>
              </div>
            )}
          </SectionWave>
        </div>
      </main>
    </StitchPageFrame>
  );
}
