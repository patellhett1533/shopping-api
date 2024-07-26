"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_model_1 = __importDefault(require("../models/service.model"));
const addService = async (service) => {
    const newService = new service_model_1.default(service);
    return await newService.save();
};
const queryServices = async (filter, options) => {
    const services = await service_model_1.default.paginate(filter, options);
    return services;
};
const getServices = async (filter, options) => {
    filter.is_active = "true";
    const services = await service_model_1.default.paginate(filter, options);
    services.results = services.results.map((service) => {
        return {
            name: service.name,
            description: service.description,
            alias: service.alias,
            thumbnail: service.thumbnail,
        };
    });
    return services;
};
const getServiceById = async (id) => {
    return await service_model_1.default.findById(id);
};
const getServiceByAlias = async (alias) => {
    return await service_model_1.default.findOne({ alias });
};
const updateServiceById = async (id, service) => {
    return await service_model_1.default.findByIdAndUpdate(id, service, { new: true });
};
const deleteServiceById = async (id) => {
    return await service_model_1.default.findByIdAndDelete(id);
};
exports.default = {
    addService,
    getServices,
    queryServices,
    getServiceById,
    getServiceByAlias,
    updateServiceById,
    deleteServiceById,
};
