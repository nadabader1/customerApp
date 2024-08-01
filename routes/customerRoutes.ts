import { Router, Request, Response, NextFunction } from "express";
import { filterArrayController, getAllCustomers, createCustomer, deleteCustomer, getSingleCustomer } from "../controller/CustomerController.js";
import { logRequestMiddleware } from "../middleware/printInfoMiddleware.js";

const router = Router();

router.get("/filter-arr", filterArrayController);

router.get("/", logRequestMiddleware, getAllCustomers);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.name || !req.body.mobilePhone || req.body.balance === undefined) {
            return res.status(400).json({
                message: "Required fields are missing!",
                success: false
            });
        }

        const customer = await createCustomer(req.body);

        res.json({
            message: "Customer created successfully",
            customer: customer
        });
    } catch (error) {
        console.error("Error: " + error);
        next(error);
    }
});

router.delete("/:id", deleteCustomer);

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customerId = Number(req.params.id);
        const customer = await getSingleCustomer(customerId);

        res.json({
            message: "Customer retrieved successfully",
            customer: customer
        });
    } catch (error) {
        console.error("Error: " + error);
        next(error);
    }
});

export default router;