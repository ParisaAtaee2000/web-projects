# Architecture

## Product modules

### Storefront
- Home page
- Category discovery
- Featured and newest products
- Product detail pages (later)
- Responsive RTL navigation

### Catalog
- 3D-printed products
- 3D printers
- Printer parts and accessories
- Printing materials (filament/resin)
- Digital 3D files (STL/3MF)
- Product metadata, price, stock, images, maker

### Search and discovery
- Global search
- Category filtering
- Product type filtering
- Sorting and empty states

### Makers
- Maker profile cards
- Specialty and product count
- Public storefront (later)

### Custom print requests
- Describe the required object
- Add reference files/images (later)
- Choose quantity, material, color and dimensions
- Submit request (frontend prototype first)

### Commerce (later)
- Cart and checkout
- Physical shipment vs digital delivery
- Orders and payment integration

## Homepage composition
1. Dark header with temporary wordmark, nav, search, account and cart
2. Dark hero with 3D printer / printed objects, clear value proposition and two CTAs
3. Distinct entry points for printed products, printers, accessories, materials and 3D files
4. Featured product grid on light background
5. Maker spotlight
6. Custom print request banner
7. 3D model files section
8. Seller recruitment banner
9. Footer

## Architecture rules
- Persian RTL is the default.
- Components must be real HTML/UI, not a flat image background.
- Product type must be explicit in data.
- Digital files must be distinguishable from shippable physical products.
- Reusable UI primitives belong in `components/ui`; feature-specific sections stay in feature folders.
- Do not add unrelated handmade categories.
