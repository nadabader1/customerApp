import { Request, Response } from "express";
import { Customer } from "../db/entity/Customer.js";
import { AppError } from "../errors/AppError.js";

const customers = [
    {
        id: 1,
        name: "noor bader",
        mobilePhone: "1234567890",
        balance: 100.50
    },
    {
        id: 2,
        name: "anwer bader",
        mobilePhone: "0987654321",
        balance: 150.75
    },
];

const filterArrayController = (req: Request, res: Response) => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const filteredArray = arr.filter(item => item % 2 === 0);
    res.status(200).json({
        message: "Success",
        success: true,
        data: filteredArray
    });
};

const getAllCustomers = async (req: Request, res: Response) => {
    const customers = await Customer.find();
    res.json({
        message: "Getting all customers successfully",
        status: true,
        customers: customers
    });
};

const createCustomer = async (customerFromPostman: Customer) => {
    const existingCustomer = await Customer.findOne({
        where: { mobilePhone: customerFromPostman.mobilePhone }
    });

    if (existingCustomer) {
        throw new AppError("Customer already exists with this mobile phone", 409, true);
    }

    const newCustomer = Customer.create(customerFromPostman);
    return newCustomer.save();
};

const deleteCustomer = (req: Request, res: Response) => {
    const customerId = Number(req.params.id);
    const customerIndex = customers.findIndex(customer => customer.id === customerId);
    if (customerIndex === -1) {
        res.status(404).json({
            message: "Customer not found"
        });
    } else {
        customers.splice(customerIndex, 1);
        res.status(200).json({
            message: "Deleted successfully",
            customers: customers
        });
    }
};

const getSingleCustomer = async (customerId: any) => {
    const customer = await Customer.findOne({ where: { id: customerId } });
    if (!customer) {
        throw new AppError("Customer not found", 404, true);
    }
    return customer;
};

export { filterArrayController, getAllCustomers, createCustomer, deleteCustomer, getSingleCustomer };