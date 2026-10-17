import { useState } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/providers/trpc";
import { useAuth } from "@/hooks/useAuth";

export default function ParentDashboard() {
  const { user } = useAuth();
  const utils = trpc.useUtils();
  const { data: kids, isLoading } = trpc.kidspark.kids.useQuery();
  const { data: stats } = trpc.kidspark.parentStats.useQuery();
  const createKid = trpc.kidspark.createKid.useMutation({
    onSuccess: () => utils.kidspark.kids.invalidate(),
  });

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("👶");

  const handleCreate = () => {
    if (!name.trim()) return;
    createKid.mutate({ name: name.trim(), avatar, color: "bg-sky-200" });
    setName("");
  };

  if (!user) return <div className="p-8 text-center">请先登录</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-sky-700">KidSpark</Link>
        <div>欢迎，{user.name || "家长"}</div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">家长仪表盘</h1>

        {stats && (
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold">{stats.totalKids}</div><p>孩子数</p></CardContent></Card>
            <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold">{stats.totalLessons}</div><p>完成课程</p></CardContent></Card>
            <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold">{stats.avgScore}%</div><p>平均正确率</p></CardContent></Card>
          </div>
        )}

        <Card className="mb-8">
          <CardHeader><CardTitle>添加孩子</CardTitle></CardHeader>
          <CardContent className="flex gap-2">
            <Input placeholder="名字" value={name} onChange={(e) => setName(e.target.value)} className="max-w-xs" />
            <Input placeholder="头像 emoji" value={avatar} onChange={(e) => setAvatar(e.target.value)} className="max-w-[80px]" />
            <Button onClick={handleCreate} disabled={createKid.isPending}>添加</Button>
          </CardContent>
        </Card>

        <div className="grid sm:grid-cols-2 gap-4">
          {isLoading ? <p>加载中...</p> : kids?.map((kid) => (
            <Card key={kid.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-3xl">{kid.avatar}</span> {kid.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/learn?kid=${kid.id}`}>查看进度</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
