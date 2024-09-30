import Link from "next/link";
import { ChevronRight, MoreHorizontal, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { SidebarLabel } from "./ui/sidebar";

export function NavPriority({
  priority,
  isActive,
  className,
}: {
  priority: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  isActive?: boolean;
} & React.ComponentProps<"ul">) {
  return (
    <Collapsible key="projects" asChild defaultOpen={isActive}>
      <>
        <div className="relative flex items-center">
          <Link href="/projects">
            <SidebarLabel>Priority</SidebarLabel>
          </Link>

          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="absolute right-1 h-6 w-6 rounded-md p-0 ring-ring transition-all focus-visible:ring-2 data-[state=open]:rotate-90"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <ul className={cn("grid gap-0.5", className)}>
            {priority.map((item) => (
              <li
                key={item.name}
                className="group relative rounded-md hover:bg-accent hover:text-accent-foreground has-[[data-state=open]]:bg-accent has-[[data-state=open]]:text-accent-foreground"
              >
                <Link
                  href={item.url}
                  className="flex h-7 items-center gap-2.5 overflow-hidden rounded-md px-1.5 text-xs outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
                >
                  <item.icon className="h-4 w-4 shrink-0 translate-x-0.5 text-muted-foreground" />
                  <div className="line-clamp-1 grow overflow-hidden pr-6 font-medium">
                    {item.name}
                  </div>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="peer absolute right-1 top-0.5 h-6 w-6 shrink-0 rounded-md bg-accent p-0 text-accent-foreground opacity-0 ring-ring transition-all focus-visible:ring-2 group-focus-within:opacity-100 group-hover:opacity-100 data-[state=open]:bg-accent data-[state=open]:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="right"
                    align="start"
                    sideOffset={20}
                  >
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </>
    </Collapsible>
  );
}
