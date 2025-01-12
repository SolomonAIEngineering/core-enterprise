import { BusinessConfig as platform } from "@dub/platform-config";
import Stripe from "stripe";

export const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2022-11-15",
  appInfo: {
    name: platform.company,
    version: "0.1.0",
  },
});
