import type { CharacterReplacementMap } from "./types";

const characterReplacementMap: CharacterReplacementMap = new Map([
  [/:\)/g, "🙂"],
  [/;\)/g, "😉"]
]);

const replaceCharacters = (text: string) => {
  characterReplacementMap.forEach((sub, original) => {
    text = text.replace(original, sub);
  });

  return text;
}

export default replaceCharacters;