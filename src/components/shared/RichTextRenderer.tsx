"use client";

import { useMemo } from "react";

interface RichTextRendererProps {
  content: string;
  className?: string;
  clampLines?: number;
}

export default function RichTextRenderer({ content, className = "", clampLines }: RichTextRendererProps) {
  const safeContent = useMemo(() => {
    if (!content) return "";
    return content;
  }, [content]);

  // If content is just plain text, wrap it in a <p> tag so it renders consistently
  const finalContent = safeContent.includes("<") && safeContent.includes(">") 
    ? safeContent 
    : `<p>${safeContent}</p>`;

  return (
    <div 
      className={`prose max-w-none text-inherit ${clampLines ? `line-clamp-${clampLines}` : ''} ${className}`}
      dangerouslySetInnerHTML={{ __html: finalContent }}
    />
  );
}
