
  # Website creation from prompt

  This is a code bundle for Website creation from prompt. The original project is available at https://www.figma.com/design/Exb9YDcyR1gAxAmDvCtcpw/Website-creation-from-prompt.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Admin content panel

  The protected admin panel is available at `/admin/login`.

  Required environment variables:

  - `DATABASE_URL`: PostgreSQL connection string used by Prisma.
  - `ADMIN_SESSION_SECRET`: long random string used to sign admin sessions.
  - `ADMIN_EMAIL`: email for the seeded admin user.
  - `ADMIN_PASSWORD`: password for the seeded admin user.

  Initial setup:

  ```bash
  npm install
  npm run prisma:generate
  npm run prisma:migrate
  npm run seed:content
  npm run seed:admin
  npm run dev
  ```

  Public pages use built-in fallback content when `DATABASE_URL` is not configured. Saving drafts and publishing require PostgreSQL.
  
