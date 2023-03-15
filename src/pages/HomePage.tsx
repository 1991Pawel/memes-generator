import { Layout } from "components/Layout/Layout";
import { MemCard } from "components/MemCard/MemCard";
import { MemCreator } from "components/MemCreator/MemCreator";

export const HomePage = () => {
  return (
    <Layout>
      HOMEPAGE
      <MemCreator />
      <div>
        <MemCard />
      </div>
    </Layout>
  );
};
