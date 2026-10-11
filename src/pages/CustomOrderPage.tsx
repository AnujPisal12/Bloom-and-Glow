import { useState } from 'react';
import { Sparkles, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { generateWhatsAppUrl } from '../utils/checkout';

interface FormData {
  name: string;
  phone: string;
  productType: string;
  quantity: string;
  customization: string;
  requestedDate: string;
  instructions: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  productType: '',
  quantity: '',
  customization: '',
  requestedDate: '',
  instructions: '',
};

const productTypes = [
  'Custom Candle Design',
  'Personalised Photo Candle',
  'Layered/Gradient Candle',
  'Decorative Diyas (Bulk)',
  'Diwali/Festive Hamper',
  'Corporate Gift Hamper',
  'Wedding/Event Favours',
  'Custom Fragrance Blend',
  'Other',
];

export default function CustomOrderPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.productType) newErrors.productType = 'Please select a product type';
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = [
      '🌸 *Bloom & Glow — Custom Order Enquiry*',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      '',
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
      `*Product Type:* ${formData.productType}`,
      `*Quantity:* ${formData.quantity}`,
      formData.customization ? `*Customization:* ${formData.customization}` : '',
      formData.requestedDate ? `*Requested Date:* ${formData.requestedDate}` : '',
      formData.instructions ? `*Additional Instructions:* ${formData.instructions}` : '',
      '',
      '_Looking forward to your response! 🙏_',
    ]
      .filter(Boolean)
      .join('\n');

    const url = generateWhatsAppUrl(message);
    window.open(url, '_blank');
    setIsSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-ivory pt-24">
        <div className="max-w-lg mx-auto px-4 py-16 text-center animate-fade-in-up">
          <div className="w-20 h-20 rounded-full bg-green-100 mx-auto flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-chocolate mb-4">Enquiry Sent!</h1>
          <p className="text-muted-brown mb-4">
            Your custom order enquiry has been sent to Bloom & Glow via WhatsApp.
          </p>
          <p className="text-sm text-muted-brown mb-8">
            Please note: Your enquiry has been sent — it is not a confirmed order.
            The Bloom & Glow team will review your request and respond with details and pricing.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData(initialFormData);
            }}
            className="inline-flex items-center gap-2 bg-chocolate text-ivory px-6 py-3 rounded-full text-sm font-semibold hover:bg-peach-dark transition-colors btn-primary"
          >
            Submit Another Enquiry
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory pt-20 sm:pt-24">
      {/* Header */}
      <section className="bg-blush watercolor-bg py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Sparkles size={32} className="mx-auto text-peach-dark mb-3" />
          <p className="font-script text-xl text-peach-dark mb-2">Make it yours</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-chocolate mb-4">Custom Orders</h1>
          <p className="text-muted-brown max-w-xl mx-auto">
            From personalised candles to bespoke festive hampers — tell us your vision and we'll craft it for you.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-taupe/15 p-6 sm:p-8" id="custom-order-form">
              <h2 className="font-serif text-xl font-bold text-chocolate mb-6">Enquiry Details</h2>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => handleChange('name', e.target.value)}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 bg-ivory border rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50 ${
                      errors.name ? 'border-red-300' : 'border-taupe/20'
                    }`}
                  />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">
                    Contact Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full px-4 py-3 bg-ivory border rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50 ${
                      errors.phone ? 'border-red-300' : 'border-taupe/20'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>

                {/* Product Type */}
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">
                    Product Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.productType}
                    onChange={e => handleChange('productType', e.target.value)}
                    className={`w-full px-4 py-3 bg-ivory border rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50 ${
                      errors.productType ? 'border-red-300' : 'border-taupe/20'
                    }`}
                  >
                    <option value="">Select product type...</option>
                    {productTypes.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.productType && <p className="text-xs text-red-400 mt-1">{errors.productType}</p>}
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">
                    Quantity <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={e => handleChange('quantity', e.target.value)}
                    placeholder="e.g., 50 pieces, 10 hampers"
                    className={`w-full px-4 py-3 bg-ivory border rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50 ${
                      errors.quantity ? 'border-red-300' : 'border-taupe/20'
                    }`}
                  />
                  {errors.quantity && <p className="text-xs text-red-400 mt-1">{errors.quantity}</p>}
                </div>

                {/* Customization */}
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">
                    Customization Preferences
                  </label>
                  <textarea
                    value={formData.customization}
                    onChange={e => handleChange('customization', e.target.value)}
                    placeholder="Colors, fragrances, designs, branding, packaging preferences..."
                    rows={3}
                    className="w-full px-4 py-3 bg-ivory border border-taupe/20 rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50 resize-none"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">
                    Requested Date
                  </label>
                  <input
                    type="date"
                    value={formData.requestedDate}
                    onChange={e => handleChange('requestedDate', e.target.value)}
                    className="w-full px-4 py-3 bg-ivory border border-taupe/20 rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50"
                  />
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-sm font-medium text-chocolate mb-1">
                    Additional Instructions
                  </label>
                  <textarea
                    value={formData.instructions}
                    onChange={e => handleChange('instructions', e.target.value)}
                    placeholder="Any other details we should know..."
                    rows={3}
                    className="w-full px-4 py-3 bg-ivory border border-taupe/20 rounded-lg text-sm text-chocolate focus:outline-none focus:ring-2 focus:ring-peach/30 focus:border-peach/50 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 mt-8 py-3.5 bg-chocolate text-ivory rounded-full text-sm font-semibold hover:bg-peach-dark transition-all shadow-lg shadow-chocolate/15"
                id="submit-enquiry-btn"
              >
                <Send size={16} />
                Send Enquiry via WhatsApp
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-cream rounded-2xl p-6 border border-taupe/10">
              <h3 className="font-serif text-lg font-bold text-chocolate mb-3">How It Works</h3>
              <div className="space-y-4">
                {[
                  { icon: Send, text: 'Fill out the form and submit your enquiry' },
                  { icon: MessageCircle, text: 'Your enquiry is sent to us via WhatsApp' },
                  { icon: Clock, text: 'We\'ll review your request and respond with a quote' },
                  { icon: CheckCircle, text: 'Confirm your order and we begin crafting' },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-peach/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <step.icon size={14} className="text-peach-dark" />
                    </div>
                    <p className="text-sm text-muted-brown">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-taupe/15">
              <h3 className="font-serif text-lg font-bold text-chocolate mb-3">We Can Create</h3>
              <ul className="space-y-2 text-sm text-muted-brown">
                {[
                  'Personalised candles with names or photos',
                  'Custom color and fragrance combinations',
                  'Branded corporate gift hampers',
                  'Wedding and event favours',
                  'Festive bulk orders',
                  'Custom packaging and labeling',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Sparkles size={12} className="text-peach mt-1 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
