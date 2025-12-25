
import React from 'react';
import { Product } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="md:w-1/2 bg-slate-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover md:min-h-[500px]"
          />
        </div>

        {/* Right: Info */}
        <div className="md:w-1/2 p-8 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <button 
              onClick={onClose}
              className="md:hidden absolute top-4 right-4 bg-white/80 p-2 rounded-full text-slate-600"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            <div className="hidden md:block"></div>
            <button 
              onClick={onClose}
              className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 transition-colors text-slate-400"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="mb-2">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2 leading-tight">{product.name}</h2>
          <p className="text-3xl font-bold text-indigo-600 mb-6">₹{product.price}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Condition</p>
              <p className="text-sm font-semibold text-slate-700">{product.condition}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Listed On</p>
              <p className="text-sm font-semibold text-slate-700">{new Date(product.postedDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-tight">Description</h4>
            <p className="text-slate-600 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          <div className="mt-auto pt-8 border-t border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-tight">Contact Seller</h4>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-100">
                {product.seller.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900">{product.seller}</p>
                <p className="text-xs text-slate-500">Verified Student</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {product.whatsapp && (
                <a 
                  href={`https://wa.me/${product.whatsapp.replace(/\+/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-3"
                >
                  <i className="fab fa-whatsapp text-xl"></i>
                  Message on WhatsApp
                </a>
              )}
              {product.linkedin && (
                <a 
                  href={product.linkedin.startsWith('http') ? product.linkedin : `https://linkedin.com/in/${product.linkedin}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-[#0077B5] hover:bg-[#006399] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-3"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                  View LinkedIn Profile
                </a>
              )}
              {!product.whatsapp && !product.linkedin && (
                <p className="text-center text-slate-400 text-sm italic py-2">
                  No contact links provided by the seller.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
