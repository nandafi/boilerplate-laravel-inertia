import React from "react";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Cloud, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
                "relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 transition-all duration-500 ease-in-out hover:scale-105 active:scale-95",
                theme === "light"
                    ? "bg-sky-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
                    : "bg-slate-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
            )}
            aria-label="Toggle theme"
        >
            {/* Background Icons */}
            <div className="relative h-full w-full overflow-hidden rounded-full">
                {/* Day Background (Sun & Cloud) */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-end pr-1.5 transition-all duration-500",
                        theme === "light" ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    )}
                >
                    <div className="relative">
                        <Sun className="h-4 w-4 text-yellow-300 fill-yellow-300" />
                        <Cloud className="absolute -bottom-1 -right-1 h-3 w-3 text-white fill-white" />
                    </div>
                </div>

                {/* Night Background (Moon & Stars) */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-start pl-1.5 transition-all duration-500",
                        theme === "dark" ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                    )}
                >
                    <div className="relative">
                        <Moon className="h-4 w-4 text-yellow-100 fill-yellow-100" />
                        <Star className="absolute -top-1 right-0 h-1.5 w-1.5 text-white fill-white animate-pulse" />
                        <Star className="absolute bottom-0 -right-1 h-1 w-1 text-white fill-white animate-pulse delay-75" />
                        <Star className="absolute -bottom-1 left-2 h-1 w-1 text-white fill-white animate-pulse delay-150" />
                    </div>
                </div>
            </div>

            {/* Knob */}
            <div
                className={cn(
                    "absolute h-6 w-6 rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_2px_5px_rgba(0,0,0,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1)] flex items-center justify-center",
                    theme === "light" ? "left-1" : "left-9"
                )}
            >
                {/* Subtle detail on knob */}
                <div className="h-4 w-4 rounded-full bg-slate-50 opacity-50 shadow-inner" />
            </div>
        </button>
    );
}
