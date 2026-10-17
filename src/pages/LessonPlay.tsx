import { useState } from "react";
import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/providers/trpc";

export default function LessonPlay() {
  const { id } = useParams();
  const lessonId = Number(id);
  const { data: lessons } = trpc.kidspark.lessons.useQuery();
  const lesson = lessons?.find((l) => l.id === lessonId);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  if (!lesson) return <div className="p-8 text-center">加载课程中...</div>;

  const questions = lesson.questions || [];
  const q = questions[current];
  const progress = ((current + (answered ? 1 : 0)) / questions.length) * 100;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setAnswered(false);
      setSelected(null);
    }
  };

  const finished = current === questions.length - 1 && answered;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <header className="px-4 py-3 flex items-center gap-4 border-b">
        <Link to="/learn" className="text-sky-700">← 返回</Link>
        <div className="flex-1">
          <Progress value={progress} className="h-2" />
        </div>
        <span className="text-sm">{current + 1}/{questions.length}</span>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="text-5xl text-center">{lesson.emoji}</div>
            <CardTitle className="text-center">{lesson.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {q && (
              <>
                <p className="text-xl text-center font-medium">{q.prompt}</p>
                {q.visual && <p className="text-4xl text-center">{q.visual}</p>}
                <div className="grid gap-3">
                  {q.options.map((opt, idx) => (
                    <Button
                      key={idx}
                      variant={answered && idx === q.answer ? "default" : answered && idx === selected ? "destructive" : "outline"}
                      className="h-auto py-4 text-lg"
                      onClick={() => handleAnswer(idx)}
                      disabled={answered}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </>
            )}

            {finished ? (
              <div className="text-center space-y-4">
                <p className="text-2xl">完成！得分 {score}/{questions.length}</p>
                <Button asChild>
                  <Link to="/learn">回到地图</Link>
                </Button>
              </div>
            ) : answered && (
              <Button className="w-full" onClick={next}>下一题</Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
