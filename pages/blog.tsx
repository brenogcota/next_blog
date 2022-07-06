import BlogList from "components/BlogList";
import { useLocale } from "context/locale";
import type { NextPage } from "next";
import { styled } from "stitches.config";
import Spacer from "ui/Spacer";
import Text from "ui/Text";

const Container = styled('main', {
    padding: '$1 $4',

    '@bp1': {
        padding: '$2 $8',
        maxWidth: 'max(60vw, 920px)',
        margin: 'auto',
        paddingTop: '10vh'
    }
});

const Home: NextPage = () => {
  const t = useLocale()

  return (
    <Container>
      <Text as="h1" size="xlg">
        { t.blog_title }
      </Text>

      <Spacer size="md"/>

      <BlogList />
    </Container>
  );
};

export default Home;
