import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { ILoyaltyCustomerRequest, ILoyaltyCustomerUpdateRequest } from "../interfaces/loyaltyCustomer";
import createLoyaltyCustomerService from "../services/loyaltyCustomer/createLoyaltyCustomer.service";
import listLoyaltyCustomersService from "../services/loyaltyCustomer/listLoyaltyCustomers.service";
import listLoyaltyCustomerService from "../services/loyaltyCustomer/listLoyaltyCustomer.service";
import updateLoyaltyCustomerService from "../services/loyaltyCustomer/updateLoyaltyCustomer.service";
import softDeleteLoyaltyCustomerService from "../services/loyaltyCustomer/softDeleteLoyaltyCustomer.service";

export const createLoyaltyCustomerController = async (
  req: Request,
  res: Response
) => {
  
  const { name, email }: ILoyaltyCustomerRequest = req.body;
  const loyaltyCustomer = await createLoyaltyCustomerService({ name, email });
  return res.status(201).json(instanceToPlain(loyaltyCustomer));
};

export const listLoyaltyCustomersController = async (
  req: Request,
  res: Response
) => {
  
  const loyaltyCustomer = await listLoyaltyCustomersService();
  return res.status(201).json(instanceToPlain(loyaltyCustomer));
};

export const listLoyaltyCustomerController = async (
  req: Request,
  res: Response
) => {

  const { id } = req.params
  // const { isActive } = req.employee
  const loyaltyCustomer = await listLoyaltyCustomerService(id);
  return res.status(201).json(instanceToPlain(loyaltyCustomer));
};

export const updateLoyaltyCustomersController = async (
  req: Request,
  res: Response
) => {
  
  const id = req.params.id
  const {email, name, fidelityPoints}: ILoyaltyCustomerUpdateRequest = req.body
  const updatedLoyaltyCustomer = await updateLoyaltyCustomerService(id, {email, name, fidelityPoints})
  return res.status(201).json(instanceToPlain(updatedLoyaltyCustomer));
};

export const softDeleteLoyaltyCustomerController = async (req: Request, res: Response) => {
  
  const { id } = req.params
  const customer = await softDeleteLoyaltyCustomerService(id)
  return res.status(204).json()

}