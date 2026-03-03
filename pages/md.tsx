import { useEffect, useState, useCallback, useRef } from "react";
import { styled } from "../stitches.config";
import Head from "next/head";
import Script from "next/script";

declare global {
  interface Window {
    marked: {
      parse: (markdown: string) => string;
    };
    hljs: {
      highlightAll: () => void;
      highlightElement: (element: HTMLElement) => void;
    };
  }
}

const Container = styled("div", {
  display: "flex",
  height: "100vh",
  margin: 0,
  fontFamily: "sans-serif",
  flexDirection: "row",
  overflow: "hidden",
});

const Panel = styled("div", {
  height: "100%",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

const TextArea = styled("textarea", {
  width: "100%",
  height: "100%",
  padding: "20px",
  border: "none",
  outline: "none",
  resize: "none",
  fontSize: "14px",
  fontFamily: "monospace",
  backgroundColor: "$background",
  color: "$text",
  boxSizing: "border-box",
});

const Resizer = styled("div", {
  width: "6px",
  background: "$gray600",
  cursor: "col-resize",
  flexShrink: 0,
  transition: "background 0.2s",
  "&:hover": {
    background: "$primary",
  },
  variants: {
    active: {
      true: {
        background: "$primary",
      },
    },
  },
});

const Preview = styled("div", {
  width: "100%",
  height: "100%",
  padding: "20px",
  overflow: "auto",
  backgroundColor: "$background",
  color: "$text",
  boxSizing: "border-box",
  "& h1, & h2, & h3, & h4, & h5, & h6": {
    marginTop: "1em",
    marginBottom: "0.5em",
  },
  "& p": {
    marginBottom: "1em",
    lineHeight: 1.6,
  },
  "& code": {
    backgroundColor: "rgba(128, 128, 128, 0.2)",
    padding: "2px 6px",
    borderRadius: "4px",
    fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
    fontSize: "0.9em",
  },
  "& pre": {
    backgroundColor: "rgba(40, 44, 52, 0.95)",
    padding: "16px",
    borderRadius: "8px",
    overflow: "auto",
    margin: "1em 0",
    minHeight: "auto",
    "& code": {
      backgroundColor: "transparent",
      padding: 0,
      color: "#abb2bf",
      display: "block",
      fontSize: "13px",
      lineHeight: 1.5,
    },
  },
  "& blockquote": {
    borderLeft: "4px solid $primary",
    margin: "1em 0",
    paddingLeft: "1em",
    color: "$dark500",
  },
  "& ul, & ol": {
    paddingLeft: "1.5em",
    marginBottom: "1em",
  },
  "& li": {
    marginBottom: "0.5em",
  },
  "& a": {
    color: "$primary",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  "& img": {
    maxWidth: "100%",
  },
  "& table": {
    borderCollapse: "collapse",
    width: "100%",
    marginBottom: "1em",
  },
  "& th, & td": {
    border: "1px solid $gray600",
    padding: "8px 12px",
    textAlign: "left",
  },
  "& th": {
    backgroundColor: "rgba(128, 128, 128, 0.1)",
  },
  "& hr": {
    border: "none",
    borderTop: "1px solid $gray600",
    margin: "2em 0",
  },
});

const ShareButton = styled("button", {
  position: "fixed",
  bottom: "20px",
  left: "16px",
  padding: "10px 20px",
  backgroundColor: "$primary",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  transition: "opacity 0.2s",
  marginRight: "16px",
  "&:hover": {
    opacity: 0.9,
  },
});

const ClearButton = styled("button", {
  position: "fixed",
  bottom: "20px",
  left: "112px",
  padding: "10px 20px",
  backgroundColor: "$dark500",
  color: "$background",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
  transition: "opacity 0.2s",
  "&:hover": {
    opacity: 0.9,
  },
});

const Toast = styled("div", {
  position: "fixed",
  bottom: "70px",
  left: "20px",
  padding: "10px 20px",
  backgroundColor: "$dark600",
  color: "$background",
  borderRadius: "8px",
  fontSize: "14px",
  opacity: 0,
  transition: "opacity 0.3s",
  variants: {
    visible: {
      true: {
        opacity: 1,
      },
    },
  },
});

const defaultMarkdown = `# Markdown Previewer

Write your **markdown** here and see the preview on the right!

## Features

- Live preview
- Share via URL
- Syntax highlighting for code

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote

Visit [GitHub](https://github.com) for more info.
`;

export default function MarkdownPage() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [markedLoaded, setMarkedLoaded] = useState(false);
  const [hljsLoaded, setHljsLoaded] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const highlightCode = useCallback(() => {
    if (typeof window !== "undefined" && window.hljs && previewRef.current) {
      const codeBlocks = previewRef.current.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        window.hljs.highlightElement(block as HTMLElement);
      });
    }
  }, []);

  const render = useCallback((text: string) => {
    if (typeof window !== "undefined" && window.marked) {
      setHtml(window.marked.parse(text));
    }
  }, []);

  // Apply syntax highlighting after HTML is set
  useEffect(() => {
    if (html && hljsLoaded) {
      // Small delay to ensure DOM is updated
      setTimeout(highlightCode, 10);
    }
  }, [html, hljsLoaded, highlightCode]);

  // Handle resize
  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Clamp between 20% and 80%
    setLeftWidth(Math.min(80, Math.max(20, newWidth)));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Load from hash on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.length > 1) {
      try {
        const decoded = decodeURIComponent(
          atob(window.location.hash.slice(1))
        );
        setMarkdown(decoded);
        if (markedLoaded) {
          render(decoded);
        }
      } catch {
        setMarkdown(defaultMarkdown);
        if (markedLoaded) {
          render(defaultMarkdown);
        }
      }
    } else {
      setMarkdown(defaultMarkdown);
      if (markedLoaded) {
        render(defaultMarkdown);
      }
    }
  }, [markedLoaded, render]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMarkdown(value);
    render(value);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const share = () => {
    const encoded = btoa(encodeURIComponent(markdown));
    const url = window.location.origin + window.location.pathname + "#" + encoded;
    navigator.clipboard.writeText(url).then(() => {
      showToast("Link copied to clipboard!");
    }).catch(() => {
      showToast("Failed to copy link");
    });
  };

  const clear = () => {
    setMarkdown("");
    setHtml("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  return (
    <>
      <Head>
        <title>Markdown Previewer</title>
        <meta name="description" content="A simple markdown previewer with shareable links" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
        />
      </Head>
      <Script
        src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"
        onLoad={() => {
          setMarkedLoaded(true);
        }}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
        onLoad={() => {
          setHljsLoaded(true);
        }}
      />
      <Container ref={containerRef}>
        <Panel style={{ width: `${leftWidth}%` }}>
          <TextArea
            id="md"
            value={markdown}
            onChange={handleInput}
            placeholder="Write your markdown here..."
          />
        </Panel>
        <Resizer 
          onMouseDown={handleMouseDown}
          active={isDragging}
        />
        <Panel style={{ width: `${100 - leftWidth}%` }}>
          <Preview
            id="out"
            ref={previewRef}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Panel>
      </Container>
      <ShareButton onClick={share}>Share</ShareButton>
      <ClearButton onClick={clear}>Clear</ClearButton>
      <Toast visible={toastVisible}>{toastMessage}</Toast>
    </>
  );
}
