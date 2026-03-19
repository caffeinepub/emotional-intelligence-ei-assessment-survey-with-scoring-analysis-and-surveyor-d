import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { fifaQuizQuestions } from "../content/fifaQuizQuestions";
import { triggerConfetti } from "../lib/fx/confetti";
import { playBuzzer } from "../lib/fx/sound";
import type { TriviaQuestion } from "../lib/trivia/openTrivia";
import { shuffle } from "../lib/trivia/shuffle";

export default function QuizPage() {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = () => {
    const shuffledQuestions = fifaQuizQuestions.map((q) => ({
      ...q,
      answers: shuffle(q.answers),
    }));

    setQuestions(shuffledQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setQuizComplete(false);
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);
    const correct = answer === questions[currentIndex].correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
      triggerConfetti();
    } else {
      playBuzzer();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setQuizComplete(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            <CardDescription>Here's how you performed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {percentage}%
              </div>
              <p className="text-xl text-muted-foreground">
                {score} out of {questions.length} correct
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Your Score</span>
                <span className="font-semibold">
                  {score}/{questions.length}
                </span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>
            <Button
              onClick={loadQuestions}
              className="w-full"
              size="lg"
              data-ocid="quiz.submit_button"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Quiz Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            Score: {score}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl leading-relaxed">
            {currentQuestion.question}
          </CardTitle>
          {currentQuestion.category && (
            <CardDescription className="text-base">
              Category: {currentQuestion.category}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.answers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrectAnswer = answer === currentQuestion.correctAnswer;
            const showCorrect = selectedAnswer !== null && isCorrectAnswer;
            const showIncorrect = isSelected && !isCorrect;

            return (
              <button
                // biome-ignore lint/suspicious/noArrayIndexKey: answer order is stable after shuffle
                key={index}
                type="button"
                onClick={() => handleAnswerSelect(answer)}
                disabled={selectedAnswer !== null}
                data-ocid={`quiz.answer.button.${index + 1}`}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  showCorrect
                    ? "bg-success/10 border-success text-success-foreground"
                    : showIncorrect
                      ? "bg-destructive/10 border-destructive text-destructive-foreground"
                      : selectedAnswer !== null
                        ? "bg-muted/50 border-muted cursor-not-allowed"
                        : "bg-card border-border hover:border-primary hover:bg-accent cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{answer}</span>
                  {showCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  )}
                  {showIncorrect && (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </div>
              </button>
            );
          })}

          {selectedAnswer !== null && (
            <div className="pt-4">
              <Button
                onClick={handleNext}
                className="w-full"
                size="lg"
                data-ocid="quiz.next_button"
              >
                {currentIndex < questions.length - 1
                  ? "Next Question"
                  : "View Results"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
