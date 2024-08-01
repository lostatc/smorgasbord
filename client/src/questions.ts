import type { QuestionDefinition } from "@/types";
import seedrandom from "seedrandom";

const DEFAULT_QUESTIONS_URL = "/questions.json";

export type QuestionsResponse =
  | { status: "success"; questions: ReadonlyArray<QuestionDefinition> }
  | { status: "error"; error: string };

export interface QuestionCategory {
  name: string;
  questions: ReadonlyArray<QuestionDefinition>;
}

export type QuestionsByCategoryResponse =
  | { status: "success"; categories: ReadonlyArray<QuestionCategory> }
  | { status: "error"; error: string };

export type QuestionMapResponse =
  | { status: "success"; map: Map<string, QuestionDefinition> }
  | { status: "error"; error: string };

export const fetchQuestions = async (
  url: string = DEFAULT_QUESTIONS_URL,
): Promise<QuestionsResponse> => {
  const response = await fetch(url);

  if (response.status < 200 || response.status >= 300) {
    return { status: "error", error: "Failed to load the list of questions." };
  }

  try {
    return { status: "success", questions: await response.json() };
  } catch {
    return { status: "error", error: "Failed to load the list of questions." };
  }
};

export const fetchRandomizedQuestionCategories = async (
  sharingCode: string,
  url: string = DEFAULT_QUESTIONS_URL,
): Promise<QuestionsByCategoryResponse> => {
  const response = await fetchQuestions(url);

  if (response.status === "error") {
    return response;
  }

  // Shuffle the questions and categories in a way that's deterministic by the
  // sharing code. This way both players see the same order of questions and the
  // order won't shuffle between page reloads.
  const rng = seedrandom(sharingCode);

  // Maps in JS remember their insertion order, so this function is still
  // deterministic.
  const byCategory = new Map<string, Array<QuestionDefinition>>();

  for (const q of response.questions) {
    const category = byCategory.get(q.category) ?? [];
    category.push(q);
    byCategory.set(q.category, category);
  }

  const categories = Array.from(byCategory.entries(), ([category, questions]) => ({
    name: category,
    questions,
  }));

  categories.sort(() => rng() - 0.5);

  for (const category of categories) {
    category.questions.sort(() => rng() - 0.5);
  }

  return { status: "success", categories };
};

export const fetchQuestionMap = async (
  url: string = DEFAULT_QUESTIONS_URL,
): Promise<QuestionMapResponse> => {
  const response = await fetchQuestions(url);

  if (response.status === "error") {
    return response;
  }

  return {
    status: "success",
    map: new Map(
      response.questions.map((q) => [
        q.id,
        {
          id: q.id,
          title: q.title,
          description: q.description,
          category: q.category,
          prompts: q.prompts,
        },
      ]),
    ),
  };
};
