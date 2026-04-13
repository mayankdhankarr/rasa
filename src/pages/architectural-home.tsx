import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, LayoutPanelTop, Pause, Play, ShieldCheck } from "lucide-react";

import { StitchPageFrame } from "@/components/common/stitch-page-frame";
import { SectionWave } from "@/components/stitch/section-wave";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Concept Development",
    detail:
      "Strategic identity creation that captures the core essence of your brand's hospitality vision where we create a strategic brand presence that resonates with your market and sets the stage for a premium hospitality experience..",
    Icon: Building2,
  },
  {
    title: "Space Design",
    detail:
      "Optimizing the friction between guest comfort and staff efficiency through meticulous floor planning.",
    Icon: LayoutPanelTop,
  },
  {
    title: "Operations Standards",
    detail:
      "The RASA Certification: The RASA Certification provides the systems and consistency needed to replicate your success across 10, 50, or 100 locations with zero compromise on quality.",
    Icon: ShieldCheck,
  },
];

const headlineStats = [
  { value: "50+", label: "Projects" },
  { value: "25+", label: "Cities" },
  { value: "100%", label: "Standards" },
];

export function ArchitecturalHomePage() {
  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const soundUpgradeInFlightRef = useRef(false);
  const [isVideoSectionVisible, setIsVideoSectionVisible] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const playMuted = useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return false;
    }

    videoElement.defaultMuted = true;
    videoElement.muted = true;
    videoElement.volume = 0;

    try {
      await videoElement.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  const playWithSound = useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return false;
    }

    videoElement.defaultMuted = false;
    videoElement.muted = false;
    videoElement.volume = 1;

    try {
      await videoElement.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  const playOnSectionEntry = useCallback(async () => {
    const playedWithSound = await playWithSound();
    if (playedWithSound) {
      return;
    }

    await playMuted();
  }, [playMuted, playWithSound]);

  const upgradeToSoundPlayback = useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return false;
    }

    videoElement.defaultMuted = false;
    videoElement.muted = false;
    videoElement.volume = 1;

    try {
      await videoElement.play();
      return true;
    } catch {
      return false;
    }
  }, []);

  const toggleVideoPlayback = useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    if (videoElement.paused || videoElement.ended) {
      const playedWithSound = await playWithSound();
      if (!playedWithSound) {
        await playMuted();
      }
      return;
    }

    if (videoElement.muted || videoElement.volume === 0) {
      await playWithSound();
      return;
    }

    videoElement.pause();
  }, [playMuted, playWithSound]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    const syncMutedState = () => {
      setIsVideoMuted(videoElement.muted || videoElement.volume === 0);
    };

    const handlePlay = () => {
      setIsVideoPlaying(true);
      syncMutedState();
    };

    const handlePause = () => {
      setIsVideoPlaying(false);
      syncMutedState();
    };

    const handleEnded = () => {
      setIsVideoPlaying(false);
      syncMutedState();
    };

    const handleVolumeChange = () => {
      syncMutedState();
    };

    syncMutedState();

    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);
    videoElement.addEventListener("volumechange", handleVolumeChange);

    return () => {
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
      videoElement.removeEventListener("ended", handleEnded);
      videoElement.removeEventListener("volumechange", handleVolumeChange);
    };
  }, []);

  useEffect(() => {
    const trackedSection = videoSectionRef.current;
    if (!trackedSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoSectionVisible(entry.isIntersecting && entry.intersectionRatio >= 0.35);
      },
      {
        threshold: [0, 0.2, 0.35, 0.6, 1],
      }
    );

    observer.observe(trackedSection);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    if (!isVideoSectionVisible) {
      videoElement.pause();
      videoElement.currentTime = 0;
      return;
    }

    void playOnSectionEntry();
  }, [isVideoSectionVisible, playOnSectionEntry]);

  useEffect(() => {
    const tryUpgradeOnInteraction = () => {
      const videoElement = videoRef.current;
      if (!videoElement || !isVideoSectionVisible) {
        return;
      }

      const needsUpgrade = videoElement.paused || videoElement.ended || videoElement.muted || videoElement.volume === 0;
      if (!needsUpgrade || soundUpgradeInFlightRef.current) {
        return;
      }

      soundUpgradeInFlightRef.current = true;
      void upgradeToSoundPlayback().finally(() => {
        soundUpgradeInFlightRef.current = false;
      });
    };

    window.addEventListener("pointerdown", tryUpgradeOnInteraction, { passive: true });
    window.addEventListener("touchstart", tryUpgradeOnInteraction, { passive: true });
    window.addEventListener("keydown", tryUpgradeOnInteraction);
    window.addEventListener("wheel", tryUpgradeOnInteraction, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", tryUpgradeOnInteraction);
      window.removeEventListener("touchstart", tryUpgradeOnInteraction);
      window.removeEventListener("keydown", tryUpgradeOnInteraction);
      window.removeEventListener("wheel", tryUpgradeOnInteraction);
    };
  }, [isVideoSectionVisible, upgradeToSoundPlayback]);

  return (
    <StitchPageFrame signature="architectural-home" className="bg-surface-container-low text-on-surface">
      <main>
        <SectionWave profile="hero" className="relative min-h-[100svh] pt-24 md:pt-0 flex items-start md:items-center overflow-hidden">
          {({ itemVariants }) => (
            <>
              <div className="absolute inset-0 z-0">
                <img
                  alt="Moody rainy cafe interior"
                  className="w-full h-full object-cover"
                  src="roof.png"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent" />
              </div>

              <div className="relative z-10 px-5 sm:px-8 md:px-24 w-full max-w-7xl pt-6 sm:pt-10 md:pt-16 pb-10 md:pb-0">
                <motion.span
                  variants={itemVariants}
                  className="label-sm uppercase tracking-[0.2em] text-tertiary-fixed mb-6 block font-medium"
                >
                  
                </motion.span>
                <h1
                  className="font-copper-black hero-title-elegant text-4xl sm:text-5xl md:text-8xl leading-tight text-white mb-8"
                >
                  Elevating Cafes &amp;
                  <br />
                  Restaurants
                </h1>
                <motion.p
                  variants={itemVariants}
                  className="font-cavolini text-stone-300 text-lg sm:text-xl md:text-2xl max-w-xl mb-10 md:mb-12 leading-relaxed tracking-[0.01em]"
                >
                 We transform ambitious cafes and restaurants from owner-dependent shops into system-driven, scalable brands through uncompromising operational standards.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8 md:gap-12 py-6 sm:py-8 md:py-10 border-y border-white/10 max-w-3xl"
                >
                  {headlineStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center gap-6 md:gap-12"
                      layout
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="flex flex-col">
                        <span className="text-3xl font-black text-white">{stat.value}</span>
                        <span className="text-xs uppercase tracking-widest text-stone-500 mt-1">
                          {stat.label}
                        </span>
                      </div>
                      {index < headlineStats.length - 1 ? (
                        <div className="hidden md:block h-12 w-px bg-white/10" />
                      ) : null}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </>
          )}
        </SectionWave>

        <SectionWave profile="editorial" className="py-20 md:py-32 bg-stone-200 overflow-hidden">
          {({ itemVariants }) => (
            <div className="max-w-[1920px] mx-auto px-5 sm:px-8 md:px-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-24 items-center">
                <div className="lg:col-span-5">
                  <motion.div variants={itemVariants} className="mb-16">
                    <span className="text-stone-600 font-bold tracking-widest text-xs uppercase mb-4 block">
                      
                    </span>
                    <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 leading-none mb-6">
                      Vision • Build • Standardize
                    </h2>
                    <b> RASA VISION </b>
                    
                   <p className="text-stone-700 text-lg leading-relaxed">
                    To become India's most trusted standardisation and growth partner for cafes and restaurants.Standardise as many cafes as possible across India
Build India's largest restaurant operations intelligence network
              </p>
                  </motion.div>

                  <div className="space-y-8 md:space-y-12">
                    {services.map(({ Icon, title, detail }) => (
                      <motion.div key={title} variants={itemVariants} className="flex gap-4 md:gap-6 group">
                        <div className="w-12 h-12 bg-stone-300 flex items-center justify-center shadow-sm group-hover:bg-stone-800 transition-colors duration-300">
                          <Icon className="h-5 w-5 text-stone-800 group-hover:text-stone-50 transition-colors" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-stone-900 mb-2">{title}</h4>
                          <p className="text-stone-600 text-sm leading-relaxed max-w-sm">{detail}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.div variants={itemVariants} className="lg:col-span-7 relative">
                  <div ref={videoSectionRef} className="group relative z-10 aspect-[4/5] md:aspect-[16/10]">
                    <motion.video
                      ref={videoRef}
                      className="w-full h-full object-cover shadow-2xl"
                      poster="/thumbnail.png"
                      playsInline
                      preload="metadata"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.7 }}
                    >
                      <source src="/intro.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </motion.video>

                    <button
                      type="button"
                      aria-label={
                        isVideoPlaying && isVideoMuted
                          ? "Enable sound"
                          : isVideoPlaying
                            ? "Pause video"
                            : "Play video"
                      }
                      aria-pressed={isVideoPlaying && !isVideoMuted}
                      onClick={() => {
                        void toggleVideoPlayback();
                      }}
                      className="pointer-events-none absolute left-1/2 top-1/2 z-20 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-stone-100/40 bg-stone-950/68 text-stone-50 opacity-0 backdrop-blur-sm transition duration-200 hover:bg-stone-950/86 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
                    >
                      {isVideoPlaying && !isVideoMuted ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 ml-0.5" />
                      )}
                    </button>
                  </div>
                  <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-stone-400/10 -z-0" />
                  <div className="absolute top-1/2 -right-12 w-24 h-px bg-stone-400 transform -translate-y-1/2" />
                </motion.div>
              </div>
            </div>
          )}
        </SectionWave>

        <SectionWave profile="grid" className="py-20 md:py-32 bg-stone-100">
          {({ itemVariants }) => (
            <div className="px-5 sm:px-8 md:px-24">
              <motion.div
                variants={itemVariants}
                className="flex flex-col md:flex-row justify-between items-end mb-20"
              >
                <div className="max-w-xl">
                  <h3 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-stone-900">
                    Curated Standards
                  </h3>
                  <p className="text-stone-600">
                    Selected transformations that define the modern hospitality landscape.
                  </p>
                </div>
                <motion.a
                  href="#"
                  className="group flex items-center gap-2 font-bold text-sm uppercase tracking-widest mt-6 md:mt-0 text-stone-900"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.22 }}
                >
                  View Archive
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto">
                <motion.div variants={itemVariants} className="md:col-span-8 group overflow-hidden">
                  <div className="relative h-[420px] sm:h-[520px] md:h-[600px] bg-stone-200 overflow-hidden">
                    <motion.img
                      alt="Modern minimalist restaurant"
                      className="w-full h-full object-cover"
                      src="tables.png"
                      loading="lazy"
                      decoding="async"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute bottom-10 left-10 text-white">
                      <span className="bg-stone-800 px-3 py-1 text-[10px] uppercase tracking-widest mb-3 inline-block">
                        THE FUTURE
                      </span>
                      <h4 className="text-3xl font-bold"><b>RASA</b></h4>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col gap-8">
                  <div className="group overflow-hidden flex-1 relative">
                    <div className="h-full bg-stone-300 overflow-hidden">
                      <motion.img
                        alt="Luxury boutique cafe detail"
                        className="w-full h-full object-cover"
                        src="coffee.png"
                        loading="lazy"
                        decoding="async"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/30 transition-all" />
                    </div>
                  </div>
                  <div className="bg-stone-200 p-10 flex flex-col justify-center">
                    <span className="text-stone-500 font-bold text-xs uppercase tracking-widest mb-4">
                      
                    </span>
                    <h4 className="text-xl font-bold mb-4 text-stone-900"> </h4>
                    <p className="text-stone-600 text-sm">
                      RASA's latest standard for large-scale urban cafes, blending metropolitan
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </SectionWave>

        <SectionWave profile="cta" className="py-20 md:py-32 bg-stone-900 text-stone-50 relative overflow-hidden">
          {({ itemVariants }) => (
            <>
              <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
                <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" width="100%">
                  <path d="M0 0 L100 100 L100 0 Z" fill="currentColor" />
                </svg>
              </div>

              <div className="px-5 sm:px-8 md:px-24 relative z-10 text-center max-w-4xl mx-auto">
                <motion.h2
                  variants={itemVariants}
                  className="font-headline text-4xl md:text-6xl font-extrabold mb-8 tracking-tighter"
                >
                  Ready to set the standard?
                </motion.h2>
                <motion.p
                  variants={itemVariants}
                  className="text-stone-400 text-lg md:text-xl mb-12 font-light"
                >
                  We’ve helped over 100 founders reclaim their time by building cafes that run themselves with RASA. Let’s sit down and blueprint a system that works as hard as you do.
                </motion.p>
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Button variant="subtle" size="lg" className="bg-stone-50 text-stone-950 hover:bg-stone-200">
                    Initiate Consultation
                  </Button>
                  
                </motion.div>
              </div>
            </>
          )}
        </SectionWave>
      </main>
    </StitchPageFrame>
  );
}
