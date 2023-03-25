import { LayoutSignIn } from "components/templates/LayoutSignIn/LayoutSignIn";
import { MemeCreator } from "components/orgnisms/MemCreator/MemeCreator";
import { Memes } from "components/orgnisms/Memes/Memes";
export const Dashboard = () => {
  return (
    <LayoutSignIn>
      Dashboard
      <MemeCreator />
      <Memes />
    </LayoutSignIn>
  );
};
