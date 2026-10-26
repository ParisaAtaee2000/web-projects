# Domain model draft

## Product
- id
- slug
- title
- description
- productType: printed_product | printer | accessory | material | digital_file
- categoryId
- price
- currency (IRR/Toman display policy to be finalized)
- images
- makerId
- availability
- attributes (typed by category)
- rating (demo-only until real reviews exist)

## Maker
- id
- displayName
- avatar
- specialty
- productCount
- rating (demo-only)
- location (optional)
- acceptsCustomRequests

## Category
- id
- title
- slug
- productTypes
- image
- description

## CustomPrintRequest
- id
- title
- description
- referenceFiles
- material
- color
- dimensions
- quantity
- status

## Important distinction
A digital file is delivered digitally; a printed product, printer, accessory or material is a physical item. The data model and checkout flow must preserve this distinction.
