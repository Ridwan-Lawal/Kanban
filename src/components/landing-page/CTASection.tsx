import AnimatedSection from "@/components/landing-page/AnimatedSection";
import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="py-24">
      <AnimatedSection>
        <div className="container mx-auto px-6">
          <div className="bg-primary relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16 md:py-20">
            {/* Decorative circles */}
            <div className="bg-main-purple-hover/20 pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full blur-3xl" />
            <div className="bg-main-purple-hover/20 pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h2 className="text-primary-foreground mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Ready to get organized?
              </h2>
              <p className="text-primary-foreground/80 mx-auto mb-8 max-w-lg text-lg">
                Join thousands of teams already using Kanban to ship faster and stay focused. Start
                for free — no credit card required.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/register"
                  className="bg-card text-main-purple hover:bg-card/90 rounded-3xl px-8 py-4 text-base font-bold transition-all hover:shadow-lg"
                >
                  Get Started for Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default CtaSection;
