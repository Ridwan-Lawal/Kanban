import { PropsWithChildren } from "react";

export default function Layout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex">
      <aside className="border border-red-500"></aside>
      <div className="border border-blue-600">
        <nav></nav>
        <main>{children}</main>
      </div>
    </div>
  );
}
