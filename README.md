# PixelShare

A modern, secure platform for sharing files, text snippets, and links with advanced features like URL shortening, expiration dates, password protection, and QR code generation.

## Features

- **URL Shortening**: Shorten long URLs with custom expiration, password protection, and QR code generation
- **Text Snippets**: Share code snippets with syntax highlighting for 20+ programming languages
- **File Upload**: Secure file uploads with download tracking and password protection
- **Password Protection**: Optional password protection for all shared content
- **Expiration Dates**: Set custom expiration times for shared content
- **QR Codes**: Automatically generate QR codes for shortened URLs
- **Analytics**: Track clicks, views, and downloads
- **Modern UI**: Built with Next.js, React, and TailwindCSS
- **Dark Mode**: Full dark mode support

## Tech Stack

- **Frontend**: Next.js 14, React 18, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: React with TypeScript
- **Code Highlighting**: react-syntax-highlighter
- **QR Generation**: qrcode library

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Leopixel1/PixelShare.git
cd PixelShare
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and update the following:
- `DATABASE_URL`: SQLite database path (default: `file:./dev.db`)
- `NEXTAUTH_SECRET`: Random secret for NextAuth (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Your app URL (default: `http://localhost:3000`)

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### URL Shortening

1. Navigate to the "URL Shortener" section
2. Paste your long URL
3. (Optional) Add a title, password, and expiration date
4. Click "Shorten URL"
5. Share the generated short URL and QR code

### Text Snippets

1. Navigate to the "Text Snippets" section
2. Paste your code or text
3. Select the programming language for syntax highlighting
4. (Optional) Add a title, password, and expiration date
5. Click "Create Snippet"
6. Share the generated URL

### File Upload

1. Navigate to the "File Upload" section
2. Select a file from your device
3. (Optional) Add a password and expiration date
4. Click "Upload File"
5. Share the generated URL

## API Endpoints

### URLs
- `POST /api/urls` - Create a shortened URL
- `GET /api/urls` - List recent URLs
- `POST /api/urls/[id]` - Access a shortened URL

### Text Snippets
- `POST /api/texts` - Create a text snippet
- `GET /api/texts` - List recent snippets
- `POST /api/texts/[id]` - Access a text snippet

### Files
- `POST /api/files` - Upload a file
- `GET /api/files` - List recent files
- `POST /api/files/[id]` - Access file info
- `GET /api/files/[id]` - Download file

### QR Codes
- `POST /api/qr` - Generate QR code for a URL

## Project Structure

```
PixelShare/
├── app/
│   ├── api/           # API routes
│   ├── url/           # URL viewer pages
│   ├── text/          # Text snippet viewer pages
│   ├── file/          # File viewer pages
│   ├── shorten/       # URL shortener page
│   ├── snippet/       # Text snippet creator page
│   ├── upload/        # File upload page
│   ├── layout.tsx     # Root layout
│   ├── page.tsx       # Home page
│   └── globals.css    # Global styles
├── components/        # Reusable components
├── lib/              # Utility functions
├── prisma/           # Database schema
└── uploads/          # Uploaded files storage
```

## Security Features

- Password hashing with bcrypt
- Optional password protection for all content
- File type validation
- Expiration date enforcement
- Secure file storage

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.