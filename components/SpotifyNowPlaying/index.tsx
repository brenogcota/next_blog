import { useState, useEffect } from 'react';
import { styled, keyframes } from '@stitches/react';
import { useTheme } from 'next-themes';

const bounce = keyframes({
  '0%, 100%': { transform: 'scaleY(0.3)' },
  '50%': { transform: 'scaleY(1)' },
});

const progress = keyframes({
  '0%': { width: '0%' },
  '100%': { width: '100%' },
});

const PlayerWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  padding: '16px',
  borderRadius: '12px',
  maxWidth: '360px',
  margin: '0 auto',
  transition: 'all 0.3s ease',

  variants: {
    isDark: {
      true: {
        backgroundColor: '#181818',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
      },
      false: {
        backgroundColor: '#f5f5f5',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
});

const AlbumArt = styled('div', {
  width: '80px',
  height: '80px',
  borderRadius: '8px',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  flexShrink: 0,
});

const TrackInfo = styled('div', {
  flex: 1,
  minWidth: 0,
});

const TrackName = styled('p', {
  fontSize: '14px',
  fontWeight: 600,
  margin: '0 0 4px 0',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  
  variants: {
    isDark: {
      true: { color: '#fff' },
      false: { color: '#191414' },
    },
  },
});

const ArtistName = styled('p', {
  fontSize: '12px',
  margin: '0 0 8px 0',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  
  variants: {
    isDark: {
      true: { color: '#b3b3b3' },
      false: { color: '#666' },
    },
  },
});

const ProgressBar = styled('div', {
  width: '100%',
  height: '3px',
  borderRadius: '2px',
  overflow: 'hidden',
  
  variants: {
    isDark: {
      true: { backgroundColor: '#404040' },
      false: { backgroundColor: '#ddd' },
    },
  },
});

const ProgressFill = styled('div', {
  height: '100%',
  backgroundColor: '#1DB954',
  borderRadius: '2px',
  animation: `${progress} 30s linear infinite`,
});

const Controls = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const ControlButton = styled('button', {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '6px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',

  '&:hover': {
    transform: 'scale(1.1)',
  },

  variants: {
    isDark: {
      true: { color: '#b3b3b3', '&:hover': { color: '#fff' } },
      false: { color: '#666', '&:hover': { color: '#191414' } },
    },
    isMain: {
      true: {
        backgroundColor: '#1DB954',
        color: '#000 !important',
        width: '36px',
        height: '36px',
        '&:hover': {
          backgroundColor: '#1ed760',
        },
      },
    },
    isLiked: {
      true: {
        color: '#1DB954 !important',
      },
    },
  },
});

const PlayingIndicator = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  height: '14px',
});

const Bar = styled('div', {
  width: '2px',
  height: '100%',
  backgroundColor: '#1DB954',
  borderRadius: '1px',
  animation: `${bounce} 0.5s ease-in-out infinite`,

  '&:nth-child(2)': { animationDelay: '0.1s' },
  '&:nth-child(3)': { animationDelay: '0.2s' },
});

const NotPlayingContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '16px',
  borderRadius: '12px',
  maxWidth: '300px',
  margin: '0 auto',

  variants: {
    isDark: {
      true: {
        backgroundColor: '#181818',
      },
      false: {
        backgroundColor: '#f5f5f5',
      },
    },
  },
});

const NotPlayingText = styled('p', {
  fontSize: '13px',
  margin: 0,
  
  variants: {
    isDark: {
      true: { color: '#b3b3b3' },
      false: { color: '#666' },
    },
  },
});

// Icons
const SpotifyLogo = () => (
  <svg viewBox="0 0 24 24" fill="#1DB954" width={24} height={24}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const PrevIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z"/>
  </svg>
);

const NextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2V6z"/>
  </svg>
);

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7L8 5z"/>
  </svg>
);

const PauseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

type NowPlayingSong = {
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

type SpotifyNowPlayingProps = {
  song: NowPlayingSong | null;
  isLoading?: boolean;
};

const SpotifyNowPlaying = ({ song, isLoading }: SpotifyNowPlayingProps) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isLoading) {
    return (
      <NotPlayingContainer isDark={isDark}>
        <SpotifyLogo />
        <NotPlayingText isDark={isDark}>Loading...</NotPlayingText>
      </NotPlayingContainer>
    );
  }

  if (!song || !song.is_playing || !song.item) {
    return (
      <NotPlayingContainer isDark={isDark}>
        <SpotifyLogo />
        <NotPlayingText isDark={isDark}>
          Not playing anything
        </NotPlayingText>
      </NotPlayingContainer>
    );
  }

  return (
    <a
      href={song.item.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <PlayerWrapper isDark={isDark}>
        <AlbumArt
          css={{
            backgroundImage: `url(${song.item.album.images[0]?.url || ''})`,
          }}
        />

        <TrackInfo>
          <TrackName isDark={isDark}>{song.item.name}</TrackName>
          <ArtistName isDark={isDark}>
            {song.item.artists.map((a) => a.name).join(', ')}
          </ArtistName>
          <ProgressBar isDark={isDark}>
            <ProgressFill />
          </ProgressBar>
        </TrackInfo>

        <Controls>
          <ControlButton isDark={isDark} onClick={(e) => e.preventDefault()}>
            <PrevIcon />
          </ControlButton>
          <ControlButton isMain onClick={(e) => e.preventDefault()}>
            {song.is_playing ? <PauseIcon /> : <PlayIcon />}
          </ControlButton>
          <ControlButton isDark={isDark} onClick={(e) => e.preventDefault()}>
            <NextIcon />
          </ControlButton>
        </Controls>

        <ControlButton 
          isDark={isDark} 
          isLiked={isLiked}
          onClick={(e) => {
            e.preventDefault();
            setIsLiked(!isLiked);
          }}
        >
          <HeartIcon filled={isLiked} />
        </ControlButton>

        <PlayingIndicator>
          <Bar />
          <Bar />
          <Bar />
        </PlayingIndicator>
      </PlayerWrapper>
    </a>
  );
};

export default SpotifyNowPlaying;
