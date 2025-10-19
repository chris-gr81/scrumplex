import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { RouteToastSchema } from "@/schemas";

export const useRouteToast = () => {
  const { state } = useLocation();
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const res = RouteToastSchema.safeParse(state?.toast);
    if (!res.success) return;
    toast[res.data.type](res.data.message);
    window.history.replaceState({}, document.title, window.location.href);
  }, [state]);
};
