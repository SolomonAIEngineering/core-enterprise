import {
  BundledLanguage,
  Highlighter,
  getHighlighter as _getHighlighter,
  bundledLanguages,
} from 'shiki'

export type { Highlighter }

let highlighter: Highlighter | null = null

export const getHighlighter = async (): Promise<Highlighter> => {
  if (highlighter) {
    return highlighter
  }
  highlighter = await _getHighlighter({
    langs: Object.keys(bundledLanguages),
    themes: ['catppuccin-latte', 'catppuccin-mocha'],
  })
  return highlighter
}

const SyntaxHighlighterServer = ({
  lang,
  code,
  highlighter,
}: {
  lang: BundledLanguage
  code: string
  highlighter: Highlighter
}) => {
  const html = highlighter.codeToHtml(code, {
    lang,
    themes: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
  })
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}

export default SyntaxHighlighterServer