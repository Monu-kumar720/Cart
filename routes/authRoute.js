import express from "express";
import {registerController,loginController,testController,forgotPasswordController, updateProfileController, orderStatusController, getAllOrdersController, getOrdersController} from "../controllers/authController.js"
import { requireSignIn,isAdmin } from "../middlewares/authMiddleware.js";
//router obj

const router=express.Router()

//routing
//register||method post

router.post('/register',registerController)

//login||method post
router.post('/login',loginController)

//forgot password||method post
router.post('/forgot-password',forgotPasswordController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected Admin route auth
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router