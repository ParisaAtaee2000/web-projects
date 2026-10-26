# 3D Marketplace

A Persian RTL marketplace dedicated exclusively to the 3D-printing ecosystem.

## Product scope
- Products manufactured with 3D printers
- 3D printers
- Printer parts and accessories
- Printing materials such as filament and resin
- 3D model files (STL/3MF)
- Custom printing requests

The visual reference is the user-approved dark navy / violet / light marketplace homepage screenshot. Implement it as real responsive UI components, never as a screenshot background.

## Planned stack
Confirm against the existing repository conventions before adding dependencies. Initial direction: React + TypeScript + Vite + Tailwind CSS.

## Structure
- `src/app`: application entry and routing
- `src/components/layout`: header, navigation, footer
- `src/components/ui`: reusable primitives
- `src/features/home`: homepage sections
- `src/features/catalog`: categories, product grid, product cards, search and filters
- `src/features/makers`: maker profiles and featured makers
- `src/features/custom-requests`: custom print request flow
- `src/data`: typed demo data
- `src/types`: shared domain types
- `src/styles`: design tokens and global styles
- `docs`: architecture and component plan

This is a new project folder inside the existing `web-projects` repository. Do not use Lovable as the implementation environment.
