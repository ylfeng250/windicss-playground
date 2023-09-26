import { useState } from "react";
import Editor from "@/components/Editor";
import styles from "./index.module.scss";

export default function IndexPage() {
  return (
    <div className={styles.app}>
      <Editor value="" onChange={console.log} />
    </div>
  );
}
