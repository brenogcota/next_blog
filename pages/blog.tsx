import axios from "axios";
import BlogList, { Props } from "components/BlogList";
import { useLocale } from "context/locale";
import type { NextPage } from "next";
import { useQuery } from "react-query";
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

const Blog: NextPage<Props> = () => {
  const t = useLocale()
  const { error, data } = useQuery<Props>(
    "posts",
    async () => (await axios.get("/api/posts")).data
  );

  const posts = data?.posts;

  return (
    <Container>
      <Text as="h1" size="xlg">
        { t.blog_title }
      </Text>

      <Spacer size="md"/>

      <BlogList posts={posts} />
    </Container>
  );
};

export default Blog;
