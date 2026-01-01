'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';

interface KitchenOrder {
  id: string;
  tableNumber: number;
  orderNumber: number;
  items: Array<{ name: string; quantity: number }>;
  status: string;
  createdAt: Date;
  timeElapsed: number;
}

export default function KitchenPage() {
  const [orders, setOrders] = useState<KitchenOrder[]>([
    {
      id: 'DH001',
      tableNumber: 1,
      orderNumber: 1,
      items: [
        { name: 'Phở Bò Tái', quantity: 2 },
        { name: 'Trà Đá', quantity: 2 },
      ],
      status: 'pending',
      createdAt: new Date(Date.now() - 5 * 60000),
      timeElapsed: 5,
    },
    {
      id: 'DH002',
      tableNumber: 3,
      orderNumber: 2,
      items: [
        { name: 'Phở Gà', quantity: 1 },
        { name: 'Gỏi Cuốn', quantity: 1 },
      ],
      status: 'preparing',
      createdAt: new Date(Date.now() - 10 * 60000),
      timeElapsed: 10,
    },
    {
      id: 'DH003',
      tableNumber: 5,
      orderNumber: 3,
      items: [
        { name: 'Bún Bò Huế', quantity: 2 },
        { name: 'Chả Giò', quantity: 1 },
      ],
      status: 'pending',
      createdAt: new Date(Date.now() - 2 * 60000),
      timeElapsed: 2,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => ({
          ...order,
          timeElapsed: Math.floor((Date.now() - order.createdAt.getTime()) / 60000)
        }))
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const markAsReady = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'ready' } : order
    ));
  };

  const startPreparing = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: 'preparing' } : order
    ));
  };

  const getTimeColor = (minutes: number) => {
    if (minutes < 5) return 'text-green-600';
    if (minutes < 10) return 'text-yellow-600';
    return 'text-red-600';
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const readyOrders = orders.filter(o => o.status === 'ready');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-green-600 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:bg-green-700 rounded-full p-2 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold">👨‍🍳 Màn Hình Bếp</h1>
              <p className="text-sm text-green-100">
                {new Date().toLocaleString('vi-VN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-100">Tổng đơn hàng</p>
              <p className="text-3xl font-bold">{orders.length}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Orders */}
          <div className="space-y-4">
            <div className="bg-yellow-600 rounded-lg p-3 text-center">
              <h2 className="text-xl font-bold">CHỜ XỬ LÝ ({pendingOrders.length})</h2>
            </div>
            <div className="space-y-4">
              {pendingOrders.map(order => (
                <div key={order.id} className="bg-gray-800 rounded-lg p-4 border-2 border-yellow-500">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">BÀN {order.tableNumber}</div>
                      <div className="text-sm text-gray-400">Đơn #{order.orderNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${getTimeColor(order.timeElapsed)}`}>
                        {order.timeElapsed} phút
                      </div>
                      <div className="text-xs text-gray-400">
                        <Clock className="w-4 h-4 inline" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="bg-gray-700 rounded p-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-lg">{item.name}</span>
                          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
                            x{item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => startPreparing(order.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    BẮT ĐẦU NẤU
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preparing Orders */}
          <div className="space-y-4">
            <div className="bg-blue-600 rounded-lg p-3 text-center">
              <h2 className="text-xl font-bold">ĐANG NẤU ({preparingOrders.length})</h2>
            </div>
            <div className="space-y-4">
              {preparingOrders.map(order => (
                <div key={order.id} className="bg-gray-800 rounded-lg p-4 border-2 border-blue-500">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">BÀN {order.tableNumber}</div>
                      <div className="text-sm text-gray-400">Đơn #{order.orderNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${getTimeColor(order.timeElapsed)}`}>
                        {order.timeElapsed} phút
                      </div>
                      <div className="text-xs text-gray-400">
                        <Clock className="w-4 h-4 inline" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="bg-gray-700 rounded p-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-lg">{item.name}</span>
                          <span className="bg-blue-500 text-white px-3 py-1 rounded-full font-bold">
                            x{item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => markAsReady(order.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    HOÀN THÀNH
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Ready Orders */}
          <div className="space-y-4">
            <div className="bg-green-600 rounded-lg p-3 text-center">
              <h2 className="text-xl font-bold">SẴN SÀNG ({readyOrders.length})</h2>
            </div>
            <div className="space-y-4">
              {readyOrders.map(order => (
                <div key={order.id} className="bg-gray-800 rounded-lg p-4 border-2 border-green-500">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-2xl font-bold text-green-400">BÀN {order.tableNumber}</div>
                      <div className="text-sm text-gray-400">Đơn #{order.orderNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xl font-bold ${getTimeColor(order.timeElapsed)}`}>
                        {order.timeElapsed} phút
                      </div>
                      <div className="text-xs text-gray-400">
                        <Clock className="w-4 h-4 inline" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="bg-gray-700 rounded p-2">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-lg">{item.name}</span>
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">
                            x{item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
