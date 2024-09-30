"use client";

import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Atom,
  CalendarDays,
  Eclipse,
  Frame,
  Home,
  Layers3,
  LifeBuoy,
  Map,
  PieChart,
  Rabbit,
  Send,
  Settings,
  ShieldAlert,
  User,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavPriority } from "./nav-priority";
import { useGetProjectsQuery } from "@/lib/features/projects/projectsApiSlice";

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Atom,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Eclipse,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Rabbit,
      plan: "Free",
    },
  ],

  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Timeline",
      url: "/timeline",
      icon: CalendarDays,
    },
    {
      title: "Users",
      url: "/users",
      icon: User,
    },
    {
      title: "Teams",
      url: "/teams",
      icon: Users,
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],

  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  priority: [
    {
      name: "Urgent",
      url: "/priority/urgent",
      icon: AlertCircle,
    },
    {
      name: "High",
      url: "/priority/high",
      icon: ShieldAlert,
    },
    {
      name: "Medium",
      url: "/priority/medium",
      icon: AlertTriangle,
    },
    {
      name: "Low",
      url: "/priority/low",
      icon: AlertOctagon,
    },
    {
      name: "Backlog",
      url: "/priority/backlog",
      icon: Layers3,
    },
  ],
  searchResults: [
    {
      title: "Routing Fundamentals",
      teaser:
        "The skeleton of every application is routing. This page will introduce you to the fundamental concepts of routing for the web and how to handle routing in Next.js.",
      url: "#",
    },
    {
      title: "Layouts and Templates",
      teaser:
        "The special files layout.js and template.js allow you to create UI that is shared between routes. This page will guide you through how and when to use these special files.",
      url: "#",
    },
    {
      title: "Data Fetching, Caching, and Revalidating",
      teaser:
        "Data fetching is a core part of any application. This page goes through how you can fetch, cache, and revalidate data in React and Next.js.",
      url: "#",
    },
    {
      title: "Server and Client Composition Patterns",
      teaser:
        "When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. ",
      url: "#",
    },
    {
      title: "Server Actions and Mutations",
      teaser:
        "Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.",
      url: "#",
    },
  ],
};

export function AppSidebar() {
  const { data: projects } = useGetProjectsQuery();
  return (
    <Sidebar>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Platform</SidebarLabel>
          <NavMain items={data.navMain} searchResults={data.searchResults} />
        </SidebarItem>
        <SidebarItem>
          <NavProjects projects={projects ? projects : []} isActive={true} />
        </SidebarItem>
        <SidebarItem>
          <NavPriority priority={data.priority} isActive={true} />
        </SidebarItem>
        <SidebarItem className="mt-auto">
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
