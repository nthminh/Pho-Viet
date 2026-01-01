'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle, XCircle, Printer } from 'lucide-react';

interface Order {
  id: string;
  tableNumber: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  totalAmount: number;
  status: string;
  createdAt: string;
  customerName?: string;
}

export default function POSPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'DH001',
      tableNumber: 1,
      items: [
        { name: 'Phở Bò Tái', quantity: 2, price: 65000 },
        { name: 'Trà Đá', quantity: 2, price: 10000 },
      ],
      totalAmount: 150000,
      status: 'pending',
      createdAt: '2026-01-01 10:30:00',
      customerName: 'Nguyễn Văn A',
    },
    {
      id: 'DH002',
      tableNumber: 3,
      items: [
        { name: 'Phở Gà', quantity: 1, price: 55000 },
        { name: 'Gỏi Cuốn', quantity: 1, price: 40000 },
      ],
      totalAmount: 95000,
      status: 'preparing',
      createdAt: '2026-01-01 10:35:00',
    },
  ]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ready': return 'bg-green-100 text-green-800 border-green-300';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ Xử Lý';
      case 'preparing': return 'Đang Nấu';
      case 'ready': return 'Sẵn Sàng';
      case 'completed': return 'Hoàn Thành';
      default: return status;
    }
  };

  const printOrder = (order: Order) => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:bg-blue-700 rounded-full p-2 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">💰 POS - Quản Lý Đơn Hàng</h1>
              <p className="text-sm text-blue-100">Hệ thống điểm bán hàng</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Chờ Xử Lý</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đang Nấu</p>
                <p className="text-2xl font-bold text-blue-600">
                  {orders.filter(o => o.status === 'preparing').length}
                </p>
              </div>
              <div className="w-8 h-8 text-blue-600">🔥</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sẵn Sàng</p>
                <p className="text-2xl font-bold text-green-600">
                  {orders.filter(o => o.status === 'ready').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng Doanh Thu</p>
                <p className="text-xl font-bold text-blue-600">
                  {formatPrice(orders.reduce((sum, o) => sum + o.totalAmount, 0))}
                </p>
              </div>
              <div className="w-8 h-8 text-blue-600">💵</div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-800">Danh Sách Đơn Hàng</h2>
          </div>
          <div className="divide-y">
            {orders.map(order => (
              <div key={order.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl font-bold text-gray-800">Bàn {order.tableNumber}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <p>Mã đơn: <span className="font-semibold">{order.id}</span></p>
                      {order.customerName && (
                        <p>Khách hàng: <span className="font-semibold">{order.customerName}</span></p>
                      )}
                      <p>Thời gian: {order.createdAt}</p>
                    </div>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <p key={idx} className="text-sm text-gray-700">
                          • {item.name} x{item.quantity} - {formatPrice(item.price * item.quantity)}
                        </p>
                      ))}
                    </div>
                    <p className="text-lg font-bold text-blue-600 mt-2">
                      Tổng: {formatPrice(order.totalAmount)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Bắt Đầu Nấu
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Đã Xong
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Hoàn Thành
                      </button>
                    )}
                    <button
                      onClick={() => printOrder(order)}
                      className="bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      In Đơn
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
