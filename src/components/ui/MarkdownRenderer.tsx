import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/atom-one-dark.css";
import { AlertCircle, Lightbulb, Info, AlertTriangle, ShieldAlert } from "lucide-react";
import styles from "./MarkdownRenderer.module.css";

interface Props {
  content: string;
}

function extractText(children: any): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children && children.props && children.props.children) return extractText(children.props.children);
  return '';
}

function stripAlertTag(children: any, tag: string): any {
  if (typeof children === 'string') {
    return children.replace(new RegExp(`\\[!${tag}\\]\\n?`), '');
  }
  if (Array.isArray(children)) {
    return children.map(child => stripAlertTag(child, tag));
  }
  if (React.isValidElement(children) && children.props) {
    return React.cloneElement(children as React.ReactElement, {
      ...(children.props as object),
      children: stripAlertTag((children.props as any).children, tag)
    } as any);
  }
  return children;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className={styles.markdownContent}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          blockquote({ node, children, ...props }) {
            const text = extractText(children);
            const isAlert = text.match(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);
            
            if (isAlert) {
              const type = isAlert[1];
              const contentWithoutTag = stripAlertTag(children, type);

              let icon = <Info size={20} />;
              let alertClass = styles.alertNote;
              let title = "Note";

              if (type === "TIP") {
                icon = <Lightbulb size={20} />;
                alertClass = styles.alertTip;
                title = "Tip";
              } else if (type === "IMPORTANT") {
                icon = <AlertCircle size={20} />;
                alertClass = styles.alertImportant;
                title = "Important";
              } else if (type === "WARNING") {
                icon = <AlertTriangle size={20} />;
                alertClass = styles.alertWarning;
                title = "Warning";
              } else if (type === "CAUTION") {
                icon = <ShieldAlert size={20} />;
                alertClass = styles.alertCaution;
                title = "Caution";
              }

              return (
                <div className={`${styles.alert} ${alertClass}`}>
                  <div className={styles.alertHeader}>
                    {icon}
                    <span>{title}</span>
                  </div>
                  <div className={styles.alertContent}>
                    {contentWithoutTag}
                  </div>
                </div>
              );
            }
            return <blockquote {...props}>{children}</blockquote>;
          },
          table({ node, ...props }) {
            return (
              <div className={styles.tableWrapper}>
                <table {...props} />
              </div>
            );
          },
          input({ node, ...props }) {
            if (props.type === 'checkbox') {
              return <input {...props} className={styles.taskCheckbox} />;
            }
            return <input {...props} />;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
