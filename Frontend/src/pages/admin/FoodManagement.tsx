import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit3, Trash2, Package, Calendar, AlertTriangle } from 'lucide-react';

const FoodManagement = () => {
  interface FoodItem {
    id: number;
    name: string;
    category: string;
    expiryDate: string;
    quantity: number;
    notes: string;
    unit: string;
    location: string;
  }
  
  const [foods, setFoods] = useState<FoodItem[]>([
    {
      id: 1,
      name: 'Organic Apples',
      category: 'Fruits',
      quantity: 12,
      unit: 'pieces',
      expiryDate: '2025-07-15',
      location: 'Refrigerator',
      notes: 'Fresh from farmers market'
    },
    {
      id: 2,
      name: 'Whole Milk',
      category: 'Dairy',
      quantity: 2,
      unit: 'liters',
      expiryDate: '2025-06-30',
      location: 'Refrigerator',
      notes: 'Organic brand'
    },
    {
      id: 3,
      name: 'Brown Rice',
      category: 'Grains',
      quantity: 1,
      unit: 'kg',
      expiryDate: '2026-01-15',
      location: 'Pantry',
      notes: 'Basmati variety'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: '',
    expiryDate: '',
    location: '',
    notes: ''
  });

  const categories = ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Grains', 'Beverages', 'Snacks', 'Condiments'];
  const units = ['pieces', 'kg', 'grams', 'liters', 'ml', 'cups', 'cans', 'bottles'];

  const filteredFoods = useMemo(() => {
    return foods.filter(food => {
      const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           food.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || food.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [foods, searchTerm, selectedCategory]);

  const isExpiringSoon = (expiryDate:string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const isExpired = (expiryDate:string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return expiry < today;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingItem) {
      setFoods(foods.map(food => 
        food.id === editingItem.id
          ? { ...formData, id: editingItem.id, quantity: parseFloat(formData.quantity) }
          : food
      ));
    } else {
      const newFood = {
        ...formData,
        id: Date.now(),
        quantity: parseFloat(formData.quantity)
      };
      setFoods([...foods, newFood]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      quantity: '',
      unit: '',
      expiryDate: '',
      location: '',
      notes: ''
    });
    setShowForm(false);
    setEditingItem(null);
  };

  const handleEdit = (food: FoodItem) => {
    setFormData({
      name: food.name,
      category: food.category,
      quantity: food.quantity.toString(),
      unit: food.unit,
      expiryDate: food.expiryDate,
      location: food.location,
      notes: food.notes
    });
    setEditingItem(food);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setFoods(foods.filter(food => food.id !== id));
  };

  const getExpiryStatus = (expiryDate: string) => {
    if (isExpired(expiryDate)) {
      return { status: 'expired', color: 'text-red-600', bg: 'bg-red-50' };
    } else if (isExpiringSoon(expiryDate)) {
      return { status: 'expiring', color: 'text-orange-600', bg: 'bg-orange-50' };
    }
    return { status: 'fresh', color: 'text-green-600', bg: 'bg-green-50' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Package className="text-green-600" />
            Food Management System
          </h1>
          <p className="text-gray-600">Track your food inventory, expiry dates, and never waste food again!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-800">{foods.length}</p>
              </div>
              <Package className="text-blue-500 w-8 h-8" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-orange-600">
                  {foods.filter(food => isExpiringSoon(food.expiryDate)).length}
                </p>
              </div>
              <AlertTriangle className="text-orange-500 w-8 h-8" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">
                  {foods.filter(food => isExpired(food.expiryDate)).length}
                </p>
              </div>
              <Calendar className="text-red-500 w-8 h-8" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-green-600">
                  {new Set(foods.map(food => food.category)).size}
                </p>
              </div>
              <Search className="text-green-500 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search food items..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Food Item
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Food Item' : 'Add New Food Item'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                >
                  <option value="">Select Unit</option>
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Refrigerator, Pantry, Freezer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Additional notes about this item..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map(food => {
            const expiryStatus = getExpiryStatus(food.expiryDate);
            return (
              <div key={food.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{food.name}</h3>
                    <p className="text-sm text-gray-600">{food.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(food)}
                      className="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(food.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <span className="text-sm font-medium">{food.quantity} {food.unit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Location:</span>
                    <span className="text-sm font-medium">{food.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expires:</span>
                    <span className={`text-sm font-medium ${expiryStatus.color}`}>
                      {new Date(food.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-medium ${expiryStatus.bg} ${expiryStatus.color} mb-3`}>
                  {expiryStatus.status === 'expired' ? 'Expired' : 
                   expiryStatus.status === 'expiring' ? 'Expiring Soon' : 'Fresh'}
                </div>

                {food.notes && (
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{food.notes}</p>
                )}
              </div>
            );
          })}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No food items found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory ? 'Try adjusting your search or filter.' : 'Add your first food item to get started!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodManagement;