type CodeThemes = { light: object; dark: object };

// Shiki themes matching the site palette: a violet-tinted ink, violet keywords
// and lime strings, so code reads as part of the page rather than a pasted-in
// editor theme. Shared by Markdown code fences and the homepage code panels.

const palette = (p: {
  name: string;
  type: "light" | "dark";
  bg: string;
  fg: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  fn: string;
}) => ({
  name: p.name,
  type: p.type,
  colors: { "editor.background": p.bg, "editor.foreground": p.fg },
  settings: [
    { settings: { foreground: p.fg, background: p.bg } },
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: p.comment } },
    {
      scope: [
        "keyword",
        "storage",
        "storage.type",
        "storage.modifier",
        "constant.language",
        "support.type.primitive",
        "keyword.control",
        "keyword.operator.new",
        "entity.name.tag",
      ],
      settings: { foreground: p.keyword },
    },
    { scope: ["string", "string.quoted", "punctuation.definition.string"], settings: { foreground: p.string } },
    { scope: ["constant.numeric", "constant.character"], settings: { foreground: p.number } },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call", "entity.name.type", "support.class"],
      settings: { foreground: p.fn },
    },
    { scope: ["variable", "variable.other", "variable.parameter"], settings: { foreground: p.fg } },
  ],
});

export const codeThemes: CodeThemes = {
  light: palette({
    name: "frankenphp-light",
    type: "light",
    bg: "#f8f6fb",
    fg: "#2a2433",
    comment: "#6c657a",
    keyword: "#6d28d9",
    string: "#4f6b12",
    number: "#4f6b12",
    fn: "#16111e",
  }),
  dark: palette({
    name: "frankenphp-dark",
    type: "dark",
    bg: "#120e19",
    fg: "#e6e2ee",
    comment: "#8e869c",
    keyword: "#c4b5fd",
    string: "#d4e88a",
    number: "#d4e88a",
    fn: "#faf8fd",
  }),
};
