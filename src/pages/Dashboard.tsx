import { LayoutSignIn } from "components/LayoutSignIn/LayoutSignIn";
import { MemCreator } from "components/MemCreator/MemCreator";
import { Mems } from "components/Mems/Mems";
export const Dashboard = () => {
  return (
    <LayoutSignIn>
      Dashboard
      <MemCreator />
      <Mems />
    </LayoutSignIn>
  );
};
