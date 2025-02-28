export const FIDO_COLORS = {
  primary: "#0066CC", // FIDO blue
  secondary: "#F5F5F5",
  accent: "#FF9900", // FIDO orange accent
  background: "#FFFFFF",
  text: "#333333",
};

export const SAMPLE_CHATS = [
  { id: "1", title: "What is FIDO?", date: "2023-05-15" },
  { id: "2", title: "FIDO vs Passwords", date: "2023-05-16" },
  { id: "3", title: "FIDO2 Implementation", date: "2023-05-18" },
  { id: "4", title: "WebAuthn Support", date: "2023-05-20" },
  { id: "5", title: "FIDO Security Keys", date: "2023-05-22" },
];

export const SAMPLE_MESSAGES = [
  {
    id: "1",
    role: "user",
    content: "What is FIDO authentication?",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "FIDO (Fast IDentity Online) authentication is a set of open standards for secure authentication. It enables passwordless authentication and multi-factor authentication in a way that's both more secure and easier to use than traditional passwords. FIDO standards use public key cryptography to provide strong authentication while protecting user privacy. The FIDO Alliance, which develops these standards, includes major technology companies like Google, Microsoft, and Apple.",
    timestamp: "10:31 AM",
  },
  {
    id: "3",
    role: "user",
    content: "What are the main benefits of using FIDO?",
    timestamp: "10:32 AM",
  },
  {
    id: "4",
    role: "assistant",
    content:
      "The main benefits of FIDO authentication include:\n\n1. Enhanced security: FIDO eliminates phishing risks and credential theft by using cryptographic keys instead of shared secrets.\n\n2. Improved user experience: Users can authenticate with simple gestures like fingerprint scans or facial recognition.\n\n3. Privacy protection: Biometric data stays on the user's device and is never shared with servers.\n\n4. Reduced costs: Organizations can decrease password reset requests and associated support costs.\n\n5. Cross-platform compatibility: FIDO works across devices, browsers, and operating systems.\n\n6. Regulatory compliance: Helps meet requirements for strong authentication in regulations like GDPR and PSD2.",
    timestamp: "10:33 AM",
  },
];