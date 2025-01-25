# 📄 AskMyPDF – AI-powered PDF Chat Assistant  

**AskMyPDF** is a next-generation **AI-powered document assistant** that enables users to upload PDFs, interact with them through **natural language queries**, and receive AI-generated responses. Designed for professionals, researchers, and students, it transforms static documents into **interactive conversations** powered by **Gemini's API**.  

This project features **seamless PDF integration**, real-time AI-driven responses, **secure authentication**, and a **subscription model** for premium users. The **payment system** is powered by **Stripe**, and all transactions are handled securely using **webhooks**.  

---

## 🚀 Live Demo  

🔗 **[https://ask-my-pdf.neilmascarenhas.com/](#)**


## 🚀 Key Features  

- ✅ **Upload & Chat with PDFs** – Upload PDFs and ask AI-powered questions about their content.  
- ✅ **AI-powered Q&A** – Receive intelligent answers based on PDF content using **Gemini API**.  
- ✅ **Real-time Chat Experience** – Engage in a conversational flow with documents.  
- ✅ **Subscription & Monetization** – Premium users unlock additional features via **Stripe payments**.  
- ✅ **Secure Authentication** – Integrated **Clerk authentication** for a safe user experience.  
- ✅ **Fast & Scalable Search** – Optimized document search with **Pinecone vector database**.  
- ✅ **Cloud-based & Serverless** – Hosted on **Neon Database Serverless** for scalability.  

---

## 🛠️ Technologies & Frameworks  

### **Frontend:**  
- **Next.js** – React-based framework for server-side rendering and static generation.  
- **React** – UI framework for building interactive components.  
- **TypeScript** – Type-safe development for maintainable and scalable code.  
- **Tailwind CSS** – Utility-first CSS framework for responsive UI design.  

### **Backend & Database:**  
- **Drizzle ORM** – Lightweight TypeScript ORM for database management.  
- **PostgreSQL** – Relational database for structured data storage.  
- **Neon Database Serverless** – Cloud-based, scalable database hosting.  
- **AWS SDK** – Cloud services integration for file storage.  
- **Drizzle-kit** – Schema management and migrations for Drizzle ORM.  

### **AI & APIs:**  
- **Gemini API** – AI-powered responses based on chat context.  
- **OpenAI Edge** – Optimized for AI inference on the edge.  
- **Pinecone** – Vector database for fast and scalable search queries.  

### **Authentication & Payments:**  
- **Clerk** – Secure authentication and user management.  
- **Stripe** – Subscription-based payments with webhook processing.  

### **Additional Libraries & Utilities:**  
- **Axios** – HTTP client for API calls.  
- **Drizzle-orm/neon-http** – Optimized PostgreSQL queries over HTTP.  
- **@tanstack/react-query** – Efficient server-state management.  
- **@clerk/nextjs** – Seamless integration of Clerk authentication.  
- **clsx & tailwind-merge** – Utility functions for class name management.  

---

## 🎯 Use Cases  

- 🔹 **Students & Researchers** – Extract key insights from academic papers, journals, and textbooks.  
- 🔹 **Legal & Business Professionals** – Quickly search and analyze contracts, policies, and reports.  
- 🔹 **Writers & Content Creators** – Summarize and interact with large documents.  
- 🔹 **Developers & Engineers** – Extract technical details from documentation.  

---

 

---

## 📸 Screenshots  

(Add screenshots showcasing the application features)  

---

## 🏗️ Installation & Setup  

3️⃣ Required API Keys & Configuration
You will need API keys and credentials from the following services:

PostgreSQL (Drizzle ORM) – Connection URL for database operations.
Stripe – Secret keys for handling payments and webhooks.
Clerk – Authentication keys for user management.
Gemini API – Key for AI-powered PDF interaction.
Pinecone – API keys for vector search and semantic queries.
AWS SDK – For cloud-based services.
Neon Database Serverless – For cloud-based database.

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/neil2124/askmypdf.git
cd askmypdf
npm install

