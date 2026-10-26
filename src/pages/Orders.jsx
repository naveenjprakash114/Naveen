import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PackageCheck, Clock, MapPin, ArrowRight } from 'lucide-react';
import { formatINR } from '../utils/pricing';

export default function Orders() {
  const { activeOrder } = useCart();

  const mockPastOrders = [
    {
      id: 'VS-SALEM-719203',
      date: 'Yesterday, 8:30 PM',
      itemsCount: 2,
      total: 348,
      status: 'DELIVERED',
      hub: 'Fairlands Hub (5 km)'
    },
    {
      id: 'VS-SALEM-512094',
      date: '28 Sep 2026, 9:15 PM',
      itemsCount: 3,
      total: 519,
      status: 'DELIVERED',
      hub: 'Alagapuram Hub (5 km)'
    }
  ];

  return (
    <div className="min-h-screen bg-[#160D22] pt-28 pb-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-8 max-w-4xl mx-auto">
        
        <h1 className="text-3xl font-serif-title font-bold text-[#FFF8F0]">
          My Orders & Cold Express History
        </h1>

        {/* Active Order Card if present */}
        {activeOrder && (
          <div className="bg-[#271332] p-6 rounded-3xl border-2 border-[#D4AF61] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold bg-[#D4AF61] text-[#160D22] px-3 py-1 rounded-full uppercase tracking-wider">
                ACTIVE ORDER
              </span>
              <span className="text-xs font-bold text-[#D4AF61] bg-[#160D22] px-3 py-1 rounded-full border border-[#D4AF61]/30">
                En Route (8–10 Mins)
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
                  Order #{activeOrder.id}
                </h3>
                <p className="text-xs text-[#B99AD8]/80">{activeOrder.items?.length || 1} item(s) • Insulated Box Sealed</p>
              </div>

              <Link
                to="/track-order"
                className="bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1 hover:brightness-110 shadow-lg"
              >
                <span>Track Live</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#160D22]" />
              </Link>
            </div>
          </div>
        )}

        {/* Past Orders History */}
        <div className="space-y-4">
          <h3 className="font-serif-title font-bold text-xl text-[#FFF8F0]">
            Past Orders
          </h3>

          <div className="space-y-3">
            {mockPastOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-[#271332] p-5 rounded-2xl border border-[#4A2673]/60 flex items-center justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif-title font-bold text-base text-[#FFF8F0]">
                      {ord.id}
                    </span>
                    <span className="text-[10px] font-bold bg-[#160D22] text-[#D4AF61] px-2 py-0.5 rounded border border-[#D4AF61]/30">
                      {ord.status}
                    </span>
                  </div>
                  <span className="text-xs text-[#B99AD8]/70 block mt-1">
                    {ord.date} • {ord.hub}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-bold text-base text-[#D4AF61] block">
                    {formatINR(ord.total)}
                  </span>
                  <span className="text-xs text-[#B99AD8]/80 font-semibold">
                    {ord.itemsCount} items
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
