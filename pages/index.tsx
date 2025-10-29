import HeadSEO from "components/Head";
import Songs from "components/Songs";
import NewMain from "components/NewMain";
import type { NextPage } from "next";
import Spacer from "ui/Spacer";

const Home: NextPage = () => {
  return (
    <div>
      <HeadSEO />
      <NewMain />
      <Spacer size="lg" />
      <Songs />
      <Spacer size="lg" />
      {/* <Spacer size="lg" />
      <Snippets />
      <Spacer size="lg" /> */}
    </div>
  );
};

export default Home;
