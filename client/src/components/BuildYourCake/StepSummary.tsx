import type { OrderState } from "./types";
import { PRODUCTS } from "./data";

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex justify-between items-start gap-2 pb-2"
      style={{ borderBottom: "1px solid oklch(0.93 0.02 60)" }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wide flex-shrink-0"
        style={{ color: "oklch(0.60 0.04 30)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
      <span
        className="text-xs text-right"
        style={{ color: "oklch(0.35 0.05 30)", fontFamily: "var(--font-body)" }}
      >
        {value}
      </span>
    </div>
  );
}

export default function StepSummary({
  order,
  total,
  onSend,
}: {
  order: OrderState;
  total: number;
  onSend: () => void;
}) {
  const productMeta = PRODUCTS.find(p => p.type === order.product)!;
  const isBrownie = order.product === "brownie";

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="text-center">
        <span style={{ fontSize: "3.5rem" }}>{productMeta.emoji}</span>
        <h3
          className="font-display text-2xl font-semibold mt-2"
          style={{ color: "oklch(0.28 0.05 30)" }}
        >
          Your {productMeta.label} is Ready to Order! 🎉
        </h3>
        <p
          className="text-sm mt-1"
          style={{
            color: "oklch(0.55 0.04 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          Review your order below and send it to Dhvani.
        </p>
      </div>

      <div
        className="rounded-2xl p-5 space-y-3"
        style={{
          background: "oklch(0.97 0.025 60)",
          border: "1px solid oklch(0.90 0.04 60)",
        }}
      >
        <SummaryRow
          label="Product"
          value={`${productMeta.emoji} ${productMeta.label}`}
        />
        <SummaryRow
          label={isBrownie ? "Quantity" : "Size"}
          value={`${order.size?.emoji} ${order.size?.label} - ${order.size?.serves}`}
        />
        {order.deliveryDate && (
          <SummaryRow
            label="Delivery Date"
            value={new Date(order.deliveryDate + "T00:00:00").toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
          />
        )}
        {!isBrownie && order.flavor && (
          <SummaryRow
            label="Flavor"
            value={`${order.flavor.emoji} ${order.flavor.label}`}
          />
        )}
        {!isBrownie && order.frosting && (
          <SummaryRow
            label="Frosting"
            value={`${order.frosting.emoji} ${order.frosting.label}`}
          />
        )}
        <SummaryRow
          label={isBrownie ? "Add-ons" : "Decorations"}
          value={
            (isBrownie ? order.addons : order.decorations).length > 0
              ? (isBrownie ? order.addons : order.decorations).join(", ")
              : "None"
          }
        />
        {(isBrownie ? order.addons : order.decorations).includes('Custom Message Card') && order.customCardMessage && <SummaryRow label="Custom Card Message" value={order.customCardMessage} />}
        {order.message && <SummaryRow label="Note" value={order.message} />}
      </div>

      <div
        className="rounded-2xl p-4 text-center"
        style={{ background: "oklch(0.97 0.025 60)" }}
      >
        <p
          className="text-xs mb-1"
          style={{
            color: "oklch(0.55 0.04 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          Estimated Starting Price
        </p>
        <p
          className="font-display text-3xl font-bold"
          style={{ color: "oklch(0.45 0.1 10)" }}
        >
          ₹{total}+
        </p>
        <p
          className="text-xs mt-1"
          style={{
            color: "oklch(0.60 0.04 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          Final price confirmed after consultation
        </p>
      </div>

      <button
        onClick={onSend}
        className="w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
        style={{
          background: "#25D366",
          color: "white",
          fontFamily: "var(--font-body)",
          boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)",
        }}
      >
        💬 Send to Dhvani via WhatsApp
      </button>
    </div>
  );
}
