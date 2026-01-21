import Logo from "@/public/icon.svg";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-white px-6">
      <div>
        <Image src={Logo} alt="kanban logo" quality={75} />
        <div className="flex items-center gap-8">
          <h1 className="heading-l"></h1>
        </div>
      </div>
    </nav>
  );
}
