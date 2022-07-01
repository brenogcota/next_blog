import HeadSEO from "components/Head";
import Main from "components/Main";
import Songs from "components/Songs";
import type { NextPage } from "next";
import Spacer from "ui/Spacer";

import Snippets from "components/Snippets";
import Playing from "components/Playing";

const Home: NextPage = () => {
  return (
    <div>
      <HeadSEO />
      <Main />
      <Spacer size="lg" />
      <Spacer size="lg" />
      <Spacer size="lg" />
      <Spacer size="lg" />
      <Snippets />
      <Spacer size="lg" />
      <Spacer size="lg" />
      <Songs />
      <Playing />
    </div>
  );
};

export default Home;
