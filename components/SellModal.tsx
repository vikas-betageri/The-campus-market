
import React, { useState, useRef } from 'react';
import { Product } from '../types';

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: Product) => void;
  user: any;
}

const SellModal: React.FC<SellModalProps> = ({ isOpen, onClose, onAdd, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Microcontrollers',
    condition: 'Used - Good',
    description: '',
    whatsapp: '',
    linkedin: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category as any,
      condition: formData.condition as any,
      description: formData.description,
      // Use uploaded image or a fallback if none selected
      image: imagePreview || `https://picsum.photos/seed/${formData.name}/400/400`,
      seller: user?.name || 'Anonymous',
      postedDate: new Date().toISOString(),
      whatsapp: formData.whatsapp,
      linkedin: formData.linkedin
    };
    onAdd(newProduct);
    // Reset state
    setFormData({
      name: '',
      price: '',
      category: 'Microcontrollers',
      condition: 'Used - Good',
      description: '',
      whatsapp: '',
      linkedin: ''
    });
    setImagePreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">List Your Component</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Product Image</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all h-48 overflow-hidden
                ${imagePreview ? 'border-indigo-400' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'}`}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-full w-full object-contain" />
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt text-3xl text-slate-300 mb-2"></i>
                  <p className="text-sm text-slate-500 font-medium">Click to upload product image</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Item Name</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Arduino Uno"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Price (₹)</label>
              <input 
                required
                type="number" 
                placeholder="0.00"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
              <select 
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>Microcontrollers</option>
                <option>Sensors</option>
                <option>Components</option>
                <option>Tools</option>
                <option>Kits</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Condition</label>
              <select 
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.condition}
                onChange={e => setFormData({...formData, condition: e.target.value})}
              >
                <option>New</option>
                <option>Like New</option>
                <option>Used - Good</option>
                <option>Used - Fair</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
            <textarea 
              required
              rows={3}
              placeholder="Describe the condition, usage, and any extras included..."
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 space-y-4">
            <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-2">
              <i className="fas fa-address-card"></i> Seller Contact Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-indigo-600 mb-1">WhatsApp (e.g. +91...)</label>
                <input 
                  type="text" 
                  placeholder="+91..."
                  className="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.whatsapp}
                  onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-indigo-600 mb-1">LinkedIn Username/Link</label>
                <input 
                  type="text" 
                  placeholder="johndoe"
                  className="w-full border border-indigo-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.linkedin}
                  onChange={e => setFormData({...formData, linkedin: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-100"
          >
            Post Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellModal;
