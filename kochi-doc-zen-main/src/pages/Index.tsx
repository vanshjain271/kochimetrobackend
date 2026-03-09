import { useState } from "react";
import { Layout } from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import WelcomePage from "@/components/WelcomePage";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <WelcomePage onEnter={() => setShowWelcome(false)} />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Index;
