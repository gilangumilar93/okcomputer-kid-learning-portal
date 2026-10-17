import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p>页面找不到了</p>
      <Button asChild>
        <Link to="/">回首页</Link>
      </Button>
    </div>
  );
}
