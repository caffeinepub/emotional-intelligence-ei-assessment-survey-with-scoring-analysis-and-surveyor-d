import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, RotateCcw, Star, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
      setScore((s) => s + 1);
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
      <div className="page-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    const getGrade = () => {
      if (percentage >= 80)
        return { label: "Expert", emoji: "🏆", color: "text-gold" };
      if (percentage >= 60)
        return { label: "Solid", emoji: "⚽", color: "text-primary" };
      return {
        label: "Keep Practicing",
        emoji: "💪",
        color: "text-muted-foreground",
      };
    };
    const grade = getGrade();
    return (
      <div className="page-bg min-h-screen">
        {/* Banner */}
        <div className="relative h-48 overflow-hidden">
          <img
            src="/assets/generated/quiz-banner.dim_800x400.jpg"
            alt="Quiz Banner"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-display font-bold text-white">
              FIFA Quiz Challenge
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary/30 shadow-glow">
              <CardHeader className="text-center pb-2">
                <div className="text-6xl mb-3">{grade.emoji}</div>
                <CardTitle className="text-3xl font-display">
                  {grade.label}!
                </CardTitle>
                <CardDescription>Here's how you performed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-7xl font-display font-bold mb-1 gradient-pitch-text">
                    {percentage}%
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {score} out of {questions.length} correct
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Score</span>
                    <span>
                      {score}/{questions.length}
                    </span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full gradient-pitch rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                    />
                  </div>
                </div>
                <Button
                  onClick={loadQuestions}
                  className="w-full gap-2"
                  size="lg"
                  data-ocid="quiz.submit_button"
                >
                  <RotateCcw className="w-4 h-4" />
                  Take Quiz Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="page-bg min-h-screen">
      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src="/assets/generated/quiz-banner.dim_800x400.jpg"
          alt="Quiz Banner"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-white drop-shadow-md">
              FIFA Quiz Challenge
            </h1>
            <p className="text-white/80 mt-1">Test your football knowledge</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress area */}
        <div className="mb-6 bg-card rounded-2xl border border-border p-4 shadow-xs">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-muted-foreground">
              Question {currentIndex + 1}{" "}
              <span className="text-foreground/40">/ {questions.length}</span>
            </span>
            <div className="flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-3 py-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-sm font-bold">{score}</span>
            </div>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-pitch rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-2 border-border mb-4">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-display leading-relaxed">
                  {currentQuestion.question}
                </CardTitle>
                {currentQuestion.category && (
                  <CardDescription className="text-sm">
                    {currentQuestion.category}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuestion.answers.map((answer, index) => {
                  const isSelected = selectedAnswer === answer;
                  const isCorrectAnswer =
                    answer === currentQuestion.correctAnswer;
                  const showCorrect =
                    selectedAnswer !== null && isCorrectAnswer;
                  const showIncorrect = isSelected && !isCorrect;

                  return (
                    <button
                      // biome-ignore lint/suspicious/noArrayIndexKey: answer order stable after shuffle
                      key={index}
                      type="button"
                      onClick={() => handleAnswerSelect(answer)}
                      disabled={selectedAnswer !== null}
                      data-ocid={`quiz.answer.button.${index + 1}`}
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 font-body ${
                        showCorrect
                          ? "bg-[oklch(0.56_0.2_145/0.12)] border-[oklch(0.56_0.2_145)] text-foreground"
                          : showIncorrect
                            ? "bg-[oklch(0.54_0.22_15/0.1)] border-[oklch(0.54_0.22_15)] text-foreground"
                            : selectedAnswer !== null
                              ? "bg-muted/40 border-muted cursor-not-allowed opacity-60"
                              : "bg-card border-border hover:border-primary hover:bg-primary/5 hover:shadow-xs cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                              showCorrect
                                ? "bg-[oklch(0.56_0.2_145)] text-white"
                                : showIncorrect
                                  ? "bg-[oklch(0.54_0.22_15)] text-white"
                                  : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="font-medium">{answer}</span>
                        </div>
                        {showCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-[oklch(0.56_0.2_145)] flex-shrink-0" />
                        )}
                        {showIncorrect && (
                          <XCircle className="w-5 h-5 text-[oklch(0.54_0.22_15)] flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}

                {selectedAnswer !== null && (
                  <motion.div
                    className="pt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
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
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
