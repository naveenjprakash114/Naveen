import React from 'react';
import { categories } from '../data/categories';

export default function CategoryTabs({ activeCategory, onSelectCategory }) {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none no-scrollbar py-2">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 border ${
              isActive
                ? 'bg-gradient-to-r from-[#D4AF61] to-[#b89346] text-[#160D22] border-[#D4AF61] shadow-lg scale-105 font-extrabold'
                : 'glass-card hover:bg-[#271332] text-[#B99AD8] border-[#4A2673]/60 hover:border-[#D4AF61]'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
