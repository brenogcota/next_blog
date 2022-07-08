import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { styled } from "stitches.config";
import { Tag } from "components/BlogList/stitches";
import Text from "ui/Text";
import Spacer from "ui/Spacer";
import NotFound from "components/NotFound";

const Container = styled("main", {
  padding: "$1 $4",

  "@bp1": {
    padding: "$2 $8",
    maxWidth: "max(60vw, 920px)",
    margin: "auto",
    paddingTop: "5vh",
  },
});

const Background = styled("div", {
  backgroundImage:
    "url(https://source.unsplash.com/random/?oriental,city,sky,developer,galaxy)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "230px",
  position: "relative",
});

const Title = styled("h1", {
  textTransform: "capitalize",
});

type Props = {
  post: {
    title: string;
    publishedOn: string;
    tags: string[];
    author: string;
  };
  slug: string;
  preview: string;
};

const Slug = () => {
  const {
    query: { slug },
  } = useRouter();
  const { locale } = useRouter();

  const { data } = useQuery<Props>(
    ["post", slug],
    async () =>
      (await axios.get(`/api/post/?locale=${locale}&path=${slug}.mdx`)).data
  );

  const slugPath = slug as string;

  const Post = dynamic(
    () => {
      return import(`pages/posts/${locale}/${slugPath}.mdx`);
    },
    { ssr: false }
  );

  return (
    <>
      {data?.post?.title ? (
        <>
          <Background />
          <Container>
            <Title>{data?.post.title}</Title>
            {data?.post?.tags?.map((tag) => (
              <Tag variant="primary" key={tag}>
                {tag}
              </Tag>
            ))}
            {" - "}{" "}
            <Text as="span" size="sm">
              {data?.post.publishedOn}
            </Text>
            {" - "}{" "}
            <Text as="span" size="sm">
              {data?.post.author}
            </Text>
            <Spacer size="lg" />
            <Post />
          </Container>
        </>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Slug;
