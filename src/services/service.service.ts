import { ServiceTypes } from "../interface/common.interface";
import Service from "../models/service.model";
import QueryString from "qs";

const addService = async (service: ServiceTypes) => {
  const newService = new Service(service);
  return await newService.save();
};

const queryServices = async (
  filter: Pick<QueryString.ParsedQs, "name" | "is_active">,
  options: Pick<QueryString.ParsedQs, "sortBy" | "limit" | "page" | "search">
) => {
  const services = await Service.paginate(filter, options);
  return services;
};

const getServices = async (
  filter: Pick<QueryString.ParsedQs, "name" | "is_active">,
  options: Pick<QueryString.ParsedQs, "sortBy" | "limit" | "page" | "search">
) => {
  filter.is_active = "true";
  const services = await Service.paginate(filter, options);
  services.results = services.results.map((service: ServiceTypes) => {
    return {
      name: service.name,
      description: service.description,
      alias: service.alias,
      thumbnail: service.thumbnail,
    };
  });
  return services;
};

const getServiceById = async (id: string) => {
  return await Service.findById(id);
};

const getServiceByAlias = async (alias: string) => {
  return await Service.findOne({ alias });
};

const updateServiceById = async (id: string, service: ServiceTypes) => {
  return await Service.findByIdAndUpdate(id, service, { new: true });
};

const deleteServiceById = async (id: string) => {
  return await Service.findByIdAndDelete(id);
};

export default {
  addService,
  getServices,
  queryServices,
  getServiceById,
  getServiceByAlias,
  updateServiceById,
  deleteServiceById,
};
