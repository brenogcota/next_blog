import axios from "axios";
import { Suspense, useEffect, useState } from "react";
import { styled } from "stitches.config";
import Text from "ui/Text";
import HeadSEO from "components/Head";
import { useQuery } from "react-query";
import { useLocale } from "context/locale";
import Link from "next/link";
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
  padding: "0 16px",
  
  "@media (min-width: 640px)": {
    padding: "0",
  },
  
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
  padding: "0",
  maxWidth: "100%",
  overflow: "hidden",

  "@media (min-width: 640px)": {
    padding: "0 62px",
  },
});

const NowPlayingSection = styled("section", {
  padding: "40px 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  "@media (min-width: 640px)": {
    padding: "60px 62px",
  },
});

const SpotifyCard = styled("div", {
  width: "100%",
  paddingBottom: "100%", // aspect ratio fallback
  objectFit: "cover",
  backgroundSize: "cover",
  borderRadius: "8px",
  transition: "all .2s",
  cursor: "pointer",
  position: "relative",
  backgroundPosition: "center",

  "@media (min-width: 640px)": {
    borderRadius: "12px",
  },

  "&::after": {
    content: "",
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage:
      "linear-gradient(to top, rgba(0, 0, 0, .85) 0%, rgba(0, 0, 0, 0) 35%)",
    borderRadius: "8px",
    
    "@media (min-width: 640px)": {
      borderRadius: "12px",
    },
  },

  "&:hover": {
    backgroundSize: "110%",
  },

  "strong, p": {
    position: "absolute",
    bottom: 8,
    left: 8,
    right: 8,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "12px",
    
    "@media (min-width: 640px)": {
      bottom: 10,
      left: 10,
      right: 10,
      fontSize: "14px",
    },
  },
});

const TracksGrid = styled("div", {
  display: "grid",
  gap: "8px",
  gridTemplateColumns: "repeat(2, 1fr)",
  width: "100%",
  
  "@media (min-width: 640px)": {
    gap: "16px",
    gridTemplateColumns: "repeat(4, 1fr)",
  },
});

const SectionTitle = styled("h2", {
  fontSize: "20px",
  marginBottom: "16px",
  textAlign: "center",
  
  "@media (min-width: 640px)": {
    fontSize: "32px",
    marginBottom: "24px",
  },
  
  variants: {
    isDark: {
      true: { color: "#f0f0f0" },
      false: { color: "#191414" },
    },
  },
});

const Listening = () => {
  const t = useLocale();
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
          <span style={{ color: "#1DB954" }}>
            Listening
          </span>
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
              css={{ 
                color: isDark ? "#f0f0f0" : "#333",
                marginBottom: "16px",
                fontSize: "18px",
                "@media (min-width: 640px)": {
                  fontSize: "28px",
                },
              }}
            >
              {t.recents || "Recently"}
              <Text
                as="span"
                css={{
                  color: "#1DB954",
                  fontSize: "inherit",
                }}
              >
                {" "}
                {t.played_songs || "played songs"}
              </Text>
            </Text>
            <TracksGrid>
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
                          <Text as="strong" css={{ color: "#1DB954" }}>
                            {recent.track.name}
                          </Text>
                          <Text as="p" css={{ color: "#fff" }}>
                            {recent.track.artists[0].name}
                          </Text>
                        </SpotifyCard>
                      </a>
                    </Link>
                  </div>
                );
              })}
            </TracksGrid>
          </Container>
        </Suspense>
      )}

      <Spacer size="lg" />
    </PageContainer>
  );
};

export default Listening;
