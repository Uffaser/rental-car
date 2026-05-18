"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import Loading from "@/components/Loading/Loading";

export default function GlobalLoading() {
  const fetching = useIsFetching();
  const mutating = useIsMutating();
  const active = fetching + mutating > 0;

  if (!active) return null;

  return (
    <div className="globalLoadingOverlay" aria-live="polite">
      <div className="globalLoadingPanel">
        <Loading message="Loading..." inline />
      </div>
    </div>
  );
}
