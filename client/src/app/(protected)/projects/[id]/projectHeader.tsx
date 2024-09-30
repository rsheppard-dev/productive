import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Share2 } from "lucide-react";
import ProjectTabs from "./ProjectTabs";

export default function ProjectHeader({ id }: { id: number }) {
  return (
    <div>
      <Header title="Product Design Development" />

      <div className="mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Filter className="h-5 w-5" aria-hidden />
            <span className="sr-only">Filter</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" aria-hidden />
            <span className="sr-only">Share</span>
          </Button>
          <div className="relative w-full">
            <Search
              className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground"
              aria-hidden
            />
            <Input type="search" placeholder="Search tasks" className="pl-8" />
          </div>
        </div>
      </div>
      <ProjectTabs id={id} />
    </div>
  );
}
