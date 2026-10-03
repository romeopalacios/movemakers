# Move Makers website template

A five-page static website template built for VS Code / GitHub Pages.

## Pages
- `index.html` - conversion-focused homepage with instant quote card
- `solutions.html` - local, interstate, storage and specialty solutions
- `partners.html` - BDC difference and partner network
- `quote.html` - multi-step quote form, inventory builder, rate guide and FAQ
- `contact.html` - contact details, booking placeholder and inquiry form

## Brand
The main navigation logo is cropped from page 2 of the supplied Move Makers PDF (Concept 4 / Monumental Makers). Brand colors used throughout the template are Midnight Slate / Navy and Golden Bronze, with teal and coral conversion accents from the supplied brief.

## Before launch
1. Replace placeholder phone, email and office information.
2. Connect forms to a backend/webhook/CRM. Static GitHub Pages cannot securely store form submissions on its own.
3. Add Calendly or HubSpot embed code to the contact page.
4. Replace illustrative hourly pricing with client-approved pricing.
5. Have the client review legal/compliance wording around carrier/broker disclosures, estimates, cancellation terms, “guaranteed” pricing and partner vetting claims.
6. Replace placeholder graphics with approved project photography if desired.

## Form routing suggestion
Website form → secure webhook/serverless endpoint → CRM/Coda/HubSpot → coordinator review → PandaDoc/Adobe Sign template for the final quote/agreement.

## Local preview
Open `index.html` directly, or run a local server such as:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
