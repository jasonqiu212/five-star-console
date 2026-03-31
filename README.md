# Five Star Console

Admin console for [Five Star Auto Leather](https://www.fivestarautoleather.com)

## Tech Stack

- **[React](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Ant Design](https://ant.design/)**
- **[Appwrite](https://appwrite.io/)**

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20.19.5 as specified in `.nvmrc`)
- **pnpm** (package manager)

### Using nvm (recommended)

If you use [nvm](https://github.com/nvm-sh/nvm), the correct Node.js version will be automatically selected:

```bash
nvm use
```

### Installing pnpm

To install pnpm globally:

```bash
npm install -g pnpm
```

## Set Up

1. Clone the repository:

```bash
git clone https://github.com/jasonqiu212/five-star-console.git
cd five-star-console
```

2. Install dependencies:

```bash
pnpm install
```

3. Inside `apps/frontend`, copy and paste `.env.example` and rename it to `.env`. Replace the required environment variables with your own.

4. Start the development server:

```bash
pnpm dev:frontend
```

The site will be available at `http://localhost:8080`
