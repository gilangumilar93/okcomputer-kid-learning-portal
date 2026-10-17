import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/providers/trpc";

export default function LearnMap() {
  const { data: lessons, isLoading } = trpc.kidspark.lessons.useQuery();
  const [subject, setSubject] = useState<"all" | "math" | "english" | "science">("all");

  const filtered = lessons?.filter((l) => subject === "all" || l.subject === subject) ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <header className="px-6 py-4 flex items-center justify-between border-b bg-white/70 backdrop-blur">
        <Link to="/" className="text-xl font-bold text-indigo-700">← KidSpark</Link>
        <h1 className="text-2xl font-bold">学习地图</h1>
        <div />
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-2 mb-6 justify-center">
          {(["all", "math", "english", "science"] as const).map((s) => (
            <Button
              key={s}
              variant={subject === s ? "default" : "outline"}
              onClick={() => setSubject(s)}
            >
              {s === "all" ? "全部" : s === "math" ? "数学" : s === "english" ? "英语" : "科学"}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <p className="text-center">加载中...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <div className="text-3xl">{lesson.emoji}</div>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{lesson.subtitle}</p>
                  <Badge variant="secondary">{lesson.subject}</Badge>
                  <Button asChild className="mt-4 w-full">
                    <Link to={`/lesson/${lesson.id}`}>开始课程</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
