# Component inventory

## Layout
- \`AppShell\`
- \`Header\`: brand, global search, account/cart/favorites/messages actions
- \`Sidebar\`: primary navigation on desktop
- \`MobileMenu\`: compact navigation drawer on small screens
- \`SearchBar\`
- \`SiteFooter\` (planned)

## Navigation rules
- Desktop: the sidebar is the only primary page menu; the header contains global tools, not duplicate text navigation.
- Mobile: the sidebar is hidden, so the header exposes a hamburger button and drawer using the same \`SidebarMenu\` component and the same route definitions.
- Current route is marked in both the desktop sidebar and mobile drawer.
- The drawer closes when an item is selected, the backdrop is tapped, Escape is pressed, or the viewport returns to desktop width.

## Homepage
- \`HomePage\`
- \`HeroSection\`
- \`HeroVisual\`
- \`MarketplaceEntryCards\`
- \`CategoryRail\`
- \`FeaturedProducts\`
- \`ProductCard\`
- \`MakerSpotlight\`
- \`CustomRequestBanner\`
- \`ModelFilesSection\`
- \`ModelFileCard\`
- \`SellerRecruitmentBanner\`

## Catalog interactions
- \`ProductSearch\`
- \`CategoryFilter\`
- \`ProductTypeBadge\`
- \`PriceLabel\`
- \`FavoriteButton\`
- \`AddToCartButton\`
- \`CartIndicator\`
- \`EmptyState\`

## Custom request
- \`CustomRequestForm\`
- \`RequestTypeSelector\`
- \`ReferenceUpload\`
- \`MaterialSelector\`

## Shared UI
- \`Button\`, \`IconButton\`, \`Badge\`, \`Input\`, \`Select\`, \`Dialog\`, \`Drawer\`, \`Toast\`

## Component conventions
- One component per clear responsibility.
- Keep data and display components separate.
- Use semantic HTML and accessible labels.
- Support keyboard navigation and visible focus states.
- Keep all Persian UI RTL; isolate Latin codes such as STL, PLA, PETG and 3MF with appropriate direction handling.
