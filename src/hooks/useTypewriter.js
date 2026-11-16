import { useEffect, useState } from "react";

/** Types and deletes each word in turn. With reduced motion it simply swaps words. */
export function useTypewriter(words, { typeMs = 70, deleteMs = 40, holdMs = 1600, reduce = false } = {}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
      return () => window.clearInterval(id);
    }
    const word = words[index];
    let delay = deleting ? deleteMs : typeMs;
    if (!deleting && text === word) delay = holdMs;
    const id = window.setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
        return;
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs, reduce]);

  return reduce ? words[index] : text;
}
