"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  ExternalLink,
  KeyRound,
  LogOut,
  PackageCheck,
  RefreshCw,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  getAdminRequests,
  REQUEST_STATUSES,
  updateAdminRequestStatus,
  type AdminProductRequest,
  type RequestStatus,
} from "@/lib/admin-api";

const statusLabels: Record<RequestStatus, string> = {
  request_received: "Request received",
  under_review: "Under review",
  quote_ready: "Quote ready",
  confirmed: "Confirmed",
  sourcing: "Sourcing",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  unavailable: "Unavailable",
};

const statusTone: Record<RequestStatus, string> = {
  request_received: "bg-[#fff4df] text-[#8a5a12]",
  under_review: "bg-[#edf3f8] text-[#24506d]",
  quote_ready: "bg-[#f5edff] text-[#68419b]",
  confirmed: "bg-[#e9f6ee] text-[#24613d]",
  sourcing: "bg-[#edf5e8] text-[#486c32]",
  packed: "bg-[#e9f5f5] text-[#28656a]",
  shipped: "bg-[#eaf0fb] text-[#31558b]",
  delivered: "bg-[#e6f4e9] text-[#23633a]",
  cancelled: "bg-[#fbe9e7] text-[#8d3429]",
  unavailable: "bg-[#f2f2f2] text-[#5f6368]",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function AdminDashboard() {
  const [apiKey, setApiKey] = useState("");
  const [keyInput, setKeyInput] = useState("");
  const [requests, setRequests] = useState<AdminProductRequest[]>([]);
  const [selected, setSelected] = useState<AdminProductRequest | null>(null);
  const [filter, setFilter] = useState<"all" | RequestStatus>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    const stored = window.sessionStorage.getItem("gharse_admin_api_key");
    if (stored) {
      setApiKey(stored);
      setKeyInput(stored);
    }
  }, []);

  async function loadRequests(key = apiKey) {
    if (!key) return;
    setLoading(true);
    setError("");
    try {
      const result = await getAdminRequests(
        key,
        filter === "all" ? undefined : filter,
      );
      setRequests(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load requests.");
      if (
        (err instanceof Error && err.message.includes("UNAUTHORIZED")) ||
        (err instanceof Error && err.message.includes("401"))
      ) {
        window.sessionStorage.removeItem("gharse_admin_api_key");
        setApiKey("");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (apiKey) void loadRequests();
    // Filter changes should refresh the server-side result.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, filter]);

  const filteredRequests = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return requests;
    return requests.filter((item) =>
      [
        item.referenceId,
        item.customer.name,
        item.customer.email,
        item.product.name,
        item.destination.city,
        item.destination.country,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [requests, search]);

  const stats = useMemo(() => {
    const counts = Object.fromEntries(
      REQUEST_STATUSES.map((status) => [status, 0]),
    ) as Record<RequestStatus, number>;
    requests.forEach((request) => {
      counts[request.status] += 1;
    });
    return counts;
  }, [requests]);

  function login(event: React.FormEvent) {
    event.preventDefault();
    const value = keyInput.trim();
    if (!value) return;
    window.sessionStorage.setItem("gharse_admin_api_key", value);
    setApiKey(value);
  }

  function logout() {
    window.sessionStorage.removeItem("gharse_admin_api_key");
    setApiKey("");
    setRequests([]);
    setSelected(null);
  }

  async function changeStatus(status: RequestStatus) {
    if (!selected || !apiKey) return;
    setUpdating(true);
    setError("");
    try {
      const updated = await updateAdminRequestStatus(
        apiKey,
        selected.referenceId,
        status,
        note,
      );
      if (updated) {
        setSelected(updated);
        setRequests((current) =>
          current.map((item) =>
            item.referenceId === updated.referenceId ? updated : item,
          ),
        );
        setNote("");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not update request.",
      );
    } finally {
      setUpdating(false);
    }
  }

  if (!apiKey) {
    return (
      <main className="min-h-screen bg-[#f7f1e7] px-5 py-10 text-ink sm:py-16">
        <div className="mx-auto max-w-md">
          <div className="mb-8 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-ink text-white">
              <ShieldCheck size={21} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-terracotta">
                HyderabadSe
              </p>
              <h1 className="font-display text-2xl">Admin dashboard</h1>
            </div>
          </div>
          <form
            onSubmit={login}
            className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-soft sm:p-8"
          >
            <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-[#f2eadf] text-ink">
              <KeyRound size={20} />
            </div>
            <h2 className="font-display text-3xl">Sign in to requests</h2>
            <p className="mt-2 text-sm leading-6 text-ink/55">
              Enter the admin API key configured in your backend{" "}
              <code>.env</code>. It is kept only in this browser session.
            </p>
            <label className="label mt-6" htmlFor="admin-key">
              Admin API key
            </label>
            <input
              id="admin-key"
              type="password"
              value={keyInput}
              onChange={(event) => setKeyInput(event.target.value)}
              className="field"
              autoComplete="current-password"
              placeholder="Enter admin API key"
            />
            {error && (
              <p
                className="mt-3 text-sm font-semibold text-[#8d3429]"
                role="alert"
              >
                {error}
              </p>
            )}
            <button className="button-primary mt-5 w-full" type="submit">
              Open dashboard <ArrowRight size={17} />
            </button>
          </form>
          <p className="mt-5 text-center text-xs text-ink/40">
            Early-stage admin access. Replace API-key authentication with proper
            user sessions before production.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f1e7] text-ink">
      <header className="sticky top-0 z-30 border-b border-ink/10 bg-[#f7f1e7]/95 backdrop-blur">
        <div className="shell flex min-h-[72px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-ink text-white font-bold">
              G
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-terracotta">
                HyderabadSe
              </p>
              <p className="font-display text-xl">Operations</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => void loadRequests()}
              className="button-secondary px-3"
              aria-label="Refresh requests"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={logout}
              className="button-secondary px-3"
              aria-label="Sign out"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="shell py-7 sm:py-10">
        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Request operations</p>
            <h1 className="mt-2 display text-4xl sm:text-5xl">
              Keep every request moving.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/55">
              Review customer requests, update their progress and keep the
              sourcing workflow visible in one place.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white/75 px-4 py-3 text-xs text-ink/55">
            <span className="font-bold text-ink">{requests.length}</span>{" "}
            requests in current view
          </div>
        </div>

        {error && (
          <div
            className="mb-5 flex items-start gap-3 rounded-2xl border border-[#e4b8b2] bg-[#fff1ef] p-4 text-sm text-[#7d3027]"
            role="alert"
          >
            <AlertCircle className="mt-0.5 shrink-0" size={18} />
            <div>
              <p className="font-bold">Something needs attention</p>
              <p className="mt-1">{error}</p>
            </div>
            <button
              className="ml-auto"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={17} />
            </button>
          </div>
        )}

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="New requests"
            value={stats.request_received}
            icon={<Clock3 size={18} />}
          />
          <StatCard
            label="Under review"
            value={stats.under_review}
            icon={<Search size={18} />}
          />
          <StatCard
            label="Quote ready"
            value={stats.quote_ready}
            icon={<ArrowRight size={18} />}
          />
          <StatCard
            label="Delivered"
            value={stats.delivered}
            icon={<Check size={18} />}
          />
        </section>

        <section className="mt-7 rounded-[1.5rem] border border-ink/10 bg-white shadow-soft">
          <div className="flex flex-col gap-4 border-b border-ink/10 p-4 sm:p-5 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="field pl-10"
                placeholder="Search reference, customer, product or city"
              />
            </div>
            <div className="relative">
              <select
                value={filter}
                onChange={(event) =>
                  setFilter(event.target.value as "all" | RequestStatus)
                }
                className="field appearance-none pr-10"
              >
                <option value="all">All statuses</option>
                {REQUEST_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {statusLabels[status]}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/45"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-56 items-center justify-center gap-3 text-sm text-ink/50">
              <RefreshCw size={18} className="animate-spin" /> Loading requests…
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center">
              <PackageCheck size={28} className="text-ink/25" />
              <p className="mt-3 font-bold">No requests found</p>
              <p className="mt-1 text-sm text-ink/45">
                New customer submissions will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-ink/10">
              {filteredRequests.map((request) => (
                <button
                  key={request.referenceId}
                  onClick={() => setSelected(request)}
                  className="group grid w-full gap-4 px-4 py-4 text-left transition hover:bg-[#fbf7f0] sm:grid-cols-[1.1fr_1.3fr_1fr_auto] sm:items-center sm:px-5"
                >
                  <div>
                    <p className="text-xs font-bold text-terracotta">
                      {request.referenceId}
                    </p>
                    <p className="mt-1 font-semibold">
                      {request.customer.name}
                    </p>
                    <p className="mt-0.5 text-xs text-ink/45">
                      {formatDate(request.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">{request.product.name}</p>
                    <p className="mt-1 text-xs text-ink/45">
                      Qty {request.product.quantity} ·{" "}
                      {request.destination.city}, {request.destination.country}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${statusTone[request.status]}`}
                    >
                      {statusLabels[request.status]}
                    </span>
                  </div>
                  <ArrowRight
                    size={17}
                    className="hidden text-ink/25 transition group-hover:translate-x-1 group-hover:text-terracotta sm:block"
                  />
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-ink/30"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <aside
            className="h-full w-full max-w-xl overflow-y-auto bg-[#fffdf9] p-5 shadow-2xl sm:p-7"
            aria-label="Request details"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Request details</p>
                <h2 className="mt-1 font-display text-3xl">
                  {selected.referenceId}
                </h2>
              </div>
              <button
                className="button-secondary h-10 min-h-10 w-10 px-0"
                onClick={() => setSelected(null)}
                aria-label="Close request details"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-ink/10 bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-ink/40">
                Current status
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-bold ${statusTone[selected.status]}`}
                >
                  {statusLabels[selected.status]}
                </span>
                <span className="text-xs text-ink/40">
                  Updated {formatDate(selected.updatedAt)}
                </span>
              </div>
            </div>

            <DetailSection title="Customer">
              <Detail label="Name" value={selected.customer.name} />
              <Detail label="Email" value={selected.customer.email} />
              <Detail label="WhatsApp" value={selected.customer.whatsapp} />
            </DetailSection>
            <DetailSection title="Request">
              <Detail label="Product" value={selected.product.name} />
              <Detail
                label="Quantity"
                value={selected.product.quantity || "Not specified"}
              />
              <Detail
                label="Preferred brand/shop"
                value={selected.product.preferredBrand || "Not specified"}
              />
              <Detail
                label="Budget"
                value={selected.budget || "Not specified"}
              />
              <Detail
                label="Shipping"
                value={
                  selected.shippingPreference
                    ? selected.shippingPreference.replace("_", " ")
                    : "Not specified"
                }
              />
              <Detail
                label="Desired delivery"
                value={selected.desiredDeliveryDate || "Not specified"}
              />
              {selected.product.productUrl && (
                <a
                  href={selected.product.productUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-terracotta"
                >
                  Open product link <ExternalLink size={13} />
                </a>
              )}
            </DetailSection>
            <DetailSection title="Destination">
              <Detail
                label="City"
                value={selected.destination.city || "Not specified"}
              />{" "}
              <Detail label="Country" value={selected.destination.country} />
            </DetailSection>
            {selected.notes && (
              <DetailSection title="Customer notes">
                <p className="whitespace-pre-wrap text-sm leading-6 text-ink/65">
                  {selected.notes}
                </p>
              </DetailSection>
            )}

            <section className="mt-6 border-t border-ink/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-[.14em] text-ink/40">
                Update status
              </p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {REQUEST_STATUSES.map((status) => (
                  <button
                    key={status}
                    disabled={updating || status === selected.status}
                    onClick={() => void changeStatus(status)}
                    className={`min-h-11 rounded-xl border px-3 text-left text-xs font-bold transition disabled:cursor-not-allowed disabled:opacity-45 ${status === selected.status ? "border-ink/20 bg-ink text-white" : "border-ink/10 bg-white hover:border-terracotta/40 hover:bg-[#fff8ef]"}`}
                  >
                    {statusLabels[status]}
                  </button>
                ))}
              </div>
              <label className="label mt-5" htmlFor="status-note">
                Internal note (optional)
              </label>
              <textarea
                id="status-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                className="field min-h-24 resize-y py-3"
                placeholder="What changed? e.g. Supplier confirmed availability."
              />
            </section>
          </aside>
        </div>
      )}
    </main>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.25rem] border border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[.12em] text-ink/45">
          {label}
        </p>
        <span className="text-terracotta">{icon}</span>
      </div>
      <p className="mt-4 font-display text-4xl">{value}</p>
    </div>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 border-t border-ink/10 pt-5">
      <p className="text-xs font-bold uppercase tracking-[.14em] text-ink/40">
        {title}
      </p>
      <div className="mt-3 space-y-2">{children}</div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-xl bg-[#f7f1e7] px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-xs text-ink/45">{label}</span>
      <span className="text-sm font-semibold sm:text-right">{value}</span>
    </div>
  );
}
