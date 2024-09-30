import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Settings, Target } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <nav className="mb-10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger />

        <Link href="/dashboard" className="flex items-center gap-2">
          <Target
            className="h-5 w-5 stroke-primary"
            aria-label="Productive Logo"
          />
          <span className="font-bold">Productive</span>
        </Link>
      </div>

      <div className="flex items-center gap-1">
        <Link href="/settings">
          <Button variant="outline" size="icon">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
