import "dotenv/config";
import express from "express";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Document } from "@langchain/core/documents";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatGroq } from "@langchain/groq";

import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Validate required environment variables
const requiredEnvVars = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_DATABASE_URL",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
  "FIREBASE_MEASUREMENT_ID",
  "HUGGINGFACEHUB_API_KEY",
  "GROQ_API_KEY",
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`Warning: Missing environment variable ${key}`);
  }
});

// Firebase config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse JSON requests

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Fetch Firestore data
async function fetchDataFromFirestore() {
  try {
    console.log("Fetching Firestore data...");
    const querySnapshot = await getDocs(collection(db, "fidoQA"));

    if (querySnapshot.empty) {
      console.warn("Firestore collection 'fidoQA' is empty.");
      return [];
    }

    return querySnapshot.docs.map(
      (doc) =>
        new Document({
          pageContent: doc.data().answer,
          metadata: { question: doc.data().question },
          id: doc.id,
        })
    );
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
    return [];
  }
}

// Initialize AI models
const embeddings = new HuggingFaceTransformersEmbeddings({
  modelName: "sentence-transformers/all-MiniLM-L6-v2",
  apiKey: process.env.HUGGINGFACEHUB_API_KEY,
});

let retriever = null;

async function setupVectorStore() {
  try {
    console.log("Setting up vector store...");
    const firestoreDocs = await fetchDataFromFirestore();

    if (firestoreDocs.length === 0) {
      console.warn("No documents found in Firestore. Exiting...");
      process.exit(1);
    }

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(firestoreDocs);
    const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);
    retriever = vectorStore.asRetriever();

    console.log("Vector store setup complete.");
  } catch (error) {
    console.error("Error setting up vector store:", error);
    process.exit(1);
  }
}

const llm = new ChatGroq({
  groqApiKey: process.env.GROQ_API_KEY,
  modelName: "Llama3-8b-8192",
  temperature: 0,
});

// Function to retrieve answers
async function askFido(question) {
  try {
    if (!retriever) {
      console.error("Retriever is not initialized yet.");
      return "Sorry, the system is not ready. Please try again later.";
    }

    const retrievedDocs = await retriever.invoke(question, { k: 3 });

    if (retrievedDocs.length === 0) {
      return "I couldn't find an answer. Try checking Fido’s website.";
    }

    const context = retrievedDocs
      .map((doc) => `Q: ${doc.metadata.question}\nA: ${doc.pageContent}`)
      .join("\n\n");

    const prompt = `You are an AI assistant answering questions about Fido services.
    
    Context:
    ${context}
    
    Answer the question: "${question}"`;

    const response = await llm.invoke(prompt);
    return response.content;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Sorry, something went wrong.";
  }
}

// Express route to handle queries
app.post("/ask", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  const response = await askFido(question);
  res.json({ answer: response });
});

// Start server only if vector store is set up successfully
setupVectorStore().then(() => {
  if (!retriever) {
    console.error("Retriever not initialized. Exiting...");
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
