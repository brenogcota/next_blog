import HeadSEO from "components/Head";
import DarkRoom from "components/DarkRoom";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <HeadSEO />
      <DarkRoom />
    </div>
  );
};

export default Home;
