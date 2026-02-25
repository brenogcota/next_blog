import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { styled } from "stitches.config";
import Text from "ui/Text";
import HeadSEO from "components/Head";
import { useQuery } from "react-query";
import { useLocale } from "context/locale";
import Link from "next/link";
import { Grid } from "ui/Column";
import useMobileDetect from "hooks/useDeviceDetector";
import SpotifyNowPlaying from "components/SpotifyNowPlaying";
import Spacer from "ui/Spacer";
import { useTheme } from "next-themes";

type Song = {
  track: {
    id: string;
    name: string;
    album: {
      images: { url: string }[];
    };
    preview_url: string;
    artists: { name: string }[];
    external_urls: { spotify: string };
  };
};

type Tracks = {
  tracks: {
    items: Song[];
  };
};

type NowPlayingResponse = {
  song: {
    is_playing: boolean;
    item?: {
      name: string;
      artists: { name: string }[];
      album: {
        images: { url: string }[];
      };
      external_urls: {
        spotify: string;
      };
    };
  };
};

const PageContainer = styled("div", {
  minHeight: "100vh",
  transition: "background-color 0.3s ease",
  
  variants: {
    isDark: {
      true: {
        backgroundColor: "#0a0a0a",
      },
      false: {
        backgroundColor: "#fff",
      },
    },
  },
});

const Container = styled("section", {
  padding: "$1 $4",

  "@bp1": {
    padding: "$2 $8",
  },
});

const NowPlayingSection = styled("section", {
  padding: "40px $4",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "@bp1": {
    padding: "60px $8",
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
  backgroundPosition: "center",

  "&::after": {
    content: "",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(to top, rgba(0, 0, 0, .85) 0%, rgba(0, 0, 0, 0) 35%)",
    borderRadius: "12px",
  },

  "&:hover": {
    backgroundSize: "120%",
  },

  "strong, p": {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
});

const SectionTitle = styled("h2", {
  fontSize: "32px",
  marginBottom: "24px",
  textAlign: "center",
  
  variants: {
    isDark: {
      true: { color: "#f0f0f0" },
      false: { color: "#191414" },
    },
  },
});

const Listening = () => {
  const t = useLocale();
  const { isMobile } = useMobileDetect();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: nowPlayingData, isLoading: isNowPlayingLoading } =
    useQuery<NowPlayingResponse>(
      "nowPlaying",
      async () => (await axios.get("/api/now-playing")).data,
      {
        refetchInterval: 30000,
      }
    );

  const { error, data: recentData } = useQuery<Tracks>(
    "spotify",
    async () => (await axios.get("/api/top-tracks")).data
  );

  const tracks = recentData?.tracks?.items?.slice(0, 8);

  if (!mounted) return null;

  return (
    <PageContainer isDark={isDark}>
      <HeadSEO />

      <NowPlayingSection>
        <SectionTitle isDark={isDark}>
          What I&apos;m{" "}
          <Text as="span" size="xlg" css={{ color: "#1DB954" }}>
            Listening
          </Text>
        </SectionTitle>

        <SpotifyNowPlaying
          song={nowPlayingData?.song || null}
          isLoading={isNowPlayingLoading}
        />
      </NowPlayingSection>

      <Spacer size="md" />

      {tracks && tracks.length > 0 && (
        <Suspense fallback="Loading">
          <Container>
            <Text 
              as="h2" 
              size="xlg" 
              css={{ 
                color: isDark ? "#f0f0f0" : "$dark600",
                marginBottom: "16px"
              }}
            >
              {t.recents || "Recently"}
              <Text
                as="span"
                size="xlg"
                css={{
                  color: "#1DB954",
                }}
              >
                {" "}
                {t.played_songs || "played songs"}
              </Text>
            </Text>
            <Grid columns={isMobile() ? "2" : "4"}>
              {tracks?.map((recent) => {
                return (
                  <div key={recent.track.id} data-id={recent.track.id}>
                    <Link href={recent.track.external_urls?.spotify} passHref>
                      <a target="_blank" rel="noopener noreferrer">
                        <SpotifyCard
                          css={{
                            backgroundImage: `url(${recent.track.album.images[0].url})`,
                          }}
                        >
                          <Text as="strong" size="md" css={{ color: "#1DB954" }}>
                            {recent.track.name}
                          </Text>
                          <Text as="p" size="sm" css={{ color: "$white" }}>
                            {recent.track.artists[0].name}
                          </Text>
                        </SpotifyCard>
                      </a>
                    </Link>
                  </div>
                );
              })}
            </Grid>
          </Container>
        </Suspense>
      )}

      <Spacer size="lg" />
    </PageContainer>
  );
};

export default Listening;
