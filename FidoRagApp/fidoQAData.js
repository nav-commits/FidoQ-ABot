import { writeBatch, collection, doc } from "firebase/firestore";
import { db } from "./fidorag"; // Adjust the import path as necessary

export const fidoQAData = [
  { 
    question: "How do I check my Fido bill?", 
    answer: "You can check your bill in the Fido app under 'Billing' or by logging into My Account on the Fido website.", 
    category: "Billing", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "What is Fido Roam?", 
    answer: "Fido Roam lets you use your plan in the US and internationally for a daily fee. The fee is automatically charged when you use your phone abroad.", 
    category: "Roaming", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "How can I cancel my Fido plan?", 
    answer: "You need to contact Fido customer service at 1-888-481-3436 or visit a Fido store. Early cancellation fees may apply if you're under contract.", 
    category: "Account Management", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "How do I activate a new Fido SIM card?", 
    answer: "You can activate your Fido SIM card online through My Account, by calling customer service, or by visiting a Fido store.", 
    category: "SIM & Activation", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "How do I check my Fido data usage?", 
    answer: "You can check your data usage in the Fido app under 'Usage', by logging into My Account, or by dialing *333# from your Fido phone.", 
    category: "Data & Usage", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "Does Fido offer 5G service?", 
    answer: "Yes, Fido now offers 5G in select areas. You need a compatible device and plan to access it.", 
    category: "Network & Coverage", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "What are the Fido payment options?", 
    answer: "You can pay your Fido bill using a credit card, debit card, online banking, pre-authorized payments, Apple Pay, or Google Pay.", 
    category: "Billing", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "How do I contact Fido customer service?", 
    answer: "You can call 1-888-481-3436, use live chat on Fido's website, visit a Fido store, or reach out via social media.", 
    category: "Support", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "Can I upgrade my Fido phone early?", 
    answer: "Yes, you can upgrade early by paying off your current device balance through My Account or by visiting a Fido store.", 
    category: "Devices & Upgrades", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "How do I reset my Fido voicemail password?", 
    answer: "You can reset your voicemail password in the Fido app under 'Voicemail' or by calling *611 and following the prompts.", 
    category: "Voicemail", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "Does Fido have unlimited data plans?", 
    answer: "Fido offers plans with 'Data Overage Protection' that slow down speeds after a data limit is reached. It does not offer unlimited high-speed data.", 
    category: "Plans & Features", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "Can I suspend my Fido service temporarily?", 
    answer: "Yes, you can suspend your service for up to 6 months for a reduced fee if you're eligible. Contact Fido customer service for details.", 
    category: "Account Management", 
    timestamp: new Date().toISOString() 
  },
  { 
    question: "How do I transfer my number to Fido?", 
    answer: "You can transfer your number when signing up. Keep your old SIM active until the transfer is complete, and ensure your account with the previous provider is in good standing.", 
    category: "Number Porting", 
    timestamp: new Date().toISOString() 
  }
];

export async function insertMultipleDocs() {
  try {
    const batch = writeBatch(db);
    const fidoQACollection = collection(db, "fidoQA"); // Reference to Firestore collection

    fidoQAData.forEach((item) => {
      const newDocRef = doc(fidoQACollection); // Auto-generate a unique document ID
      batch.set(newDocRef, {
        question: item.question,
        answer: item.answer, 
        category: item.category,
        timestamp: item.timestamp,
      });
    });

    await batch.commit();
    console.log("✅ All documents inserted successfully!");
  } catch (error) {
    console.error("❌ Error inserting documents:", error);
  }
}
