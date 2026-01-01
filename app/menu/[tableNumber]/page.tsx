'use client';

import { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { menuItems, categories } from '@/lib/menu-data';
import { OrderItem } from '@/lib/types';
import { ShoppingCart, Plus, Minus, X, Camera } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function MenuPage() {
  const params = useParams();
  const router = useRouter();
  const tableNumber = parseInt(params.tableNumber as string);
  const [selectedCategory, setSelectedCategory] = useState('Tất Cả');
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderId, setOrderId] = useState('');
  const receiptRef = useRef<HTMLDivElement>(null);

  const filteredItems = selectedCategory === 'Tất Cả'
    ? menuItems.filter(item => item.available)
    : menuItems.filter(item => item.category === selectedCategory && item.available);

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.menuItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.menuItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { menuItem: item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart(cart.map(item =>
      item.menuItem.id === itemId
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.menuItem.id !== itemId));
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const handleSubmitOrder = () => {
    if (cart.length === 0) {
      alert('Giỏ hàng trống!');
      return;
    }
    const newOrderId = `DH${Date.now().toString().slice(-6)}`;
    setOrderId(newOrderId);
    setShowReceipt(true);
    setShowCart(false);
  };

  const downloadReceipt = async () => {
    if (receiptRef.current) {
      const canvas = await html2canvas(receiptRef.current);
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `receipt-${orderId}.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-500 to-orange-500 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">🍜 Phở Việt</h1>
              <p className="text-sm">Bàn số {tableNumber}</p>
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="relative bg-white text-red-500 rounded-full p-3 hover:bg-red-50 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-[72px] bg-white shadow-md z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                <span className="text-6xl">🍜</span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.nameEn}</p>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-red-600">{formatPrice(item.price)}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center">
          <div className="bg-white w-full md:max-w-2xl md:rounded-t-2xl rounded-t-2xl md:rounded-2xl max-h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Giỏ Hàng</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Giỏ hàng trống</p>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.menuItem.id} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.menuItem.name}</h4>
                        <p className="text-sm text-gray-600">{formatPrice(item.menuItem.price)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, -1)}
                          className="bg-gray-300 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-400"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.menuItem.id, 1)}
                          className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.menuItem.id)}
                          className="text-red-500 ml-2"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {cart.length > 0 && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Tên khách hàng (không bắt buộc)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Tổng cộng:</span>
                  <span className="text-2xl font-bold text-red-600">{formatPrice(getTotalAmount())}</span>
                </div>
                <button
                  onClick={handleSubmitOrder}
                  className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  Gửi Đơn Hàng
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div ref={receiptRef} className="p-8 bg-white">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-red-600">🍜 Phở Việt</h1>
                <p className="text-sm text-gray-600 mt-2">Cảm ơn quý khách!</p>
              </div>

              <div className="border-t border-b border-dashed border-gray-300 py-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Mã đơn:</span>
                  <span className="font-bold">{orderId}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Bàn:</span>
                  <span className="font-bold">{tableNumber}</span>
                </div>
                {customerName && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Khách hàng:</span>
                    <span className="font-bold">{customerName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Thời gian:</span>
                  <span className="font-bold">{new Date().toLocaleString('vi-VN')}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {cart.map(item => (
                  <div key={item.menuItem.id} className="flex justify-between text-sm">
                    <span className="flex-1">{item.menuItem.name} x{item.quantity}</span>
                    <span className="font-semibold">{formatPrice(item.menuItem.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600">{formatPrice(getTotalAmount())}</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mt-6">
                Món ăn sẽ được phục vụ trong thời gian sớm nhất
              </p>
            </div>

            <div className="p-4 border-t flex gap-3">
              <button
                onClick={downloadReceipt}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <Camera className="w-5 h-5" />
                Lưu Hóa Đơn
              </button>
              <button
                onClick={() => {
                  setShowReceipt(false);
                  setCart([]);
                  setCustomerName('');
                }}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
