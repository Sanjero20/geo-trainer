import { Province } from "@/stores/game";

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export function calculateScore(list: Province[]): number {
  let score = 0;

  for (let i = 0; i < list.length; i++) {
    const guessedCorrect = list[i].guessed;
    if (guessedCorrect) {
      score += 1;
    }
  }

  return score;
}
