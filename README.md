# 📋 RFQ Automation

> **Streamline your Request for Quote (RFQ) workflow with intelligent automation**

A modern, full-stack web application built to automate and simplify the Request for Quote (RFQ) process. This project combines cutting-edge technologies to provide a seamless experience for managing quotes, from creation to fulfillment.

---

## ✨ Features

- 🔐 **Secure Authentication** - NextAuth.js powered authentication with Prisma adapter
- 💾 **Database Management** - Prisma ORM for robust data handling
- 🎨 **Modern UI** - Built with React 19 and Tailwind CSS for responsive design
- ⚡ **Next.js Framework** - Latest Next.js (v16.3.6) for server-side rendering and API routes
- 🔒 **Password Security** - bcryptjs for secure password hashing
- 📱 **Component Library** - shadcn UI components for consistent design patterns
- 📝 **Markdown Support** - React Markdown for rich text content
- 🚀 **Production Ready** - Optimized build and deployment configuration

---

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.8 - UI library
- **Next.js** 16.3.6 - Full-stack framework
- **Tailwind CSS** 4 - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless backend
- **Prisma** 6.4.1 - ORM and database toolkit
- **NextAuth.js** 5.0.0-beta - Authentication

### Database
- **Prisma** - Database abstraction layer

### Developer Tools
- **TypeScript** 5 - Type safety
- **ESLint** - Code linting
- **PostCSS** - CSS processing

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn
- A database (PostgreSQL, MySQL, SQLite, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anuragkaushik00/RFQ_Automation-.git
   cd RFQ_Automation-/rfq-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your database URL and other configurations
   ```

4. **Setup the database**
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your application.

---

## 📝 Available Scripts

```bash
# Development
npm run dev           # Start development server with hot reload

# Production
npm run build         # Build optimized production bundle
npm start             # Start production server

# Database
npm run db:push       # Push database schema changes
npm run db:seed       # Seed database with initial data
npm run db:studio     # Open Prisma Studio UI

# Code Quality
npm run lint          # Run ESLint to check code quality
```

---

## 📁 Project Structure

```
rfq-app/
├── app/               # Next.js app directory (routes & pages)
├── components/        # Reusable React components
├── lib/              # Utility functions and helpers
├── prisma/           # Database schema and migrations
│   └── schema.prisma # Database schema definition
├── public/           # Static assets
├── auth.ts           # NextAuth configuration
├── middleware.ts     # Next.js middleware
├── package.json      # Dependencies and scripts
└── tsconfig.json     # TypeScript configuration
```

---

## 🔐 Authentication

This project uses **NextAuth.js** with Prisma adapter for secure authentication:

- User registration and login
- Password hashing with bcryptjs
- Session management
- Protected API routes via middleware

Configuration can be found in `auth.ts` and `auth.config.ts`.

---

## 💾 Database

Prisma ORM is used for type-safe database access:

```bash
# View database in Prisma Studio
npm run db:studio

# Push schema changes to database
npm run db:push

# Generate Prisma Client after schema changes
npx prisma generate
```

Update your schema in `prisma/schema.prisma` and push changes to sync with your database.

---

## 🎨 UI Components

Components are built using **shadcn/ui** and can be found in the `components/` directory. The project uses Tailwind CSS for styling with class variance authority for component variants.

---

## 📦 Building for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

The build output will be optimized for performance and ready to deploy.

---

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy a Next.js app is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel auto-detects Next.js and configures the build
4. Your app is live!

[Vercel Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)

### Other Platforms
- **Docker** - Containerize and deploy to any platform
- **Traditional Servers** - Use `npm start` after building
- **AWS, Azure, GCP** - Each has Next.js deployment guides

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Comprehensive Next.js guide
- [Prisma Documentation](https://www.prisma.io/docs/) - Database toolkit docs
- [NextAuth.js Documentation](https://next-auth.js.org/) - Authentication guide
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Styling reference
- [React Documentation](https://react.dev) - React fundamentals

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Anurag Kaushik**
- GitHub: [@anuragkaushik00](https://github.com/anuragkaushik00)

---

## 🎯 Roadmap

- [ ] Advanced RFQ filtering and search
- [ ] Real-time notifications
- [ ] Export to PDF functionality
- [ ] Multi-language support
- [ ] Enhanced analytics dashboard
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Mobile app version

---

## 💡 Tips

- Use `npm run db:studio` to visually manage your database
- Check TypeScript errors with your IDE's built-in linter
- The project uses ESLint for consistent code style
- All API routes should handle errors gracefully

---

## 🆘 Support

For issues and questions, please [open an issue](https://github.com/anuragkaushik00/RFQ_Automation-/issues) on GitHub.

---

**Built with ❤️ for streamlined RFQ automation**
