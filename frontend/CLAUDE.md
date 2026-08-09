# Admin Panel & Project Instructions

## Tech Stack
- Backend: Go (Echo framework)
- Database: PostgreSQL
- Frontend: TypeScript, Material-UI (MUI), Responsive design

## Directory Structure
- All admin panel code must be written exclusively inside: `frontend/AdminPanel`

## Design & UI Rules
- **Consistency:** The admin panel must match the main website's design language, colors, fonts, and header styling. Use MUI components styled to reflect the existing design palette.
- **Responsiveness:** Layouts must adapt seamlessly to desktop, tablet, and mobile screens.

## Admin Panel Features & Architecture
1. **Layout & Navigation:**
   - Must include a top navigation bar (navbar).
   - Navigation links/buttons for switching between **Users** and **Products** management sections.
2. **Users Management:**
   - On load, fetch and display users in a table format (using MUI Table/DataGrid).
   - Each row must include **Edit** and **Delete** actions/buttons.
3. **Products Management:**
   - Separate section/page mirroring the user management pattern for products (table view + CRUD actions).

## Development Workflow (Step-by-Step execution required)
- **Step 1:** Create the base layout structure (`frontend/AdminPanel` layout + Navbar) matching the main site design.
- **Step 2:** Implement the Users view with the MUI table and API integration (Echo/PostgreSQL).
- **Step 3:** Implement Edit and Delete functionality/forms for users.
- **Step 4:** Implement the equivalent structure and CRUD for the Products section.
- **Testing & Error Handling:** Automatically review code for errors, handle API/database edge cases, and self-correct issues during generation.