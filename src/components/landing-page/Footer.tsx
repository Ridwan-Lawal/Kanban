import { LayoutDashboard } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t px-6 py-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="gradient-hero flex h-6 w-6 items-center justify-center rounded">
            <LayoutDashboard className="text-primary-foreground h-3 w-3" />
          </div>
          <span className="text-foreground font-semibold">Kanban</span>
        </div>
        <p className="text-muted-foreground text-sm">© 2026 Kanban. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
