import type { OrderState, StepId } from "./types";
import { PRODUCTS } from "./data";
import { SummaryRow } from "./StepSummary";
import { PRODUCT_ICONS, WhatsAppIcon } from "./icons";

export default function OrderSidebar({
  order,
  total,
  onSend,
  currentStep,
}: {
  order: OrderState;
  total: number;
  onSend: () => void;
  currentStep: StepId;
}) {
  const productMeta = PRODUCTS.find(p => p.type === order.product);
  const isBrownie = order.product === "brownie";
  const isCookieTin = order.product === "cookietin";
  const ProductIcon = productMeta ? PRODUCT_ICONS[productMeta.type] : null;

  if (currentStep === "summary") return null;

  return (
    <div
      className="sticky top-24 rounded-3xl p-6"
      style={{
        background: "white",
        border: "1px solid var(--line-soft)",
        boxShadow: "0 8px 40px oklch(0.65 0.12 10 / 0.1)",
      }}
    >
      <h3
        className="font-display text-xl font-semibold mb-4 flex items-center justify-center gap-2"
        style={{ color: "var(--text-heading)" }}
      >
        {ProductIcon && (
          <ProductIcon
            className="w-5 h-5"
            style={{ color: productMeta?.color }}
            aria-hidden="true"
          />
        )}
        Your Order
      </h3>

      {!order.product ? (
        <p
          className="text-sm text-center"
          style={{
            color: "oklch(0.65 0.03 30)",
            fontFamily: "var(--font-body)",
          }}
        >
          Select a product to begin building your order.
        </p>
      ) : (
        <>
          <div className="space-y-3 mb-5">
            <SummaryRow label="Product" value={productMeta?.label ?? ""} />
            {order.size && (
              <SummaryRow
                label={isBrownie ? "Qty" : isCookieTin ? "Tin" : "Size"}
                value={order.size.label}
              />
            )}
            {order.deliveryDate && (
              <SummaryRow
                label="Date"
                value={new Date(order.deliveryDate + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
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
            {(isBrownie ? order.addons : order.decorations).length > 0 && (
              <SummaryRow
                label={isBrownie ? "Add-ons" : "Decor"}
                value={(isBrownie ? order.addons : order.decorations).join(
                  ", "
                )}
              />
            )}
            {(isBrownie ? order.addons : order.decorations).includes('Custom Message Card') && order.customCardMessage && (
              <SummaryRow
                label="Custom Card Message"
                value={order.customCardMessage}
              />
            )}
          </div>

          {order.size && (
            <>
              <div
                className="rounded-2xl p-4 mb-4 text-center"
                style={{ background: "var(--surface-warm)" }}
              >
                <p
                  className="text-xs mb-1"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Estimated Price
                </p>
                <p
                  className="font-display text-2xl font-bold"
                  style={{ color: "var(--rose-ink)" }}
                >
                  ₹{total}+
                </p>
              </div>

              <button
                onClick={onSend}
                className="w-full py-3 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "#25D366",
                  color: "white",
                  fontFamily: "var(--font-body)",
                  boxShadow: "0 4px 15px rgba(37,211,102,0.25)",
                }}
              >
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp Order
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}
