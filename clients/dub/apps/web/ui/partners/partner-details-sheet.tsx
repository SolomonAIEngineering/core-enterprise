import { approvePartnerAction } from "@/lib/actions/partners/approve-partner";
import { rejectPartnerAction } from "@/lib/actions/partners/reject-partner";
import { SHEET_MAX_ITEMS } from "@/lib/partners/constants";
import { mutatePrefix } from "@/lib/swr/mutate";
import usePayouts from "@/lib/swr/use-payouts";
import useProgram from "@/lib/swr/use-program";
import useWorkspace from "@/lib/swr/use-workspace";
import { EnrolledPartnerProps } from "@/lib/types";
import { X } from "@/ui/shared/icons";
import {
  Button,
  buttonVariants,
  Sheet,
  StatusBadge,
  Table,
  useRouterStuff,
  useTable,
} from "@dub/ui";
import { CursorRays, GreekTemple, LinesY, Link4 } from "@dub/ui/icons";
import {
  cn,
  COUNTRIES,
  currencyFormatter,
  DICEBEAR_AVATAR_URL,
  formatDate,
  getPrettyUrl,
  nFormatter,
} from "@dub/utils";
import { ChevronLeft } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { AnimatedEmptyState } from "../shared/animated-empty-state";
import { useCreatePayoutSheet } from "./create-payout-sheet";
import { PartnerLinkSelector } from "./partner-link-selector";
import { PartnerStatusBadges } from "./partner-status-badges";
import { PayoutStatusBadges } from "./payout-status-badges";

type PartnerDetailsSheetProps = {
  partner: EnrolledPartnerProps;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function PartnerDetailsSheetContent({
  partner,
  setIsOpen,
}: PartnerDetailsSheetProps) {
  const { slug } = useWorkspace();

  const badge = PartnerStatusBadges[partner.status];

  const saleAmount = (partner.link?.saleAmount ?? 0) / 100;
  // const earnings = (partner.earnings ?? 0) / 100;

  const { createPayoutSheet, setIsOpen: setCreatePayoutSheetOpen } =
    useCreatePayoutSheet({ nested: true, partnerId: partner.id });

  return (
    <>
      <div className="flex grow flex-col">
        <div className="flex items-start justify-between p-6">
          <Sheet.Title className="text-xl font-semibold">
            Partner details
          </Sheet.Title>
          <Sheet.Close asChild>
            <Button
              variant="outline"
              icon={<X className="size-5" />}
              className="h-auto w-fit p-1"
            />
          </Sheet.Close>
        </div>
        <div className="border-y border-neutral-200 bg-neutral-50 p-6">
          {/* Basic info */}
          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-col">
              <img
                src={partner.image || `${DICEBEAR_AVATAR_URL}${partner.name}`}
                alt={partner.name}
                className="size-12 rounded-full"
              />
              <div className="mt-4 flex items-start gap-2">
                <span className="text-lg font-semibold leading-tight text-neutral-900">
                  {partner.name}
                </span>
                {badge && (
                  <StatusBadge icon={null} variant={badge.variant}>
                    {badge.label}
                  </StatusBadge>
                )}
              </div>
            </div>
            <div className="flex min-w-[40%] shrink grow basis-1/2 flex-col items-end justify-end gap-2">
              {partner.link && (
                <div className="group flex min-w-0 items-center gap-1 overflow-hidden rounded-full border border-neutral-200 bg-white px-1.5 py-0.5 text-xs text-neutral-700">
                  <Link4 className="size-3.5" />
                  <span className="truncate">
                    {getPrettyUrl(partner.link.shortLink)}
                  </span>
                </div>
              )}
              {partner.country && (
                <div className="flex min-w-20 items-center gap-2 rounded-full border border-neutral-200 bg-white px-1.5 py-0.5 text-xs text-neutral-700">
                  <img
                    alt=""
                    src={`https://flag.vercel.app/m/${partner.country}.svg`}
                    className="h-3 w-4 rounded-sm"
                  />
                  <span className="truncate">{COUNTRIES[partner.country]}</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          {partner.status === "approved" && (
            <div className="xs:grid-cols-4 mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200">
              {[
                [
                  "Clicks",
                  !partner.link
                    ? "-"
                    : nFormatter(partner.link?.clicks, { full: true }),
                ],
                [
                  "Leads",
                  !partner.link
                    ? "-"
                    : nFormatter(partner.link?.leads, { full: true }),
                ],
                [
                  "Sales",
                  !partner.link
                    ? "-"
                    : nFormatter(partner.link?.sales, { full: true }),
                ],
                [
                  "Revenue",
                  !partner.link
                    ? "-"
                    : currencyFormatter(saleAmount, {
                        minimumFractionDigits: saleAmount % 1 === 0 ? 0 : 2,
                        maximumFractionDigits: 2,
                      }),
                ],
                // [
                //   "Earnings",
                //   currencyFormatter(earnings, {
                //     minimumFractionDigits: earnings % 1 === 0 ? 0 : 2,
                //     maximumFractionDigits: 2,
                //   }),
                // ],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col bg-neutral-50 p-3">
                  <span className="text-xs text-neutral-500">{label}</span>
                  <span className="text-base text-neutral-900">{value}</span>
                </div>
              ))}
            </div>
          )}

          {partner.link && (
            <div className="xs:grid-cols-2 mt-4 grid grid-cols-1 gap-3">
              <Link
                href={`/${slug}/analytics?domain=${partner.link.domain}&key=${partner.link.key}`}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "flex h-8 items-center justify-center gap-2 rounded-lg border px-2 text-sm",
                )}
              >
                <LinesY className="size-4 text-neutral-900" />
                Analytics
              </Link>
              <Link
                href={`/${slug}/events?domain=${partner.link.domain}&key=${partner.link.key}`}
                target="_blank"
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "flex h-8 items-center justify-center gap-2 rounded-lg border px-2 text-sm",
                )}
              >
                <CursorRays className="size-4 text-neutral-900" />
                Events
              </Link>
            </div>
          )}
        </div>

        <div className="grow p-6">
          {partner.status === "approved" ? (
            <PartnerPayouts partner={partner} />
          ) : (
            <div className="flex flex-col gap-6 text-sm text-neutral-500">
              <h3 className="text-base font-semibold text-neutral-900">
                About this partner
              </h3>

              <div>
                <h4 className="font-semibold text-neutral-900">Description</h4>
                <p className="mt-1.5">
                  {partner.bio || (
                    <span className="italic text-neutral-400">
                      No description provided
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {partner.status === "pending" && (
        <div className="flex grow flex-col justify-end">
          <div className="border-t border-neutral-200 p-5">
            <PartnerApproval partner={partner} setIsOpen={setIsOpen} />
          </div>
        </div>
      )}

      {partner.status === "approved" && (
        <>
          {createPayoutSheet}
          <div className="flex grow flex-col justify-end">
            <div className="border-t border-neutral-200 p-5">
              <Button
                variant="primary"
                text="Create payout"
                onClick={() => setCreatePayoutSheetOpen(true)}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

function PartnerApproval({
  partner,
  setIsOpen,
}: {
  partner: EnrolledPartnerProps;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { id: workspaceId } = useWorkspace();
  const { program } = useProgram();

  const [isApproving, setIsApproving] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);
  const [linkError, setLinkError] = useState(false);

  useEffect(() => {
    if (selectedLinkId) setLinkError(false);
  }, [selectedLinkId]);

  const { executeAsync, isExecuting } = useAction(approvePartnerAction, {
    onSuccess() {
      mutatePrefix(`/api/programs/${partner.programId}/partners`);

      toast.success("Approved the partner successfully.");
      setIsOpen(false);
    },
    onError({ error }) {
      toast.error(error.serverError || "Failed to approve partner.");
    },
  });

  const createLink = async (search: string) => {
    if (!search) throw new Error("No link entered");

    const shortKey = search.startsWith(program?.domain + "/")
      ? search.substring((program?.domain + "/").length)
      : search;

    const response = await fetch(`/api/links?workspaceId=${workspaceId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        domain: program?.domain,
        key: shortKey,
        url: program?.url,
        trackConversion: true,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      const { error } = result;
      throw new Error(error.message);
    }

    setSelectedLinkId(result.id);

    return result.id;
  };

  return (
    <div className="flex">
      <div
        className={cn(
          "transition-[width] duration-300",
          isApproving ? "w-[52px]" : "w-[83px]",
        )}
      >
        {isApproving ? (
          <Button
            type="button"
            variant="secondary"
            icon={<ChevronLeft className="size-4 shrink-0" />}
            onClick={() => {
              setIsApproving(false);
              setSelectedLinkId(null);
            }}
          />
        ) : (
          <PartnerRejectButton partner={partner} setIsOpen={setIsOpen} />
        )}
      </div>

      <div className="flex grow pl-2">
        <div
          className={cn(
            "w-0 transition-[width] duration-300",
            isApproving && "w-full",
          )}
        >
          <div className="w-[calc(100%-8px)]">
            <PartnerLinkSelector
              programDomain={program?.domain ?? undefined}
              selectedLinkId={selectedLinkId}
              setSelectedLinkId={setSelectedLinkId}
              showDestinationUrl={false}
              onCreate={async (search) => {
                try {
                  await createLink(search);
                  return true;
                } catch (error) {
                  toast.error(error?.message ?? "Failed to create link");
                }
                return false;
              }}
              domain={program?.domain ?? undefined}
              error={linkError}
            />
          </div>
        </div>

        <div className="grow">
          <Button
            type="button"
            variant="primary"
            text="Approve"
            loading={isExecuting}
            onClick={async () => {
              if (!isApproving) {
                setIsApproving(true);
                setLinkError(false);
                return;
              }

              if (!selectedLinkId) {
                setLinkError(true);
                return;
              }

              // Approve partner
              await executeAsync({
                workspaceId: workspaceId!,
                partnerId: partner.id,
                programId: partner.programId,
                linkId: selectedLinkId,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PartnerRejectButton({
  partner,
  setIsOpen,
}: {
  partner: EnrolledPartnerProps;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { id: workspaceId } = useWorkspace();

  const { executeAsync, isExecuting } = useAction(rejectPartnerAction, {
    onSuccess: async () => {
      await mutatePrefix(`/api/programs/${partner.programId}/partners`);

      toast.success("Partner rejected successfully.");
      setIsOpen(false);
    },
    onError({ error }) {
      toast.error(error.serverError || "Failed to reject partner.");
    },
  });

  return (
    <Button
      type="button"
      variant="secondary"
      text={isExecuting ? "" : "Decline"}
      loading={isExecuting}
      onClick={async () => {
        await executeAsync({
          workspaceId: workspaceId!,
          partnerId: partner.id,
          programId: partner.programId,
        });
      }}
    />
  );
}

function PartnerPayouts({ partner }: { partner: EnrolledPartnerProps }) {
  const { slug } = useWorkspace();
  const {
    payouts,
    error: payoutsError,
    loading,
  } = usePayouts({
    query: { partnerId: partner.id, pageSize: SHEET_MAX_ITEMS },
  });

  const table = useTable({
    data: payouts || [],
    loading: loading,
    error: payoutsError ? "Failed to load payouts" : undefined,
    columns: [
      {
        id: "periodEnd",
        header: "Period End",
        accessorFn: (d) => formatDate(d.periodStart, { month: "short" }),
      },
      {
        header: "Status",
        cell: ({ row }) => {
          const badge = PayoutStatusBadges[row.original.status];
          return badge ? (
            <StatusBadge icon={badge.icon} variant={badge.variant}>
              {badge.label}
            </StatusBadge>
          ) : (
            "-"
          );
        },
      },
      {
        id: "amount",
        header: "Amount",
        accessorFn: (d) =>
          currencyFormatter(d.amount / 100, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
      },
    ],
    onRowClick: (row) => {
      window.open(
        `/${slug}/programs/${partner.programId}/payouts?payoutId=${row.original.id}`,
        "_blank",
      );
    },
    resourceName: (p) => `payout${p ? "s" : ""}`,
    thClassName: (id) =>
      cn(id === "total" && "[&>div]:justify-end", "border-l-0"),
    tdClassName: (id) => cn(id === "total" && "text-right", "border-l-0"),
    className: "[&_tr:last-child>td]:border-b-transparent",
    scrollWrapperClassName: "min-h-[40px]",
  } as any);

  return (payouts && payouts.length > 0) || loading ? (
    <>
      <Table {...table} />
      {payouts && payouts.length === SHEET_MAX_ITEMS && (
        <div className="mt-2 flex justify-end">
          <Link
            href={`/${slug}/programs/${partner.programId}/payouts?partnerId=${partner.id}`}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "flex h-7 items-center rounded-lg border px-2 text-sm",
            )}
          >
            View all
          </Link>
        </div>
      )}
    </>
  ) : (
    <AnimatedEmptyState
      className="md:min-h-80"
      title="No payouts"
      description="When this partner is eligible for or has received payouts, they will appear here."
      cardContent={() => (
        <>
          <div className="flex size-7 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50">
            <GreekTemple className="size-4 text-neutral-700" />
          </div>
          <div className="h-2.5 w-28 min-w-0 rounded-sm bg-neutral-200" />
        </>
      )}
    />
  );
}

export function PartnerDetailsSheet({
  isOpen,
  ...rest
}: PartnerDetailsSheetProps & {
  isOpen: boolean;
}) {
  const { queryParams } = useRouterStuff();
  return (
    <Sheet
      open={isOpen}
      onOpenChange={rest.setIsOpen}
      onClose={() => queryParams({ del: "partnerId", scroll: false })}
    >
      <PartnerDetailsSheetContent {...rest} />
    </Sheet>
  );
}