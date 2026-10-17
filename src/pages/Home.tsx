import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-amber-50">
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-2xl font-bold text-sky-700">
          <span>🌟</span> KidSpark
        </div>
        <div className="flex gap-2">
          {user ? (
            <Button asChild variant="outline">
              <Link to="/parent">家长中心</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link to="/login">登录</Link>
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-sky-800 mb-4">
          孩子学习乐园
        </h1>
        <p className="text-xl text-sky-600 mb-8 max-w-2xl mx-auto">
          让孩子在玩乐中学习数学、英语和科学 — 家长可以跟踪进度。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/learn">开始学习 →</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8">
            <Link to="/parent">家长仪表盘</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { emoji: "📐", title: "互动课程", desc: "数学、英语、科学主题课程" },
            { emoji: "📈", title: "进度跟踪", desc: "家长实时查看孩子学习情况" },
            { emoji: "🌟", title: "乐趣学习", desc: "游戏化体验，让孩子爱上学习" },
          ].map((item) => (
            <Card key={item.title} className="border-0 shadow-md bg-white/80 backdrop-blur">
              <CardContent className="pt-6">
                <div className="text-4xl mb-2">{item.emoji}</div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
