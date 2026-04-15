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
// We use min-light / min-dark — Anthony Fu's near-monochrome Shiki themes.
// They lean on weight and italic rather than hue, so code reads as a quieter
// register of the editorial prose around it.
//
// All frame chrome (border, radius, titlebar fill, dots, copy button) is
// zeroed out here and in global.css — the filename tab is restyled there as
// a small uppercase mono caption above the code body to match the site's
// other section labels.
export default defineEcConfig({
  themes: ["min-light", "min-dark"],
  themeCssRoot: ":root",
  themeCssSelector: (theme) => (theme.type === "dark" ? ".dark" : ":root"),
  useDarkModeMediaQuery: false,
  useThemedScrollbars: false,
  useThemedSelectionColors: false,
  styleOverrides: {
    borderRadius: "0",
    borderWidth: "0",
    borderColor: "transparent",
    codeFontFamily: "var(--font-mono)",
    codeFontSize: "0.8125rem",
    codeLineHeight: "1.7",
    codePaddingBlock: "0.875rem",
    codePaddingInline: "1rem",
    uiFontFamily: "var(--font-mono)",
    uiFontSize: "0.6875rem",
    frames: {
      frameBoxShadowCssValue: "none",
      editorTabBarBackground: "transparent",
      editorActiveTabBackground: "transparent",
      editorActiveTabBorderColor: "transparent",
      editorActiveTabIndicatorBottomColor: "transparent",
      editorTabBarBorderBottomColor: "transparent",
      terminalTitlebarBackground: "transparent",
      terminalTitlebarBorderBottomColor: "transparent",
      terminalTitlebarDotsOpacity: "0",
      terminalBackground: "transparent",
      inlineButtonBorder: "transparent",
      inlineButtonBackground: "transparent",
    },
  },
});
