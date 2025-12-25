
export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Microcontrollers' | 'Sensors' | 'Components' | 'Tools' | 'Kits';
  condition: 'New' | 'Like New' | 'Used - Good' | 'Used - Fair';
  description: string;
  image: string;
  seller: string;
  postedDate: string;
  whatsapp?: string; // Phone number for WhatsApp
  linkedin?: string; // LinkedIn profile URL or handle
}

export type Category = 'All' | 'Microcontrollers' | 'Sensors' | 'Components' | 'Tools' | 'Kits';
