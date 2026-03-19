export interface TriviaQuestion {
  question: string;
  correctAnswer: string;
  answers: string[];
  category?: string;
  difficulty?: string;
}

export async function fetchTriviaQuestions(
  count = 50,
): Promise<TriviaQuestion[]> {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${count}&category=18&type=multiple`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trivia questions");
    }

    const data = await response.json();

    if (data.response_code !== 0) {
      throw new Error("Invalid response from trivia API");
    }

    return data.results.map((item: any) => {
      const incorrectAnswers = item.incorrect_answers.map(decodeHTML);
      const correctAnswer = decodeHTML(item.correct_answer);
      const allAnswers = [...incorrectAnswers, correctAnswer];

      return {
        question: decodeHTML(item.question),
        correctAnswer,
        answers: shuffleArray(allAnswers),
        category: item.category,
        difficulty: item.difficulty,
      };
    });
  } catch (error) {
    console.error("Error fetching trivia questions:", error);
    throw error;
  }
}

function decodeHTML(html: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
