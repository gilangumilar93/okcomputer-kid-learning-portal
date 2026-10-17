import { trpc } from "@/providers/trpc";

export function useAuth() {
  const { data: user, isLoading, error } = trpc.auth.me.useQuery(undefined, {
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !error,
  };
}
