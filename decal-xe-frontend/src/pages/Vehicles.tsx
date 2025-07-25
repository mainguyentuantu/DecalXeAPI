import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Car, User, Calendar } from 'lucide-react';
import { vehicleApi, customerApi, vehicleBrandApi, vehicleModelApi } from '../services/api';
import { CustomerVehicleDto, CreateCustomerVehicleDto, UpdateCustomerVehicleDto, CustomerDto, VehicleBrandDto, VehicleModelDto } from '../types/api';

const Vehicles: React.FC = () => {
  const [vehicles, setVehicles] = useState<CustomerVehicleDto[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<CustomerVehicleDto[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [brands, setBrands] = useState<VehicleBrandDto[]>([]);
  const [models, setModels] = useState<VehicleModelDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<CustomerVehicleDto | null>(null);
  const [formData, setFormData] = useState<CreateCustomerVehicleDto>({
    chassisNumber: '',
    licensePlate: '',
    color: '',
    year: new Date().getFullYear(),
    initialKM: 0,
    customerID: '',
    modelID: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = vehicles.filter(vehicle =>
      vehicle.licensePlate?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.chassisNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.customerFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicleModelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vehicleBrandName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm]);

  const fetchData = async () => {
    try {
      const [vehiclesResponse, customersResponse, brandsResponse, modelsResponse] = await Promise.all([
        vehicleApi.getAll(),
        customerApi.getAll(),
        vehicleBrandApi.getAll(),
        vehicleModelApi.getAll(),
      ]);
      
      setVehicles(vehiclesResponse.data);
      setCustomers(customersResponse.data);
      setBrands(brandsResponse.data);
      setModels(modelsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVehicle) {
        const response = await vehicleApi.update(editingVehicle.vehicleID, formData as UpdateCustomerVehicleDto);
        setVehicles(vehicles.map(v => v.vehicleID === editingVehicle.vehicleID ? response.data : v));
      } else {
        const response = await vehicleApi.create(formData);
        setVehicles([...vehicles, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const handleEdit = (vehicle: CustomerVehicleDto) => {
    setEditingVehicle(vehicle);
    setFormData({
      chassisNumber: vehicle.chassisNumber,
      licensePlate: vehicle.licensePlate || '',
      color: vehicle.color || '',
      year: vehicle.year || new Date().getFullYear(),
      initialKM: vehicle.initialKM || 0,
      customerID: vehicle.customerID,
      modelID: vehicle.modelID,
    });
    setShowModal(true);
  };

  const handleDelete = async (vehicleId: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehicleApi.delete(vehicleId);
        setVehicles(vehicles.filter(v => v.vehicleID !== vehicleId));
      } catch (error) {
        console.error('Error deleting vehicle:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      chassisNumber: '',
      licensePlate: '',
      color: '',
      year: new Date().getFullYear(),
      initialKM: 0,
      customerID: '',
      modelID: '',
    });
    setEditingVehicle(null);
    setShowModal(false);
  };

  const getModelsByBrand = (brandId: string) => {
    return models.filter(model => model.brandID === brandId);
  };

  const selectedModel = models.find(model => model.modelID === formData.modelID);
  const selectedBrandModels = selectedModel ? getModelsByBrand(selectedModel.brandID) : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Vehicles</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage customer vehicles and their information.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search vehicles by license plate, chassis, customer, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Vehicle List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredVehicles.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              {searchTerm ? 'No vehicles found matching your search.' : 'No vehicles found.'}
            </li>
          ) : (
            filteredVehicles.map((vehicle) => (
              <li key={vehicle.vehicleID} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Car className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {vehicle.licensePlate || 'No License Plate'}
                      </div>
                      <div className="text-sm text-gray-500 space-y-1">
                        <div className="flex items-center">
                          <Car className="h-4 w-4 mr-1" />
                          {vehicle.vehicleBrandName} {vehicle.vehicleModelName}
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {vehicle.customerFullName}
                        </div>
                        {vehicle.year && (
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {vehicle.year} {vehicle.color && `• ${vehicle.color}`}
                          </div>
                        )}
                        <div className="text-xs text-gray-400">
                          Chassis: {vehicle.chassisNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {vehicle.initialKM !== undefined && (
                      <div className="text-right mr-4">
                        <div className="text-sm font-medium text-gray-900">
                          {vehicle.initialKM.toLocaleString()} km
                        </div>
                        <div className="text-xs text-gray-500">Initial KM</div>
                      </div>
                    )}
                    <button
                      onClick={() => handleEdit(vehicle)}
                      className="text-primary-600 hover:text-primary-900 p-1"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(vehicle.vehicleID)}
                      className="text-red-600 hover:text-red-900 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white max-h-screen overflow-y-auto">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer *
                  </label>
                  <select
                    required
                    value={formData.customerID}
                    onChange={(e) => setFormData({ ...formData, customerID: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="">Select a customer</option>
                    {customers.map((customer) => (
                      <option key={customer.customerID} value={customer.customerID}>
                        {customer.customerFullName}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Vehicle Model *
                  </label>
                  <select
                    required
                    value={formData.modelID}
                    onChange={(e) => setFormData({ ...formData, modelID: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="">Select a model</option>
                    {brands.map((brand) => (
                      <optgroup key={brand.brandID} label={brand.brandName}>
                        {getModelsByBrand(brand.brandID).map((model) => (
                          <option key={model.modelID} value={model.modelID}>
                            {model.modelName}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Chassis Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.chassisNumber}
                    onChange={(e) => setFormData({ ...formData, chassisNumber: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    License Plate
                  </label>
                  <input
                    type="text"
                    value={formData.licensePlate}
                    onChange={(e) => setFormData({ ...formData, licensePlate: e.target.value })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Color
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Initial KM
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.initialKM}
                    onChange={(e) => setFormData({ ...formData, initialKM: parseFloat(e.target.value) })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    {editingVehicle ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehicles;