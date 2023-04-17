# Househost ✨

Live at: [househost.vercel.app](https://househost.vercel.app)

## Frontend 🏠

This repository contains the frontend code for Househost, a web application for managing rental properties. The frontend was built with Vite and React and is deployed on Vercel.

## Backend 🔧

The backend for this project can be found at [github.com/galaxiaX/househost-back](https://github.com/galaxiaX/househost-back) . It was built with Node.js, Express, and MongoDB, and it stores images in AWS S3.

### Getting Started 💻

To get started with the project, follow these steps:

1.Clone the repository:

```bash
git clone https://github.com/galaxiaX/househost-front.git
```

2.Install dependencies:

```bash
npm install
```

3.Run the development server:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.

### Deployment 🚀

The project is automatically deployed on Vercel whenever changes are pushed to the main branch.
To manually deploy the project, run the following command:

```bash
npm run build
```

This will generate a production build in the dist directory. You can then deploy this directory to your preferred hosting platform.
