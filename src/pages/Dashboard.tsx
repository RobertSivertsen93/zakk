import React from "react";
import Navigation from "@/components/Navigation";

type DashboardLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

const Dashboard = ({ children, title, description }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 page-container">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-2">{description}</p>
          )}
        </header>

        {children}
      </main>
    </div>
  );
};

export default Dashboard;
