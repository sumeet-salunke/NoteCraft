
import './MarkdownToolbar.css'

interface MarkdownToolbarProps {
  onFormat: (before: string, after?: string) => void
}

const MarkdownToolbar = ({ onFormat }: MarkdownToolbarProps) => {
  return (
    <div className="markdown-toolbar" role="toolbar" aria-label="Markdown formatting">
      <button type="button" onClick={() => onFormat('**', '**')} title="Bold">
        <strong>B</strong>
      </button>

      <button type="button" onClick={() => onFormat('*', '*')} title="Italic">
        <em>I</em>
      </button>

      <button type="button" onClick={() => onFormat('~~', '~~')} title="Strikethrough">
        <s>S</s>
      </button>

      <span className="markdown-toolbar__divider" />

      <button type="button" onClick={() => onFormat('# ')} title="Heading 1">
        H1
      </button>

      <button type="button" onClick={() => onFormat('## ')} title="Heading 2">
        H2
      </button>

      <button type="button" onClick={() => onFormat('### ')} title="Heading 3">
        H3
      </button>

      <span className="markdown-toolbar__divider" />

      <button type="button" onClick={() => onFormat('- ')} title="Bullet list">
        • List
      </button>

      <button type="button" onClick={() => onFormat('1. ')} title="Numbered list">
        1. List
      </button>

      <button type="button" onClick={() => onFormat('> ')} title="Blockquote">
        Quote
      </button>

      <span className="markdown-toolbar__divider" />

      <button type="button" onClick={() => onFormat('`', '`')} title="Inline code">
        {'</>'}
      </button>

      <button
        type="button"
        onClick={() => onFormat('```\n', '\n```')}
        title="Code block"
      >
        Code Block
      </button>

      <button
        type="button"
        onClick={() => onFormat('[', '](https://example.com)')}
        title="Link"
      >
        Link
      </button>
    </div>
  )
}

export default MarkdownToolbar
