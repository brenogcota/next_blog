import axios from "axios";
import { useLocale } from "context/locale";
import Image from "next/image";
import { useQuery } from "react-query";
import { styled } from "stitches.config";
import Text from "ui/Text";

type Playing = {
  playing: {
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
    };
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

const Playing = () => {
  const t = useLocale();
  const { error, data } = useQuery<Playing>(
    "spotify",
    async () => (await axios.get("/api/spotify")).data
  );

  const playing = data?.playing;

  if (error || !playing?.progress_ms) return <></>;

  return (
    <Card>
      <Text size="sm">{t.playing}</Text>
      {playing?.item?.album.images[0].url && (
        <Image
          src={playing?.item?.album.images[0].url ?? ""}
          alt={playing?.item?.name}
          height="100"
          width="100"
        />
      )}
      <div>
        <Text size="sm">{playing?.item?.name}</Text>
        <Text as="span" size="sm">
          {playing?.item?.artists[0].name}
        </Text>
      </div>
    </Card>
  );
};

export default Playing;
