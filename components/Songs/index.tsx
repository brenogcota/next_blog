import axios from "axios";
import { Suspense } from "react";
import { styled } from "stitches.config";
import { Slider, SliderItem } from "ui/Slider";
import Text from "ui/Text";

import { useQuery } from "react-query";
import { useLocale } from "context/locale";
import Link from "next/link";

type Song = {
  track: {
    id: string;
    name: string;
    album: {
      images: { url: string }[];
    };
    preview_url: string;
    artists: { name: string }[];
    external_urls: { spotify: string }
  };
};

type Tracks = {
  tracks: {
    items: Song[];
  };
};

const Container = styled("section", {
  padding: "$1 0 $1 $4",

  "@bp1": {
    padding: "$2 0 $2 $8",
  },
});

const SpotifyCard = styled("div", {
  minWidth: "250px",
  height: "250px",
  objectFit: "cover",
  backgroundSize: "100%",
  borderRadius: "12px",
  transition: "all .2s",
  cursor: "pointer",
  position: "relative",

  "&:hover": {
    backgroundSize: "120%",
  },

  "strong, p": {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
});

const Songs = () => {
  const t = useLocale();
  const { error, data } = useQuery<Tracks>(
    "spotify",
    async () => (await axios.get("/api/top-tracks")).data
  );

  const tracks = data?.tracks?.items;

  if (error || !tracks) return <></>;

  return (
    <Suspense fallback="Loading">
      <Container>
        <Text as="h2" size="xlg">
          {t.recents}
          <Text
            as="span"
            size="xlg"
            css={{
              color: "$primary",
            }}
          >
            {" "}
            {t.played_songs}
          </Text>
        </Text>
        <Slider>
          {tracks?.map((recent) => {
            return (
              <SliderItem key={recent.track.id} data-id={recent.track.id}>
                <Link href={recent.track.external_urls?.spotify} passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <SpotifyCard
                      css={{
                        backgroundImage: `url(${recent.track.album.images[0].url})`,
                      }}
                    >
                      <Text as="strong" size="md" css={{ color: "$primary" }}>
                        {recent.track.name}
                      </Text>
                      <Text as="p" size="sm" css={{ color: "$white" }}>
                        {recent.track.artists[0].name}
                      </Text>
                    </SpotifyCard>
                  </a>
                </Link>
              </SliderItem>
            );
          })}
        </Slider>
      </Container>
    </Suspense>
  );
};

export default Songs;
