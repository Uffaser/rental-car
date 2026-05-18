"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import GlobalLoading from "@/components/GlobalLoading/GlobalLoading";

interface Props {
  children: React.ReactNode;
}

export default function TanStackProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalLoading />
      {children}
    </QueryClientProvider>
  );
}
