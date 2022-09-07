import { Request, Response } from "express";
import {
  ISupplierRequest,
  ISupplierUpdateRequest,
} from "../interfaces/supplier";
import createSupplierService from "../services/suppliers/createSupplier.service";
import deleteSupplierService from "../services/suppliers/deleteSupplier.service";
import listSpecificSupplierService from "../services/suppliers/listSpecificSupplier.service";
import listSuppliersService from "../services/suppliers/listSuppliers.service";
import updateSupplierService from "../services/suppliers/updateSupplier.service";

export const createSupplierController = async (req: Request, res: Response) => {
  const { cnpj, email, name, phone }: ISupplierRequest = req.body;

  const newSupplier = await createSupplierService({ cnpj, email, name, phone });

  return res.status(201).json(newSupplier);
};

export const listSuppliersController = async (req: Request, res: Response) => {
  const suppliers = await listSuppliersService();

  return res.status(200).json(suppliers);
};

export const listSpecificSupplierController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const supplier = await listSpecificSupplierService(id);

  return res.status(200).json(supplier);
};

export const updatedSupplierController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const supplierData: ISupplierUpdateRequest = req.body;

  const updateSupplier = await updateSupplierService(id, supplierData);

  return res.status(200).json(updateSupplier);
};

export const deleteSupplierController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleteSupplier = await deleteSupplierService(id);

  return res.status(204).json(deleteSupplier);
};
