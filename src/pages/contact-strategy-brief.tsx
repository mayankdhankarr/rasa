import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Building2, LoaderCircle, Mail, MessageSquare, Phone, UserRound } from "lucide-react";

import { SectionWave } from "@/components/stitch/section-wave";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StitchPageFrame } from "@/components/common/stitch-page-frame";
import { useContactBriefForm } from "@/hooks/use-contact-brief-form";
import { cn } from "@/lib/utils";

const fieldLabelClassName =
  "font-label text-[11px] uppercase tracking-widest text-on-surface-variant font-semibold";

const fieldInputClassName =
  "h-14 rounded-md border border-b-0 border-outline-variant/45 bg-surface-container-lowest/90 px-4 pr-12 text-[15px] text-on-surface placeholder:text-outline/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-200 focus:border-primary focus:bg-surface-container-lowest focus:shadow-[0_0_0_4px_rgba(95,94,94,0.12)]";

const fieldTextareaClassName =
  "min-h-[170px] rounded-md border border-b-0 border-outline-variant/45 bg-surface-container-lowest/90 px-4 py-4 text-[15px] text-on-surface placeholder:text-outline/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-200 focus:border-primary focus:bg-surface-container-lowest focus:shadow-[0_0_0_4px_rgba(95,94,94,0.12)]";

const fieldErrorClassName =
  "border-error/70 focus:border-error focus:shadow-[0_0_0_4px_rgba(159,64,61,0.16)]";

export function ContactStrategyBriefPage() {
  const {
    register,
    onSubmit,
    formState: { errors },
    isPending,
    submissionState,
  } = useContactBriefForm();

  return (
    <StitchPageFrame signature="contact-strategy-brief" className="bg-surface text-on-surface font-body antialiased">
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-12">
          <SectionWave profile="hero" className="grid grid-cols-12 gap-8 mb-20">
            {({ itemVariants }) => (
              <motion.div variants={itemVariants} className="col-span-12 md:col-span-7">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-tertiary font-bold mb-4 block">
                  Strategic Inquiry
                </span>
                <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-none text-on-surface mb-8">
                  Elevate your operational
                  <br />
                  <span className="text-outline">architecture.</span>
                </h1>
                <p className="font-body text-xl text-on-surface-variant leading-relaxed max-w-xl">
                  Connect with our consultants to discuss bespoke scaling strategies and precision
                  management frameworks.
                </p>
              </motion.div>
            )}
          </SectionWave>

          <SectionWave profile="grid" className="grid grid-cols-12 gap-16 items-start">
            {({ itemVariants }) => (
              <>
                <motion.div variants={itemVariants} className="col-span-12 lg:col-span-7">
                  <div className="relative overflow-hidden border border-outline-variant/35 bg-gradient-to-br from-surface-container-lowest via-surface-container-low to-surface-container-lowest p-8 md:p-12 shadow-[0px_24px_55px_rgba(45,52,53,0.08)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-tertiary/50 via-primary/60 to-tertiary/50" />

                    <form
                      method="post"
                      action="/contact/strategy-brief"
                      onSubmit={onSubmit}
                      className="space-y-8"
                      noValidate
                    >
                      <div className="hidden" aria-hidden="true">
                        <label htmlFor="website">Website</label>
                        <input
                          id="website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div className="border-b border-outline-variant/25 pb-6">
                        <span className="font-label text-[10px] uppercase tracking-[0.18em] text-tertiary font-bold block mb-2">
                          Contact Brief Form
                        </span>
                        <h3 className="font-headline text-2xl md:text-3xl font-extrabold tracking-tight text-on-surface mb-2">
                          Share your growth objectives
                        </h3>
                        <p className="text-sm text-on-surface-variant leading-relaxed max-w-xl">
                          Provide a high-level overview and our consulting team will get back to
                          you within one business day.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                          <label className={fieldLabelClassName}>
                            Name
                          </label>
                          <div className="relative">
                            <Input
                              autoComplete="name"
                              placeholder="Your full name"
                              className={cn(fieldInputClassName, errors.name ? fieldErrorClassName : null)}
                              {...register("name")}
                            />
                            <UserRound className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-outline/75" />
                          </div>
                          {errors.name ? (
                            <p className="text-xs font-medium tracking-[0.04em] text-error">{errors.name.message}</p>
                          ) : null}
                        </div>
                        <div className="space-y-2">
                          <label className={fieldLabelClassName}>
                            Business Name
                          </label>
                          <div className="relative">
                            <Input
                              autoComplete="organization"
                              placeholder="Entity or Organization"
                              className={cn(
                                fieldInputClassName,
                                errors.businessName ? fieldErrorClassName : null
                              )}
                              {...register("businessName")}
                            />
                            <Building2 className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-outline/75" />
                          </div>
                          {errors.businessName ? (
                            <p className="text-xs font-medium tracking-[0.04em] text-error">{errors.businessName.message}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-2">
                          <label className={fieldLabelClassName}>
                            Corporate Email
                          </label>
                          <div className="relative">
                            <Input
                              type="email"
                              autoComplete="email"
                              placeholder="name@company.com"
                              className={cn(
                                fieldInputClassName,
                                errors.corporateEmail ? fieldErrorClassName : null
                              )}
                              {...register("corporateEmail")}
                            />
                            <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-outline/75" />
                          </div>
                          {errors.corporateEmail ? (
                            <p className="text-xs font-medium tracking-[0.04em] text-error">{errors.corporateEmail.message}</p>
                          ) : null}
                        </div>
                        <div className="space-y-2">
                          <label className={fieldLabelClassName}>
                            Phone Number
                          </label>
                          <div className="relative">
                            <Input
                              type="tel"
                              autoComplete="tel"
                              inputMode="tel"
                              placeholder="+91 (000) 000-0000"
                              className={cn(
                                fieldInputClassName,
                                errors.phoneNumber ? fieldErrorClassName : null
                              )}
                              {...register("phoneNumber")}
                            />
                            <Phone className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-outline/75" />
                          </div>
                          {errors.phoneNumber ? (
                            <p className="text-xs font-medium tracking-[0.04em] text-error">{errors.phoneNumber.message}</p>
                          ) : null}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className={fieldLabelClassName}>
                          Inquiry Details
                        </label>
                        <div className="relative">
                          <Textarea
                            rows={5}
                            placeholder="Briefly describe your operational challenges, target expansion timeline, and desired outcomes..."
                            className={cn(
                              fieldTextareaClassName,
                              errors.inquiryDetails ? fieldErrorClassName : null
                            )}
                            {...register("inquiryDetails")}
                          />
                          <MessageSquare className="pointer-events-none absolute right-4 top-5 h-4 w-4 text-outline/75" />
                        </div>
                        {errors.inquiryDetails ? (
                          <p className="text-xs font-medium tracking-[0.04em] text-error">
                            {errors.inquiryDetails.message}
                          </p>
                        ) : null}
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isPending}
                        className="group relative w-full md:w-auto px-10"
                      >
                        {isPending ? (
                          <>
                            <LoaderCircle className="mr-3 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Start Growing with Rasa
                            <ArrowRight className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>

                      {submissionState.visible ? (
                        <p
                          aria-live="polite"
                          className={cn(
                            "text-xs uppercase tracking-[0.12em] font-bold border-l-2 pl-3 py-1",
                            submissionState.tone === "success"
                              ? "text-primary border-primary/40"
                              : "text-error border-error/45"
                          )}
                        >
                          {submissionState.message}
                        </p>
                      ) : null}
                    </form>
                  </div>
                </motion.div>

                <motion.aside variants={itemVariants} className="col-span-12 lg:col-span-5 space-y-12">
                  <div className="aspect-[4/3] w-full overflow-hidden grayscale opacity-80 hover:grayscale-0 transition-all duration-700">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRpRW0ghQAjMsOpAKx0TtypU7x-P2-J2KurQf7OdOwJvZwk34QRMrq0U2qX0UEJSu71npl0RtPG3ca--UfJHDgXvpvjxdMBgzPcPnlQ_ngDc1DO-jlrYvoIi0YmOHj7MpOUyL3loI2rIiD-H7NhAV69qtZBAWSATN7nlbX8QymljrBF6M2U0Jd-kX0xIDkec3LwSlsNozSjm71XZfJhVCMXpfvrFTCMqGS0bneak-MasJg3P0uJxoDTeuWE2uHt1i7v_D9zSJegOqj"
                      alt="RASA contact interior"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    <div className="group border-l border-outline-variant/30 pl-8 py-2">
                      <span className="font-label text-[10px] uppercase tracking-widest text-tertiary font-bold mb-1 block">
                        Direct Messaging
                      </span>
                      <div className="flex items-center gap-4">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        <a className="font-headline font-bold text-2xl text-on-surface group-hover:text-tertiary transition-colors" href="#">
                          WhatsApp Business<br></br>
                          9217143112
                        </a>
                      </div>
                      <p className="text-on-surface-variant text-sm mt-1">
                        Instant response during GMT business hours.
                      </p>
                    </div>

                    <div className="group border-l border-outline-variant/30 pl-8 py-2">
                      <span className="font-label text-[10px] uppercase tracking-widest text-tertiary font-bold mb-1 block">
                        General Correspondence
                      </span>
                      <div className="flex items-center gap-4">
                        <Mail className="h-5 w-5 text-primary" />
                        <a
                          className="font-headline font-bold text-2xl text-on-surface group-hover:text-tertiary transition-colors"
                          href="mailto:rasa.helpcare@gmail.com"
                        >
                          rasa.helpcare@gmail.com
                        </a>
                      </div>
                      <p className="text-on-surface-variant text-sm mt-1">
                        For formal RFP and partnership inquiries.
                      </p>
                    </div>
                  </div>

                  <div className="bg-tertiary-container p-8">
                    <div className="flex gap-4">
                      <BadgeCheck className="h-5 w-5 text-on-tertiary-fixed" />
                      <div>
                        <p className="font-headline font-bold text-on-tertiary-fixed text-sm mb-1">
                          Elite Privacy Standards
                        </p>
                        <p className="text-on-tertiary-fixed-variant text-xs leading-relaxed">
                          All initial consultations are protected by our standard mutual
                          non-disclosure framework. Your intellectual property remains secure from
                          first contact.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </SectionWave>
        </div>
      </main>

      <SectionWave profile="editorial" className="max-w-7xl mx-auto px-12 mb-24">
        {({ itemVariants }) => (
          <motion.div variants={itemVariants} className="h-[400px] w-full bg-surface-container relative overflow-hidden">
            <div className="absolute inset-0 grayscale opacity-40 mix-blend-multiply">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3Y2IXEzZXLTPjgH-nsM7eEalS4djdMrFxuUJoCUIXPIsl_qc7SZTHnlLTXzcHkbVU6TtJA2S98hGh3THWM6pGIM1tjY70pM59oWvEXm0A5DgI-VuszTuRQuNGqBF60R8RzmH9lsgOrkAlz_Z9ulp_k8Y2fuvgMQWUampnj77LG8rkY6epVxhPJP0VuSgj4oxJNRH9VQbAn4wZ7UTV-oAKNYyb6Tj3wyOuv4EzWP5M8tCUrNmcr9hQKKYD4AwkxoiTfgdLJ0Wqbx8c"
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 bg-surface-container-lowest p-8 max-w-xs shadow-xl">
              <h4 className="font-headline font-bold text-lg mb-2"><b>JOIN TODAY</b></h4>
              <p className="text-on-surface-variant text-sm leading-relaxed font-body">
                
                
                MAPPING YOUR WAY ALONG <b>RASA</b>
              </p>
            </div>
          </motion.div>
        )}
      </SectionWave>
    </StitchPageFrame>
  );
}
