
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/ui/navbar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-white py-6 border-t">
        <div className="container flex flex-col items-center justify-center px-4 md:px-6">
          <p className="text-sm text-muted-foreground">
            © 2025 Investra. Data from AMFI. Not financial advice.
          </p>
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
