"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetAuthUserQuery } from "@/lib/features/users/usersApiSlice";
import { signOut } from "aws-amplify/auth";
import { LogOut, Settings, Target, UserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { AvatarFallback, Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

export default function Navbar() {
  const { data: currentUser } = useGetAuthUserQuery({});

  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out", error);
    }
  }

  console.log(currentUser);

  const currentUserDetails = currentUser?.userDetails;
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

        <Avatar>
          <AvatarImage
            src={currentUserDetails?.profilePictureUrl}
            alt={currentUser?.user?.username ?? "User profile picture"}
          />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>
        <Badge className="mx-3">{currentUser?.user?.username}</Badge>
        <Button onClick={handleSignOut} variant="outline" size="icon">
          <LogOut className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
    </nav>
  );
}
