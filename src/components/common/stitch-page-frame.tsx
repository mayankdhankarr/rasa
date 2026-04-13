import type { ReactNode } from "react";

import { StitchFooter } from "@/components/common/stitch-footer";
import { StitchNav } from "@/components/common/stitch-nav";
import type { StitchSignature } from "@/lib/stitch/contracts";
import { cn } from "@/lib/utils";

type StitchPageFrameProps = {
  signature: StitchSignature;
  className?: string;
  children: ReactNode;
};

export function StitchPageFrame({ signature, className, children }: StitchPageFrameProps) {
  return (
    <div className={cn("bg-surface text-on-surface font-body selection:bg-tertiary-container selection:text-on-tertiary-fixed overflow-x-hidden", className)}>
      <StitchNav signature={signature} />
      {children}
      <StitchFooter signature={signature} />
    </div>
  );
}
