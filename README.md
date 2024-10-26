# Project Setup and Commands

Follow the steps below to set up and run the project.

## Steps

- **Install Dependencies**
  Command: `npm i`

  - Installs all dependencies listed in `package.json`.
  - Necessary for initializing the project and enabling functionality.

- **Start Development Server**
  Command: `npm run dev`

  - Launches the development server.
  - Typically configured in `package.json` under "scripts" to build and serve files.
  - Monitors changes and reloads automatically.

- **Open Docker Desktop**

  - If not installed. Download from chrome.
  - Ensure Docker Desktop is running to support any containerized services.

- **Start Supabase**
  Command: `npx supabase start`

  - Initializes the Supabase local development environment.

- **Check Supabase Status**
  Command: `npx supabase status`

  - Displays the current status of Supabase services.
    API URL: http://127.0.0.1:64341
    Studio URL: http://127.0.0.1:64343
  - You can open studio url to view local database gui

- **Reset Supabase Database**
  Command: `npx supabase db reset`
  - Resets the Supabase database to its initial state.
  - Useful during development to clear all data and start fresh.
  - I have added supabase migration files which will create buckets and necessary tables in local database
    http://127.0.0.1:64343/project/default/storage/buckets - list of tables .
    http://127.0.0.1:64343/project/default/editor - list of tables
