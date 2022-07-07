import axios from "axios";
import { useLocale } from "context/locale";
import { useQuery } from "react-query";
import { styled } from "stitches.config";
import Spotify from "ui/Spotify";
import Text from "ui/Text";

type Playing = {
  song: {
    timestamp: number;
    progress_ms: number;
    item: {
      id: string;
      name: string;
      album: {
        images: { url: string }[];
      };
      preview_url: string;
      artists: { name: string }[];
      external_urls: { spotify: string }
    };
    is_playing: boolean
  };
};

const Card = styled("div", {
  background: "$background",
  padding: 20,
  border: "1px solid $primary",
  position: "fixed",
  right: 10,
  top: 80,
  zIndex: 4,
  minWidth: "280px",
});

const style = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  marginRight: '15px'
}

const Playing = ({ onlyIcon = false }: { onlyIcon?: boolean }) => {
  const t = useLocale();
  const { error, data } = useQuery<Playing>(
    "now-playing",
    async () => (await axios.get("/api/now-playing")).data
  );

  const playing = data?.song;

  return (
    <a
      href={playing?.is_playing ? playing?.item?.external_urls.spotify : '#'}
      target="_blank"
      rel="noreferrer"
      style={style}
    >
      {
        onlyIcon ? (
          <>
            <Spotify />
          </>
        ) :
        (
          <>
            <Spotify />
            {
              playing?.is_playing ? (
                <>
                  <Text as="span" size="sm">{playing?.item?.name}</Text>
                  {' - '}
                  <Text as="span" size="sm">
                    {playing?.item?.artists[0].name}
                  </Text>
                </>
              ) :     
              (
                <Text as="span" size="sm">Not playing</Text>
              )
            }
          </>
        )
      }
    </a>
  );
};

export default Playing;
