import { useEffect, useState, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { styled, keyframes } from "@stitches/react";
import Text from "ui/Text";
import { useLocale } from "context/locale";
import settings from "production.json";
import { Grid } from "ui/Column";
import CandleCursor from "./cursor";

const pulse = keyframes({
  "0%, 100%": { opacity: 0.6 },
  "50%": { opacity: 1 },
});

const Container = styled("div", {
  position: "relative",
  width: "100%",
  overflow: "hidden",
  transition: "background-color 0.3s ease",

  variants: {
    isDark: {
      true: {
        backgroundColor: "#0a0a0a",
        cursor: "none",
      },
      false: {
        backgroundColor: "transparent",
        cursor: "auto",
      },
    },
  },
});

const SpotlightOverlay = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 100,
  transition: "opacity 0.5s ease",
});

const Content = styled("main", {
  position: "relative",
  padding: "80px 20px",
  zIndex: 1,
  transition: "color 0.3s ease",

  "@media (min-width: 640px)": {
    padding: "100px 62px",
  },
});

const HintText = styled("div", {
  position: "fixed",
  bottom: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 200,
  textAlign: "center",
  animation: `${pulse} 2s ease-in-out infinite`,
});

const CustomCursor = styled("div", {
  position: "fixed",
  width: "12px",
  height: "28px",
  borderRadius: "6px",
  zIndex: 300,
  background:
    "radial-gradient(circle at 50% 0%, rgba(255, 200, 120, 0.18), rgba(255, 200, 120, 0.08) 35%, #0e0e0e 70%)",
  pointerEvents: "none",
  transform: "translate(-50%, -50%)",

  // 🌕 Iluminação geral (halo)
  boxShadow: `
    0 0 45px 22px rgba(255, 180, 80, 0.35),
    0 0 90px 45px rgba(255, 140, 60, 0.18)
  `,
  animation: `lightBreath 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,

  // 🔥 Chama
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-16px",
    left: "50%",
    width: "8px",
    height: "16px",
    borderRadius: "50%",
    transform:
      "translateX(calc(-50% + var(--wind-x))) translateY(var(--wind-y))",
    background:
      "radial-gradient(circle at 50% 30%, #ffffff 0%, #ffd27d 35%, #ff9f43 60%, rgba(255, 140, 60, 0.15) 75%)",
    filter: "blur(0.6px)",
    transformOrigin: "50% 80%",
    transition: "transform 0.15s ease-out",
    animation: "flameBreath 2s ease-in-out infinite",
  },

  // 🕯️ Pavio iluminado
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-5px",
    left: "50%",
    width: "2px",
    height: "7px",
    transform: "translateX(-50%)",
    background: `
      radial-gradient(
        circle at 50% 0%,
        rgba(255, 200, 120, 0.7),
        rgba(255, 200, 120, 0.25) 40%,
        #000 70%
      )
    `,
    borderRadius: "2px",
  },
});

const DarkRoom = () => {
  const t = useLocale();
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const lastTapRef = useRef<number>(0);

  const isDark = theme === "dark";

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    router.push({ query: { ...router.query, mode: newTheme } }, undefined, {
      shallow: true,
    });
  }, [theme, setTheme, router]);

  // Check URL query param on mount and set theme
  useEffect(() => {
    setMounted(true);

    // Get mode from URL query param
    const urlMode = router.query.mode as string;
    if (urlMode === "dark" || urlMode === "light") {
      setTheme(urlMode);
    }
  }, [router.query.mode, setTheme]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  }, []);

  const handleDoubleTap = useCallback(() => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      toggleTheme();
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  }, [toggleTheme]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggleTheme();
      }
    },
    [toggleTheme],
  );

  useEffect(() => {
    if (!mounted) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleDoubleTap);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDoubleTap);
    };
  }, [
    mounted,
    handleMouseMove,
    handleKeyDown,
    handleTouchMove,
    handleDoubleTap,
  ]);

  if (!mounted) return null;

  const spotlightStyle = isDark
    ? {
        background: `
        radial-gradient(
          circle 180px
          at ${mousePos.x}px ${mousePos.y}px,
          transparent 0%,
          rgba(10, 10, 10, 0.85) 75%,
          rgba(10, 10, 10, 0.98) 100%
        )
      `,
      }
    : {};

  // Dynamic colors based on theme
  const colors = {
    title: isDark ? "#f0f0f0" : "$dark600",
    text: isDark ? "#c0c0c0" : "$dark500",
    subtext: isDark ? "#a0a0a0" : "$dark500",
    hint: isDark ? "rgba(255, 200, 100, 0.8)" : "rgba(100, 100, 100, 0.6)",
  };

  return (
    <Container isDark={isDark}>
      {isDark && (
        <>
          <SpotlightOverlay style={spotlightStyle} />
          <CandleCursor mousePos={mousePos} />
        </>
      )}

      <Content>
        <Grid
          columns="2"
          css={{
            gridTemplateColumns: "90% 0%",
            "@media (min-width: 640px)": {
              gridTemplateColumns: "60% 30%",
              columnGap: "10%",
            },
          }}
        >
          <div>
            <Text
              as="h1"
              size="xlg"
              css={{
                fontSize: "32px",
                marginBottom: "24px",
                color: colors.title,
                "@media (min-width: 640px)": {
                  fontSize: "48px",
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
                marginBottom: "16px",
              }}
            >
              {t.about || "I'm a software developer"}
              <Text
                as="a"
                size="md"
                href={settings.work_company}
                css={{
                  color: "#7AB441",
                  fontWeight: 600,
                }}
              >
                {" "}
                @Jusbrasil
              </Text>
            </Text>

            <Text
              size="md"
              css={{
                color: colors.text,
                lineHeight: 1.7,
                marginBottom: "40px",
              }}
            >
              {t.about_2 || "Check out my projects"}
              <Text
                as="a"
                size="md"
                href={settings.github}
                css={{
                  color: "#20D760",
                  fontWeight: 600,
                }}
              >
                {" "}
                {t.here || "here"}.
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
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontSize: "12px",
            display: "none",
            "@media (min-width: 640px)": {
              display: "block",
            },
          }}
        >
          {isDark
            ? "✨ tap space to turn on the light ✨"
            : "💡 tap space to turn off the light 💡"}
        </Text>
        <Text
          size="sm"
          css={{
            color: colors.hint,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontSize: "12px",
            display: "block",
            "@media (min-width: 640px)": {
              display: "none",
            },
          }}
        >
          {isDark
            ? "✨ double tap to turn on the light ✨"
            : "💡 double tap to turn off the light 💡"}
        </Text>
      </HintText>
    </Container>
  );
};

export default DarkRoom;
