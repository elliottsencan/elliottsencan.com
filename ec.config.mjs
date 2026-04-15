import { defineEcConfig } from "astro-expressive-code";

// Expressive Code configuration. Lives at the project root because the
// <Code /> component loads EC options separately at render time — the Astro
// config serializes to JSON and can't hold functions like `themeCssSelector`
// (see https://expressive-code.com/reference/configuration/#using-a-config-file).
//
// Theme switching keys on the `.dark` class Head.astro sets on <html>.
// useDarkModeMediaQuery stays false so we don't double-handle
// prefers-color-scheme.
//
// Chrome is deliberately minimal: no line numbers, no extra plugins. EC's
// built-in filename tab + hover copy button is the only chrome we keep —
// anything else competes with the editorial prose around it.
export default defineEcConfig({
  themes: ["vitesse-light", "vitesse-dark"],
  themeCssRoot: ":root",
  themeCssSelector: (theme) => (theme.type === "dark" ? ".dark" : ":root"),
  useDarkModeMediaQuery: false,
  useThemedScrollbars: false,
  useThemedSelectionColors: false,
  styleOverrides: {
    borderRadius: "0.25rem",
    borderColor: "var(--ec-border)",
    codeFontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    codeFontSize: "0.8125rem",
    codeLineHeight: "1.65",
    codePaddingBlock: "0.875rem",
    codePaddingInline: "1rem",
    uiFontFamily: "inherit",
    uiFontSize: "0.75rem",
    frames: {
      frameBoxShadowCssValue: "none",
      editorTabBarBackground: "var(--ec-titlebar-bg)",
      editorActiveTabBackground: "var(--ec-titlebar-bg)",
      editorActiveTabBorderColor: "transparent",
      editorActiveTabIndicatorBottomColor: "transparent",
      editorTabBarBorderBottomColor: "var(--ec-border)",
      terminalTitlebarDotsOpacity: "0.5",
    },
  },
});
