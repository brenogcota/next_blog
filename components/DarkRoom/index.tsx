import { useEffect, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import { styled, keyframes } from '@stitches/react';
import Text from 'ui/Text';
import { useLocale } from 'context/locale';
import settings from 'production.json';
import { Grid } from 'ui/Column';

const pulse = keyframes({
  '0%, 100%': { opacity: 0.6 },
  '50%': { opacity: 1 },
});

const Container = styled('div', {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
  transition: 'background-color 0.3s ease',
  
  variants: {
    isDark: {
      true: {
        backgroundColor: '#0a0a0a',
        cursor: 'none',
      },
      false: {
        backgroundColor: 'transparent',
        cursor: 'auto',
      },
    },
  },
});

const SpotlightOverlay = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
  zIndex: 100,
  transition: 'opacity 0.5s ease',
});

const Content = styled('main', {
  position: 'relative',
  padding: '80px 20px',
  zIndex: 1,
  transition: 'color 0.3s ease',

  '@media (min-width: 640px)': {
    padding: '100px 62px',
  },
});

const HintText = styled('div', {
  position: 'fixed',
  bottom: '40px',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 200,
  textAlign: 'center',
  animation: `${pulse} 2s ease-in-out infinite`,
});

const CustomCursor = styled('div', {
  position: 'fixed',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 200, 100, 0.8)',
  boxShadow: '0 0 30px 15px rgba(255, 180, 80, 0.4), 0 0 60px 30px rgba(255, 150, 50, 0.2)',
  pointerEvents: 'none',
  zIndex: 300,
  transform: 'translate(-50%, -50%)',
  transition: 'opacity 0.3s ease',
});

const DarkRoom = () => {
  const t = useLocale();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const isDark = theme === 'dark';

  // Check URL query param on mount and set theme
  useEffect(() => {
    setMounted(true);
    
    // Get mode from URL query param
    const urlMode = router.query.mode as string;
    if (urlMode === 'dark' || urlMode === 'light') {
      setTheme(urlMode);
    }
  }, [router.query.mode, setTheme]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      // Update URL without reload
      router.push({ query: { ...router.query, mode: newTheme } }, undefined, { shallow: true });
    }
  }, [setTheme, theme, router]);

  useEffect(() => {
    if (!mounted) return;
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mounted, handleMouseMove, handleKeyDown]);

  if (!mounted) return null;

  const spotlightStyle = isDark ? {
    background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(10, 10, 10, 0.85) 80%, rgba(10, 10, 10, 0.98) 100%)`,
  } : {};

  // Dynamic colors based on theme
  const colors = {
    title: isDark ? '#f0f0f0' : '$dark600',
    text: isDark ? '#c0c0c0' : '$dark500',
    subtext: isDark ? '#a0a0a0' : '$dark500',
    hint: isDark ? 'rgba(255, 200, 100, 0.8)' : 'rgba(100, 100, 100, 0.6)',
  };

  return (
    <Container isDark={isDark}>
      {isDark && (
        <>
          <SpotlightOverlay style={spotlightStyle} />
          <CustomCursor 
            style={{ 
              left: mousePos.x, 
              top: mousePos.y,
              opacity: mousePos.x > 0 ? 1 : 0
            }} 
          />
        </>
      )}

      <Content>
        <Grid
          columns="2"
          css={{
            gridTemplateColumns: '90% 0%',
            '@media (min-width: 640px)': {
              gridTemplateColumns: '60% 30%',
              columnGap: '10%',
            },
          }}
        >
          <div>
            <Text
              as="h1"
              size="xlg"
              css={{
                fontSize: '32px',
                marginBottom: '24px',
                color: colors.title,
                '@media (min-width: 640px)': {
                  fontSize: '48px',
                },
              }}
            >
              {t.title || "Hello, I'm Breno"}
            </Text>

            <Text
              size="md"
              css={{
                color: colors.text,
                lineHeight: 1.7,
                marginBottom: '16px',
              }}
            >
              {t.about || "I'm a software developer"}
              <Text
                as="a"
                size="md"
                href={settings.work_company}
                css={{
                  color: '#7AB441',
                  fontWeight: 600,
                }}
              >
                {' '}@Jusbrasil
              </Text>
            </Text>

            <Text
              size="md"
              css={{
                color: colors.text,
                lineHeight: 1.7,
                marginBottom: '40px',
              }}
            >
              {t.about_2 || "Check out my projects"}
              <Text
                as="a"
                size="md"
                href={settings.github}
                css={{
                  color: '#20D760',
                  fontWeight: 600,
                }}
              >
                {' '}{t.here || 'here'}.
              </Text>
            </Text>

            {/* <Grid columns="3" css={{ marginTop: '40px', gap: '20px' }}>
              <div>
                <Text as="strong" size="md" css={{ color: colors.title }}>
                  {t.experience || 'Experience'}
                </Text>
                <br />
                <Text size="sm" css={{ color: colors.subtext }}>
                  Freelancer
                  <br />
                  may 2020 - jul 2020
                </Text>
                <Text size="sm" css={{ color: colors.subtext }}>
                  Codeby
                  <br />
                  out 2020 - apr 2022
                </Text>
                <Text size="sm" css={{ color: colors.subtext }}>
                  Hotmart
                  <br />
                  may 2022 - current
                </Text>
              </div>

              <div>
                <Text as="strong" size="md" css={{ color: colors.title }}>
                  Dev Stack
                </Text>
                <br />
                <Text size="sm" css={{ color: colors.subtext }}>React JS</Text>
                <Text size="sm" css={{ color: colors.subtext }}>GraphQl</Text>
                <Text size="sm" css={{ color: colors.subtext }}>Typescript</Text>
                <Text size="sm" css={{ color: colors.subtext }}>Node</Text>
              </div>

              <div>
                <Text as="strong" size="md" css={{ color: colors.title }}>
                  Links
                </Text>
                <br />
                <Text as="a" size="sm" href={settings.links?.github} css={{ color: colors.subtext, display: 'block' }}>
                  Github
                </Text>
                <Text as="a" size="sm" href={settings.links?.linkedin} css={{ color: colors.subtext, display: 'block' }}>
                  LinkedIn
                </Text>
                <Text as="a" size="sm" href={settings.links?.instagram} css={{ color: colors.subtext, display: 'block' }}>
                  Instagram
                </Text>
              </div>
            </Grid> */}
          </div>
        </Grid>
      </Content>

      <HintText>
        <Text
          size="sm"
          css={{
            color: colors.hint,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontSize: '12px',
          }}
        >
          {isDark ? '✨ tap space to turn on the light ✨' : '💡 tap space to turn off the light 💡'}
        </Text>
      </HintText>
    </Container>
  );
};

export default DarkRoom;
