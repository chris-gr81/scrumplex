// Ftab (Functional Table)
// Custom table component based on Flexbox
// Author: Christian Grimm
// License: GNU GPL v3
// Description:
// A simple, semantic, shadcn-style table replacement
// built on flex containers for easier responsive design.

import { cn } from "@/lib/utils";

function Ftab({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ftab"
      className={cn(
        "w-full overflow-x-auto text-sm text-foreground",
        className
      )}
      {...props}
    />
  );
}

function FtabHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ftab-header"
      className={cn("w-full border-b bg-muted/60 font-medium", className)}
      {...props}
    />
  );
}

function FtabBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ftab-body"
      className={cn("w-full divide-y divide-border", className)}
      {...props}
    />
  );
}

function FtabFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ftab-footer"
      className={cn("w-full border-t bg-muted/30 font-medium", className)}
      {...props}
    />
  );
}

function FtabRow({
  className,
  subRow,
  children,
  ...props
}: React.ComponentProps<"div"> & { subRow?: React.ReactNode }) {
  return (
    <div
      data-slot="ftab-row"
      className={cn(
        "flexflex-coll w-full border-b border-border transition-colors hover:bg-muted/40",
        className
      )}
      {...props}
    >
      {/* main rendering */}
      <div className="flex items-center w-full">{children}</div>

      {/* sub rendering */}
      {subRow && (
        <div className="w-full mt-1 px-4 py-2 text-sm text-muted-foreground">
          {subRow}
        </div>
      )}
    </div>
  );
}

function FtabHead({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ftab-head"
      className={cn(
        "truncate px-2 py-2 text-left align-middle font-medium text-foreground",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}
function FtabCell({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ftab-cell"
      className={cn(
        "truncate px-2 py-2 text-left align-middle text-foreground",
        "whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function FtabCaption({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="ftab-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Ftab,
  FtabHeader,
  FtabBody,
  FtabRow,
  FtabCell,
  FtabHead,
  FtabFooter,
  FtabCaption,
};
