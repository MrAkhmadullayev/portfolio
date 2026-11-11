import type { ComponentType } from "react";

import { Check } from "@/components/ui/icons";
import type { ProjectKind } from "@/content/projects";
import { cn, cssVars } from "@/lib/utils";

/*
 * Loyiha kartochkalaridagi sxematik "interfeys" rasmlari.
 * Haqiqiy skrinshot emas — loyiha turini bir qarashda bildiradigan bezak.
 * `.v-item` va `.v-bar` qismlari kartochka ekranga kirganda navbat bilan
 * paydo bo'ladi (globals.css, --i — tartib raqami).
 */

type VisualProps = {
  /** Rasm allaqachon brauzer oynasi ichida turibdi — o'z "oyna" qatorini chizmaydi. */
  framed?: boolean;
};

function BrowserVisual({ framed }: VisualProps) {
  return (
    <div className="flex h-full flex-col gap-4 px-[18px] pt-4">
      {!framed && (
        <div className="flex items-center gap-[7px]">
          <span className="size-[9px] rounded-full bg-mock-3" />
          <span className="size-[9px] rounded-full bg-mock-3" />
          <span className="size-[9px] rounded-full bg-mock-3" />
          <span className="ml-3 h-[22px] max-w-65 flex-1 rounded-full bg-mock-2" />
        </div>
      )}
      <div className="flex min-h-0 flex-1 gap-4">
        <div className="flex shrink-0 basis-[22%] flex-col gap-2.5 pt-1">
          {["70%", "90%", "60%", "80%"].map((width, index) => (
            <span
              key={width}
              className={cn(
                "v-item h-2.5 rounded-full",
                index === 0 ? "bg-snow" : "bg-mock-3",
              )}
              style={{ width, ...cssVars({ i: index }) }}
            />
          ))}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div
            className="v-item flex h-28 shrink-0 flex-col gap-2.5 rounded-[14px] bg-snow p-[18px]"
            style={cssVars({ i: 2 })}
          >
            <span className="h-3.5 w-[55%] rounded-full bg-ink" />
            <span className="h-2.5 w-[75%] rounded-full bg-[#c7c7cc]" />
            <span className="mt-auto h-[22px] w-21 rounded-full bg-ink" />
          </div>
          <div className="grid flex-1 grid-cols-3 gap-3">
            {[0, 1, 2].map((index) => (
              <span
                key={index}
                className="v-item rounded-t-[14px] bg-mock-2"
                style={cssVars({ i: index + 4 })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const apiRows = [
  ["GET", "/api/v1/orders", "200"],
  ["POST", "/api/v1/payments", "201"],
  ["GET", "/api/v1/users/:id", "200"],
  ["PUT", "/api/v1/orders/:id", "200"],
  ["POST", "/api/v1/webhooks", "202"],
] as const;

function ApiVisual() {
  return (
    <div className="flex h-full flex-col gap-2.5 px-5 pt-5 font-mono text-[13px] text-ash">
      {apiRows.map(([method, path, status], index) => (
        <div
          key={`${method} ${path}`}
          className="v-item flex h-11 shrink-0 items-center gap-3 rounded-xl bg-mock-2 px-3.5"
          style={cssVars({ i: index })}
        >
          <span
            className={cn(
              "shrink-0 rounded-md px-2 py-[3px] text-[11px] font-bold",
              method === "GET" ? "bg-snow text-ink" : "bg-mock-3 text-snow",
            )}
          >
            {method}
          </span>
          <span className="min-w-0 flex-1 truncate">{path}</span>
          <span className="shrink-0 text-snow">{status}</span>
        </div>
      ))}
    </div>
  );
}

const bars = ["38%", "54%", "46%", "70%", "62%", "92%", "76%"];

function DashboardVisual() {
  return (
    <div className="flex h-full flex-col gap-[18px] px-5 pt-5">
      <div className="grid shrink-0 grid-cols-2 gap-3">
        {["40%", "50%"].map((width, index) => (
          <div
            key={width}
            className="v-item flex h-16 flex-col gap-2.5 rounded-xl bg-mock-2 p-3.5"
            style={cssVars({ i: index })}
          >
            <span className="h-2 rounded-full bg-mock-4" style={{ width }} />
            <span
              className="h-3.5 rounded-full bg-snow"
              style={{ width: index === 0 ? "65%" : "45%" }}
            />
          </div>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 items-end gap-2.5">
        {bars.map((height, index) => (
          <span
            key={height}
            className={cn(
              "v-bar flex-1 rounded-t-lg",
              index === 5
                ? "bg-accent"
                : index === 6
                  ? "bg-snow"
                  : "bg-mock-3",
            )}
            style={{ height, ...cssVars({ i: index }) }}
          />
        ))}
      </div>
    </div>
  );
}

const nodes = ["API", "Queue", "Worker"];
const panels = [
  ["50%", "85%", "60%"],
  ["40%", "70%", "90%"],
  ["55%", "80%", "50%"],
];

function ServicesVisual() {
  return (
    <div className="flex h-full flex-col gap-6 px-6 pt-7">
      <div className="flex shrink-0 items-center">
        {nodes.map((label, index) => (
          <div key={label} className="contents">
            {index > 0 && <span className="h-0.5 w-7 shrink-0 bg-mock-4" />}
            <div
              className={cn(
                "v-item flex h-17 flex-1 items-center justify-center rounded-[14px] text-sm font-semibold",
                index === 0 ? "bg-snow text-ink" : "bg-mock-2 text-snow",
              )}
              style={cssVars({ i: index })}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-7">
        {panels.map(([first, second, third], index) => (
          <div
            key={first}
            className="v-item flex flex-col gap-3 rounded-t-[14px] bg-mock-2 p-4"
            style={cssVars({ i: index + 3 })}
          >
            <span className="flex items-center gap-2">
              <span className="size-2 shrink-0 rounded-full bg-accent" />
              <span
                className="h-2 rounded-full bg-snow"
                style={{ width: first }}
              />
            </span>
            <span
              className="h-2 rounded-full bg-mock-4"
              style={{ width: second }}
            />
            <span
              className="h-2 rounded-full bg-mock-4"
              style={{ width: third }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const tableRows = [
  ["80%", "60%", "70%", true],
  ["65%", "75%", "50%", false],
  ["75%", "55%", "65%", true],
  ["55%", "70%", "45%", false],
  ["70%", "50%", "60%", true],
] as const;

function TableVisual() {
  return (
    <div className="flex h-full flex-col">
      <div className="grid h-12 shrink-0 grid-cols-4 items-center gap-4 bg-mock-2 px-5">
        {["60%", "50%", "55%", "40%"].map((width) => (
          <span
            key={width}
            className="h-2 rounded-full bg-ash"
            style={{ width }}
          />
        ))}
      </div>
      {tableRows.map(([first, second, third, highlighted], index) => (
        <div
          key={first}
          className="v-item grid h-12 shrink-0 grid-cols-4 items-center gap-4 border-b border-mock-2 px-5"
          style={cssVars({ i: index })}
        >
          <span
            className="h-2.5 rounded-full bg-snow"
            style={{ width: first }}
          />
          <span
            className="h-2 rounded-full bg-mock-4"
            style={{ width: second }}
          />
          <span
            className="h-2 rounded-full bg-mock-4"
            style={{ width: third }}
          />
          <span
            className={cn(
              "h-5 w-14 rounded-full",
              highlighted ? "bg-snow" : "bg-mock-3",
            )}
          />
        </div>
      ))}
    </div>
  );
}

const steps = [
  { label: "Build", width: "3.5rem", state: "done" },
  { label: "Test", width: "4.5rem", state: "done" },
  { label: "Deploy", width: "2.75rem", state: "current" },
  { label: "Monitoring", width: "3.75rem", state: "next" },
] as const;

function PipelineVisual() {
  return (
    <div className="flex h-full flex-col gap-3 px-5 pt-[22px]">
      {steps.map((step, index) => (
        <div
          key={step.label}
          className="v-item flex h-12 shrink-0 items-center gap-3.5 rounded-xl bg-mock-2 px-3.5"
          style={cssVars({ i: index })}
        >
          {step.state === "next" ? (
            <span className="size-6 shrink-0 rounded-full border-2 border-mock-4" />
          ) : (
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-ink",
                step.state === "current" ? "bg-accent" : "bg-snow",
              )}
            >
              <Check size={14} />
            </span>
          )}
          <span
            className={cn(
              "text-sm font-semibold",
              step.state === "next" ? "text-ash" : "text-snow",
            )}
          >
            {step.label}
          </span>
          <span
            className={cn(
              "ml-auto h-2 rounded-full",
              step.state === "next" ? "bg-mock-3" : "bg-mock-4",
            )}
            style={{ width: step.width }}
          />
        </div>
      ))}
    </div>
  );
}

const visuals: Record<ProjectKind, ComponentType<VisualProps>> = {
  browser: BrowserVisual,
  api: ApiVisual,
  dashboard: DashboardVisual,
  services: ServicesVisual,
  table: TableVisual,
  pipeline: PipelineVisual,
};

/** Loyiha turiga mos sxematik rasm. Balandlikni ota element belgilaydi. */
export function ProjectVisual({
  kind,
  className,
  framed = false,
}: VisualProps & {
  kind: ProjectKind;
  className?: string;
}) {
  const Visual = visuals[kind];

  return (
    <div
      aria-hidden="true"
      className={cn("overflow-hidden bg-mock", className)}
    >
      <Visual framed={framed} />
    </div>
  );
}
