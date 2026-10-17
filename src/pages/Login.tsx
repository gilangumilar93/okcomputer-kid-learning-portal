import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const handleLogin = () => {
    // Redirect to OAuth
    window.location.href = "/api/oauth/callback"; // placeholder; real flow uses Kimi
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-100 to-white">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">KidSpark 登录</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">家长登录以管理孩子学习进度</p>
          <Button className="w-full" onClick={handleLogin}>
            使用 Kimi 登录
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
