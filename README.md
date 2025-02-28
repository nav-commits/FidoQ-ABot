
![Screenshot 2025-02-28 at 2 18 43 PM](https://github.com/user-attachments/assets/2248c05c-9c83-4ab1-997f-b5a279bc08d9)



# FIDO Q&A Chatbot

This project is a FIDO Q&A chatbot built with Next.js for the frontend, an API route for chat handling, and an Express server using LangChain with an LLM and LangSmith tracing. It leverages Firestore as a data source and FAISS for retrieval-augmented generation (RAG).

## Features

- **Frontend:** Next.js-based chat UI with a simple messaging interface.
- **Backend API:** Next.js API route (`/api/chat`) for handling chat requests.
- **LLM & RAG:** Express server with LangChain, FAISS, and Hugging Face transformers for intelligent responses.
- **Firestore Integration:** Fetches FIDO-related Q&A from Firestore.
- **Tracing with LangSmith:** Monitors and optimizes query performance.

---

## Tech Stack

- **Frontend:** Next.js, TypeScript, React
- **Backend:** Express.js, Firestore, LangChain
- **Vector Store:** FAISS
- **LLM:** Groq's `Llama3-8b-8192`
- **Embeddings:** Hugging Face (`sentence-transformers/all-MiniLM-L6-v2`)
- **Environment Variables:** LangSmith, Hugging Face API, Firebase config

---

## Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nav-commits/fido-chatbot.git
cd fido-chatbot
