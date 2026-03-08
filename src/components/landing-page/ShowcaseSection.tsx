import darkmodeShowcase from "@/public/darkmode.png";
import subtaskShowcase from "@/public/subtask.png";
import Image from "next/image";

const showcases = [
  {
    title: "Subtask Tracking That Actually Works",
    description:
      "Break complex tasks into manageable pieces. Each task card can hold multiple subtasks with individual checkboxes, so you always know exactly how much progress you've made. No more guessing — just clear, visual completion tracking.",
    image: subtaskShowcase,
    imageAlt: "Subtask tracking modal showing checklist with purple checkboxes",
    reversed: false,
  },
  {
    title: "Light & Dark Mode, Your Choice",
    description:
      "Whether you're a night owl or an early bird, our Kanban board adapts to you. Switch between a clean light theme and a sleek dark theme with a single click. Your eyes will thank you during those late-night sprint sessions.",
    image: darkmodeShowcase,
    imageAlt: "Side by side comparison of Kanban board in light and dark mode",
    reversed: true,
  },
];

const ShowcaseSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="heading-s text-main-purple mb-3 uppercase">Showcase</p>
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Built for the way you work
          </h2>
        </div>

        <div className="mx-auto flex max-w-6xl flex-col gap-24">
          {showcases.map((item) => (
            <div
              key={item.title}
              className={`flex flex-col items-center gap-12 lg:flex-row ${
                item.reversed ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 space-y-5">
                <h3 className="text-foreground text-2xl font-bold md:text-3xl">{item.title}</h3>
                <p className="text-medium-grey text-lg leading-relaxed">{item.description}</p>
                <a
                  href="#"
                  className="bg-primary text-primary-foreground hover:bg-main-purple-hover inline-block rounded-3xl px-6 py-3 text-sm font-bold transition-colors"
                >
                  Try It Now
                </a>
              </div>
              <div className="flex-1">
                <div className="border-border shadow-main-purple/5 overflow-hidden rounded-2xl border shadow-xl">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full"
                    quality={75}
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
