import { Layout } from "components/Layout/Layout";

import { MemCreator } from "components/MemCreator/MemCreator";
import { Mems } from "components/Mems/Mems";

export const HomePage = () => {
  return (
    <Layout>
      HOMEPAGE
      <MemCreator />
      <Mems />
    </Layout>
  );
};
