# 📚 EBookHub (formerly Learnora)

EBookHub is a highly optimized, modern digital learning platform built for selling premium e-books and digital courses. Designed with a sleek SaaS aesthetic, it features a seamless direct-to-checkout flow, Razorpay payment integration, and instant digital file delivery.

---

## 🚀 Key Features

- **Blazing Fast Performance:** Built with **Next.js 14 (App Router)** for instant static page generation (SSG) and lightning-fast load times.
- **Direct-to-Checkout Flow:** Frictionless buying experience. No cart. No login required. Users click "Buy Now" and are taken straight to payment.
- **Secure Payments:** Fully integrated with **Razorpay**. Dynamic pricing calculation happens securely on the backend.
- **Instant Digital Delivery:** 
  - Individual E-books: Instant PDF download button upon payment success.
  - The Ultimate Bundle: 1-click automated background ZIP generation of all 24 PDFs using `jszip`.
- **High-Converting UI/UX:** Styled with **Tailwind CSS** and animated with **Framer Motion** for a premium, trustworthy look (light theme, modern shadows, scroll reveals).
- **Zero-Database Architecture:** Course data is cleanly managed via a local `courses.json` database, making it 100% free to host on platforms like Vercel with no database scaling costs.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (React, App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Payments:** [Razorpay Node SDK](https://razorpay.com/docs/api/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Client-Side Zipping:** JSZip & FileSaver.js

---

## 💻 Local Development Setup

To run this project locally on your machine:

**1. Clone the repository**
\`\`\`bash
git clone https://github.com/your-username/ebookhub.git
cd ebookhub
\`\`\`

**2. Install dependencies**
\`\`\`bash
npm install
\`\`\`

**3. Setup Environment Variables**
Create a \`.env.local\` file in the root directory and add your Razorpay keys (Available in Razorpay Dashboard -> Settings -> API Keys):
\`\`\`env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your_key_here
RAZORPAY_KEY_SECRET=your_secret_here
AUTOMATION_WEBHOOK_URL=optional_pabbly_make_webhook_url
\`\`\`

**4. Run the development server**
\`\`\`bash
npm run dev
\`\`\`
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure & Content Management

The platform is designed to be easily manageable without needing a complex CMS:

- **Adding/Editing Courses:** Edit the \`src/data/courses.json\` file. This acts as the central database. Prices, titles, descriptions, and PDF mapping are all controlled here.
- **Uploading PDFs:** Place your actual PDF files into the \`public/pdfs/\` directory. Ensure the filenames match the \`pdfUrl\` parameter specified in \`courses.json\`.
- **Thumbnails:** Place course images into \`public/course-thumbnails/\`.

*Note: Because this app relies on static files (SSG), you must run \`npm run build\` or Redeploy on Vercel whenever you add new PDFs or change prices in \`courses.json\`.*

---

## 🛡️ Payment Security

This platform employs a highly secure checkout mechanism:
1. The frontend never dictates the price to the payment gateway. 
2. When a user checks out, the Next.js API Route (\`/api/create-order\`) reads the actual price from the local \`courses.json\` server-side.
3. Razorpay order is generated with this exact server-calculated amount to prevent tampering.

---

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/). 

1. Push your code to GitHub.
2. Import the repository in Vercel.
3. Add the required Environment Variables in Vercel Settings (Ensure \`NEXT_PUBLIC_RAZORPAY_KEY_ID\` is added).
4. Click Deploy.

---
*Developed & Designed for EBookHub.*
