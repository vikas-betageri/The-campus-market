
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-indigo-700 shadow-sm border border-indigo-100">
          {product.condition}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-slate-900 leading-tight line-clamp-2">{product.name}</h3>
          <span className="text-xl font-bold text-indigo-600 ml-2">₹{product.price}</span>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase">
              {product.seller.charAt(0)}
            </div>
            <span className="text-xs text-slate-600 font-medium truncate max-w-[80px]">{product.seller}</span>
          </div>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-bold transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
