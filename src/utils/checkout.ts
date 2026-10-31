// ============================================================
// Bloom & Glow — Checkout Utilities
// ============================================================

import { CartItem } from '../types';
import { formatPrice } from '../data/products';

const WHATSAPP_NUMBER = '917841834995';
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

// ── Order Summary Generator ──────────────────────────────────

export function generateOrderSummary(
  items: CartItem[],
  subtotal: number,
  hasUnpricedItems: boolean,
  customerDetails?: { name?: string; phone?: string; address?: string; notes?: string }
): string {
  const lines: string[] = [];

  lines.push('🌸 *Bloom & Glow — Order Summary*');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');

  items.forEach((item, index) => {
    lines.push(`*${index + 1}. ${item.product.name}*`);
    if (item.variant) {
      lines.push(`   Variant: ${item.variant.name}`);
    }
    lines.push(`   Qty: ${item.quantity}`);

    if (item.product.price !== null) {
      const unitPrice = item.product.price + (item.variant?.priceModifier ?? 0);
      lines.push(`   Price: ${formatPrice(unitPrice)} × ${item.quantity} = ${formatPrice(unitPrice * item.quantity)}`);
    } else {
      lines.push(`   Price: _Price on request_`);
    }

    // Include customization details
    const customKeys = Object.keys(item.customizations);
    if (customKeys.length > 0) {
      customKeys.forEach(key => {
        if (item.customizations[key]) {
          lines.push(`   ${key}: ${item.customizations[key]}`);
        }
      });
    }
    lines.push('');
  });

  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (subtotal > 0) {
    lines.push(`*Subtotal (priced items): ${formatPrice(subtotal)}*`);
  }

  if (hasUnpricedItems) {
    lines.push('');
    lines.push('⚠️ _Some items require price confirmation._');
  }

  if (customerDetails) {
    lines.push('');
    lines.push('*Customer Details:*');
    if (customerDetails.name) lines.push(`Name: ${customerDetails.name}`);
    if (customerDetails.phone) lines.push(`Phone: ${customerDetails.phone}`);
    if (customerDetails.address) lines.push(`Delivery Address: ${customerDetails.address}`);
    if (customerDetails.notes) lines.push(`Notes: ${customerDetails.notes}`);
  }

  lines.push('');
  lines.push('_Please confirm this order and share the final amount. Thank you! 🙏_');

  return lines.join('\n');
}

// ── WhatsApp URL Generator ───────────────────────────────────

export function generateWhatsAppUrl(message: string): string {
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

// ── Copy to Clipboard ────────────────────────────────────────

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }
}

export const INSTAGRAM_URL = 'https://www.instagram.com/bloomandglow24_/';
export const INSTAGRAM_HANDLE = '@bloomandglow24_';
export const WHATSAPP_DISPLAY = '+91 78418 34995';
export const EMAIL = 'bloomandglow27@gmail.com';
export const BRAND_TAGLINE = 'Bloom into calm, glow into joy';

