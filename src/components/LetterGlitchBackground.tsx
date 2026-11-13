"use client";

import LetterGlitch from "./LetterGlitch";
import styles from "./LetterGlitchBackground.module.css";

export default function LetterGlitchBackground() {
  return (
    <div className={styles.container} aria-hidden="true">
      <LetterGlitch
        glitchColors={["#00e5ff", "#1e90ff", "#38bdf8", "#00ffcc"]}
        baseColor="#cbd5e1"
        fontSize={15}
        spacing={0.65}
        density={0.8}
        baseOpacity={0.10}
        glitchAmount={0.3}
        speed={0.65}
        interactive={true}
        cursorRadius={110}
        clickEffect="none"
        centerFade={0.25}
      />
    </div>
  );
}
