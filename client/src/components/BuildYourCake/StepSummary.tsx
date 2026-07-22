import type { OrderState } from "./types";
import { PRODUCTS } from "./data";
import { PRODUCT_ICONS, WhatsAppIcon } from "./icons";

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex justify-between items-start gap-2 pb-2"
      style={{ borderBottom: "1px solid var(--surface-muted)" }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-wide flex-shrink-0"
        style={{ color: "var(--text-faint)", fontFamily: "var(--font-body)" }}
      >
        {label}
      </span>
      <span
        className="text-xs text-right"
        style={{ color: "var(--text-dark)", fontFamily: "var(--font-body)" }}
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
  const isCookieTin = order.product === "cookietin";
  const ProductIcon = PRODUCT_ICONS[productMeta.type];

  return (
    <div className="flex-1 flex flex-col gap-5">
      <div className="text-center">
        <ProductIcon
          className="w-14 h-14 mx-auto"
          strokeWidth={1.25}
          style={{ color: productMeta.color }}
          aria-hidden="true"
        />
        <h3
          className="font-display text-2xl font-semibold mt-2"
          style={{ color: "var(--text-heading)" }}
        >
          Your {productMeta.label} is Ready to Order!
        </h3>
        <p
          className="text-sm mt-1"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Review your order below and send it to Dhvani.
        </p>
      </div>

      <div
        className="rounded-2xl p-5 space-y-3"
        style={{
          background: "var(--surface-warm)",
          border: "1px solid oklch(0.90 0.04 60)",
        }}
      >
        <SummaryRow label="Product" value={productMeta.label} />
        <SummaryRow
          label={isBrownie ? "Quantity" : isCookieTin ? "Tin" : "Size"}
          value={`${order.size?.label} - ${order.size?.serves}`}
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
        {!isBrownie && !isCookieTin && (
          <SummaryRow label="Frosting" value={order.frosting.label} />
        )}
        {!isCookieTin && (
          <SummaryRow
            label={isBrownie ? "Add-ons" : "Decorations"}
            value={
              (isBrownie ? order.addons : order.decorations).length > 0
                ? (isBrownie ? order.addons : order.decorations).join(", ")
                : "None"
            }
          />
        )}
        {(isBrownie ? order.addons : order.decorations).includes('Custom Message Card') && order.customCardMessage && <SummaryRow label="Custom Card Message" value={order.customCardMessage} />}
        {order.message && <SummaryRow label="Note" value={order.message} />}
      </div>

      <div
        className="rounded-2xl p-4 text-center"
        style={{ background: "var(--surface-warm)" }}
      >
        <p
          className="text-xs mb-1"
          style={{
            color: "var(--text-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Estimated Starting Price
        </p>
        <p
          className="font-display text-3xl font-bold"
          style={{ color: "var(--rose-ink)" }}
        >
          ₹{total}+
        </p>
        <p
          className="text-xs mt-1"
          style={{
            color: "var(--text-faint)",
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
        <WhatsAppIcon className="w-4 h-4" />
        Send to Dhvani via WhatsApp
      </button>
    </div>
  );
}
