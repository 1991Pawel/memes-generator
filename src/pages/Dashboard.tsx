import { LayoutSignIn } from "components/templates/LayoutSignIn/LayoutSignIn";
import { MemCreator } from "components/orgnisms/MemCreator/MemCreator";
import { Mems } from "components/orgnisms/Mems/Mems";
export const Dashboard = () => {
  return (
    <LayoutSignIn>
      Dashboard
      <MemCreator />
      <Mems />
    </LayoutSignIn>
  );
};
