import Link from 'next/link';
import { UtensilsCrossed, ShoppingCart, ChefHat, Settings } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-red-600 mb-4">🍜 Phở Việt</h1>
          <p className="text-xl text-gray-700">Hệ thống quản lý quán phở hiện đại</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Customer Menu */}
          <Link href="/menu/1" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center transform group-hover:scale-105">
              <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Menu Khách</h2>
              <p className="text-gray-600">Xem menu và đặt món</p>
            </div>
          </Link>

          {/* POS System */}
          <Link href="/pos" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center transform group-hover:scale-105">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">POS</h2>
              <p className="text-gray-600">Quản lý đơn hàng</p>
            </div>
          </Link>

          {/* Kitchen Display */}
          <Link href="/kitchen" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center transform group-hover:scale-105">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Bếp</h2>
              <p className="text-gray-600">Màn hình bếp</p>
            </div>
          </Link>

          {/* Admin */}
          <Link href="/admin" className="group">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center transform group-hover:scale-105">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Settings className="w-10 h-10 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Quản Lý</h2>
              <p className="text-gray-600">Cập nhật menu</p>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Hướng dẫn sử dụng</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li>📱 <strong>Menu Khách:</strong> Khách hàng quét QR code để xem menu và đặt món</li>
              <li>💰 <strong>POS:</strong> Nhân viên quản lý đơn hàng và thanh toán</li>
              <li>👨‍🍳 <strong>Bếp:</strong> Màn hình hiển thị đơn hàng cho bếp</li>
              <li>⚙️ <strong>Quản Lý:</strong> Cập nhật menu và hình ảnh món ăn</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
