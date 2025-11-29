import DashboardClient from "@/components/blocks/dashboard-client";
import { auth0 } from "@/services/auth0";
import { redirect } from "next/navigation";


export default async function DashboardPage() {
  const session = await auth0.getSession();


  if (!session) {
    redirect("/auth/login");
  }

  const { token } = await auth0.getAccessToken();


  return <DashboardClient user={session.user} accessToken={token} />;
}