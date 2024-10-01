import { AppSidebar } from "@/components/app-sidebar";
import { SidebarLayout } from "@/components/ui/sidebar";

import NavBar from "../../components/navbar";
import AuthProvider from "../AuthProvider";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { cookies } = await import("next/headers");
  return (
    <AuthProvider>
      <SidebarLayout
        defaultOpen={cookies().get("sidebar:state")?.value === "true"}
      >
        <AppSidebar />
        <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
          <div className="h-full rounded-md p-2">
            <NavBar />
            {children}
          </div>
        </main>
      </SidebarLayout>
    </AuthProvider>
  );
}
