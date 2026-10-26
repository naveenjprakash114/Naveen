/**
 * Formats a number to Indian Rupee currency string
 */
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Calculates cart order summary: subtotal, delivery fee, tax, discount, final total
 */
export function calculateOrderSummary(cartItems, couponCode = null) {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Delivery fee logic: Free for orders >= ₹249, else ₹29
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 249 ? 0 : 29;

  // Cold packaging fee (Freeze Box guarantee)
  const freezeBoxFee = subtotal === 0 ? 0 : 15;

  // GST 5% on ice cream
  const tax = Math.round(subtotal * 0.05);

  let discount = 0;
  if (couponCode === 'FIRSTSCOOP' && subtotal >= 199) {
    discount = 50;
  } else if (couponCode === 'DOUBLEDELIGHT' && subtotal >= 299) {
    discount = Math.round(subtotal * 0.20);
  } else if (couponCode === 'FAMILYFREEZE' && subtotal >= 599) {
    discount = 100;
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + freezeBoxFee + tax - discount);

  return {
    subtotal,
    deliveryFee,
    freezeBoxFee,
    tax,
    discount,
    grandTotal
  };
}
