# AION Desks

Landing page for two AION digital products with Stripe Checkout.

**Ownership:** Permanent product-commerce **satellite** outside the six-repo
platform set — [ADR-004](https://github.com/Ceoloo/aion-docs/blob/main/adr/ADR-004-aion-desks-repo-ownership.md)
(Accepted). No control-plane, canonical schema, or Execution Gateway logic here.

## Products

- Operator Desk (owners): draft-only Follow-Up plus Chief of Staff. Never auto-send. Template 47 USD. Template plus 45-min install 179 USD.
- Everyday Desk (consumers): calendar, inbox drafts, weekly brief. No CRM. Template 39 USD. Template plus install 149 USD.

Keys and Price IDs come from environment variables only. Never hardcode secrets.

## Local preview

Install dependencies with the package manager, copy the example env file to a local env file, then start the Next.js dev server.
Open http://localhost:3000
Without Stripe env vars the buy buttons still render; checkout errors until keys exist.

## Vercel environment variables

Add these in the Vercel project under Settings then Environment Variables. Redeploy after adding. Do not put keys in the repo.

- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_PRICE_OPERATOR_TEMPLATE
- STRIPE_PRICE_OPERATOR_INSTALL
- STRIPE_PRICE_EVERYDAY_TEMPLATE
- STRIPE_PRICE_EVERYDAY_INSTALL
- STRIPE_WEBHOOK_SECRET

## Create four one-time Stripe Prices

In the Stripe Dashboard product catalog, add products as one-time (not recurring). Copy each Price ID into Vercel.

1. Operator Desk Template: 47.00 USD one time
2. Operator Desk Template plus 45-min install: 179.00 USD one time
3. Everyday Desk Template: 39.00 USD one time
4. Everyday Desk Template plus install: 149.00 USD one time

## Webhook

Register an endpoint at /api/webhooks/stripe for checkout.session.completed. Set STRIPE_WEBHOOK_SECRET to the endpoint signing secret.

## Boundaries

This site does not send email for you. Checkout Sessions omit payment_method_types so Stripe uses Dashboard-enabled methods.
