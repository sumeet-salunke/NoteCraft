import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./MarkdownPreview.css";

interface MarkdownPreviewProps {
  content: string;
}
const MarkdownPreview = ({ content }: MarkdownPreviewProps) => {
  return (
    <div className="markdown-preview">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content || "*Nothing to previre yet.*"}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;