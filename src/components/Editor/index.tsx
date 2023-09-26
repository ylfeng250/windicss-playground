import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/basic-languages/html/html.contribution.js";

export default function Editor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  useEffect(() => {
    if (editorContainerRef.current) {
      editorRef.current = monaco.editor.create(editorContainerRef.current, {
        value,
        language: "html",
        minimap: {
          enabled: false,
        },
        scrollbar: {
          vertical: "visible",
          horizontal: "visible",
        },
        overflowWidgetsDomNode: document.body,
      });
    }
    const changeEvent = editorRef.current.onDidChangeModelContent((event) => {
      if (onChange) {
        const currentValue = editorRef.current.getValue();
        onChange(currentValue);
      }
    });
    return () => {
      changeEvent.dispose();
      editorRef.current.dispose();
    };
  }, []);
  return (
    <div
      ref={editorContainerRef}
      id="container"
      style={{
        height: "100%",
        width: "100%",
      }}
    ></div>
  );
}
