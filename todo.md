# ChefDollsCakeShelf TODO

## Completed
- [x] Hero section with split layout and animations
- [x] About section with baker story
- [x] Gallery section with category tabs
- [x] Why Choose Us section
- [x] Testimonials section
- [x] Order Process section
- [x] Build Your Cake interactive tool
- [x] Simulated Instagram section
- [x] Contact / Order form with WhatsApp integration
- [x] Footer with social links
- [x] Loading screen animation
- [x] Marquee banner
- [x] WhatsApp floating button
- [x] Mobile-first responsive design
- [x] Upgrade project to full-stack (web-db-user)
- [x] Create Instagram backend router (instagramRouter.ts) with caching

## In Progress
- [x] Add placeholder env vars for Instagram credentials (INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID)
- [x] Update InstagramSection UI to use tRPC feed query with live/fallback mode
- [x] Graceful fallback: show simulated posts when credentials not set
- [x] Add clear code comments explaining how to activate the live feed
- [x] Write vitest for Instagram router

## Multi-Page Conversion + New Sections
- [x] Convert single-page site to multi-page: Home, About, Menu/Gallery, Order, Contact
- [x] Create /about page (About section content)
- [x] Create /menu page (Gallery/Product Showcase)
- [x] Create /order page (Order Process + Build Your Cake + Order Lead Time + Order Online steps)
- [x] Create /contact page (Contact form + Instagram section)
- [x] Update App.tsx with new routes
- [x] Update Navbar with multi-page navigation links
- [x] Update Footer links to point to new pages
- [x] Add Order Lead Time section (custom cakes 5-7 days, cupcakes 48hr)
- [x] Add Order Online section (4-step ordering process)
- [x] Update Home page to be a landing page with CTAs pointing to inner pages
- [x] Ensure smooth page transitions between pages (scroll-to-top on route change)

## Brand & Content Updates (Apr 2026)
- [x] Fix brand name: ChefDollsCakeShop → ChefDollsCakeShelf (Navbar, Footer, meta tags, all references)
- [x] Remove Testimonials section from About page
- [x] Remove "Why We're Different" / WhyChooseUs section from Home page
- [x] Reorder Order page: OrderOnline steps first → BuildYourCake → OrderLeadTime last
- [x] Compact OrderOnline 4-step layout (2x2 grid, smaller cards, inline CTA row)

## Real Testimonials, Logo & Layout Updates (Apr 2026)
- [ ] Upload logo.jpeg to CDN and replace placeholder logo in Navbar, Footer, LoadingScreen
- [ ] Extract testimonials from 8 WhatsApp screenshots and add Testimonials section to Home page
- [ ] Compact OrderLeadTime section (remove whitespace, keep design)
- [ ] Move OrderLeadTime above BuildYourCake on Order page
- [ ] Redesign OrderOnline 4 steps as a single horizontal row (less vertical space)
