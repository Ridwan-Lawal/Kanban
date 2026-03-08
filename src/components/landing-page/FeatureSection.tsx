import { CheckSquare, Layout, Moon, Users } from "lucide-react";

const features = [
  {
    icon: CheckSquare,
    title: "Subtask Tracking",
    description:
      "Break tasks into subtasks and track completion at a glance. Stay on top of every detail without losing the big picture.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description:
      "Easy on the eyes, day or night. Toggle between light and dark themes with a single click for maximum comfort.",
  },
  {
    icon: Layout,
    title: "Drag & Drop Boards",
    description:
      "Effortlessly move tasks between columns. Our intuitive drag-and-drop makes workflow management feel natural.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Share boards, assign tasks, and keep your entire team aligned — all in real time.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="heading-s text-main-purple mb-3 uppercase">Features</p>
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Everything you need to ship faster
          </h2>
          <p className="text-medium-grey mx-auto max-w-lg">
            Built for teams who care about clarity and speed.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group border-border bg-card hover:border-main-purple/30 hover:shadow-main-purple/5 rounded-xl border p-8 transition-all hover:shadow-lg"
            >
              <div className="bg-main-purple/10 text-main-purple group-hover:bg-main-purple group-hover:text-primary-foreground mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                <feature.icon size={24} />
              </div>
              <h3 className="heading-l text-foreground mb-2">{feature.title}</h3>
              <p className="text-medium-grey leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
