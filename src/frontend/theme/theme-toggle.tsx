
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/frontend/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      aria-label="Toggle theme"
      pressed={theme === "dark"}
      onPressedChange={(pressed) => {
        setTheme(pressed ? "dark" : "light");
      }}
      className="w-10 p-2"
      variant="outline"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Toggle>
  );
}
