import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/login";
import { useAuth } from "@/lib/auth";

export function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
    },
  });
}