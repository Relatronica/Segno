/**
 * English translations for block knowledge content
 * This file contains translations for the most common blocks
 * More translations can be added gradually
 */

import type { KnowledgeTranslation } from './knowledgeTranslations';

// Translations for common block labels
export const BLOCK_KNOWLEDGE_EN: Record<string, Partial<KnowledgeTranslation>> = {
  'Dati Personali': {
    simpleExplanation: 'Any information that allows identifying a person (name, email, but also an ID code or location). Handle with care.',
    question: 'Do you have a valid legal basis for collecting this data? Are users informed?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 6 & Art. 13-14',
      requirement: 'Legal basis (consent, contract, legal obligation, etc.) and information BEFORE collection is required',
      url: 'https://gdpr-info.eu/art-6-gdpr/'
    },
    bestPractice: 'Define clear legal basis. Complete and accessible information. Free, specific, informed, revocable consent.',
    risk: 'Collecting data without legal basis or information is unlawful. Fines up to 4% of turnover.',
    example: 'Collecting emails without information or consent violates GDPR. Clear information is required before collection.',
  },
  'Video / Immagini': {
    simpleExplanation: 'Collecting photos or videos (especially for facial recognition) is very invasive. Requires explicit consent or a very strong legal basis. In many public places, facial recognition is prohibited. Always ask yourself: is it really necessary? Isn\'t a normal camera that doesn\'t recognize people enough?',
    question: 'Do you have explicit consent to collect images/videos? For what purpose?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 9(2)',
      requirement: 'Biometric data (facial recognition) are special categories: explicit consent or exceptional legal basis required',
      url: 'https://gdpr-info.eu/art-9-gdpr/'
    },
    bestPractice: 'Request explicit consent for images/videos. Specify purpose (e.g. security, identification). Consider less invasive alternatives.',
    risk: 'Collecting images/videos without consent or valid legal basis is unlawful. Facial recognition may be prohibited in some contexts.',
    example: 'Cameras in public places for facial recognition: requires exceptional legal basis or is prohibited (AI Act Art. 5).',
  },
  'Dati Sanitari': {
    simpleExplanation: 'Health data (health, diseases, medical treatments) is very sensitive. Requires explicit consent OR a strong legal basis (like "medical necessity" for a hospital). Must always be protected with encryption. Ask yourself: do I really need this data or can I use less sensitive data?',
    question: 'Do you have a valid legal basis for health data? Is it really necessary to collect it?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 9(2)',
      requirement: 'Health data are special categories: explicit consent OR other basis (medical necessity, public interest, research) required',
      url: 'https://gdpr-info.eu/art-9-gdpr/'
    },
    bestPractice: 'Assess if health data is necessary. Consider "medical necessity" or "public interest" as alternatives to consent. Encryption mandatory.',
    risk: 'Processing health data without valid legal basis is unlawful. Severe fines (up to 4% turnover or €20M).',
    example: 'Fitness app that collects health data: requires explicit consent or demonstrate medical necessity/public interest.',
  },
  'Dati Finanziari': {
    simpleExplanation: 'Banking data, current accounts, transactions: very sensitive data that attracts criminals. Must ALWAYS be encrypted (like putting them in a safe). Requires a clear legal basis (e.g. banking contract) and access limited only to those who really need it.',
    question: 'Do you have a valid legal basis? Is the data protected with encryption?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 9(2) & Art. 32',
      requirement: 'Financial data requires special protection. Encryption mandatory for sensitive data',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Clear legal basis (e.g. contract, legal obligation). End-to-end encryption. Limited access. Regular audits.',
    risk: 'Exposed financial data can cause fraud, reputational damage, GDPR fines.',
    example: 'Unencrypted database with banking data: GDPR Art. 32 violation. Encryption obligation for financial data.',
  },
  'Dati di Localizzazione': {
    simpleExplanation: 'Is it really necessary to know the precise location? Often knowing the city is enough, not GPS coordinates. And you don\'t need to track continuously: only when necessary. Like when you call a taxi: you need to know where you are now, not where you were yesterday. More data = more risk.',
    question: 'Is it really necessary to track location? Can you use less precise data?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(c)',
      requirement: 'Minimization: collect only necessary data. Precise location may be excessive',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Use minimum necessary granularity (e.g. city instead of GPS coordinates). Request consent for continuous tracking.',
    risk: 'Continuous location tracking without necessity violates minimization principle. May be perceived as invasive.',
    example: 'App that tracks location every minute when only need to know if user is in city: violates minimization.',
  },
  'Dati Comportamentali': {
    simpleExplanation: 'When you track what users do (what they watch, what they buy, where they click), you must say so clearly. This is called "profiling". Users have the right to refuse and see what you know about them. Don\'t do it secretly. Like when someone follows you: you must know.',
    question: 'Do users know they are being profiled? Can they refuse?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14 & Art. 21',
      requirement: 'Profiling requires specific information. Right to object to profiling',
      url: 'https://gdpr-info.eu/art-21-gdpr/'
    },
    bestPractice: 'Clear information on profiling. Option to refuse. Avoid hidden profiling. Allow access to profiling data.',
    risk: 'Profiling without information or consent is unlawful. Users can object and request deletion.',
    example: 'Site that profiles users without informing them: violates GDPR. Specific information on profiling required.',
  },
  'Registrazioni Audio': {
    simpleExplanation: 'If you record conversations (calls, voice chats), you must say so BEFORE starting. Users must be able to refuse or choose "listen only without recording". And after transcription, delete the original audio. Like when a call center tells you "this call will be recorded": you know before speaking.',
    question: 'Do users know they are being recorded? Is there an alternative without recording?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Recordings require information BEFORE. Explicit consent for recordings',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Clear information before recording. Option "listen only without recording" when possible. Delete recordings after transcription.',
    risk: 'Hidden recordings or without consent are unlawful and may result in criminal penalties in some countries.',
    example: 'Call center that records without informing: violates GDPR. Information required before call.',
  },
  'LLM Core': {
    simpleExplanation: 'LLM models (like ChatGPT) are often on US servers. If you use them, user data travels to the USA, where laws allow their intelligence to access it. This is a problem for GDPR. Prefer models hosted in Europe or use end-to-end encryption. Like when shipping a package: choose a secure courier.',
    question: 'Have you verified where LLM models are hosted? Is data transferred extra-EU?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49',
      requirement: 'LLMs often hosted in USA: transfers require SCC + supplementary measures',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Verify LLM provider location. Prefer providers with EU data centers. Use end-to-end encryption. Consider self-hosted models.',
    risk: 'LLMs hosted in USA without supplementary measures violate Schrems II. Risk of transfer invalidation.',
    example: 'ChatGPT/OpenAI: data is transferred to USA. Requires SCC + encryption or consider EU alternatives.',
  },
  'Analisi Biometrica': {
    simpleExplanation: 'Recognizing people in real-time in public places (face, voice) is PROHIBITED by law, except exceptional cases (terrorism, missing persons search). It\'s very invasive and risks discrimination. Always ask yourself: is it really necessary? Isn\'t a badge or PIN enough? Like when entering an office: often showing ID is enough, automatic facial recognition isn\'t needed.',
    question: 'Do you have an exceptional legal basis for biometric recognition? Is it real-time?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 5(1)',
      requirement: 'Remote biometric recognition in real-time in public spaces is PROHIBITED except exceptions (terrorism, missing persons)',
      url: 'https://artificialintelligenceact.eu/'
    },
    bestPractice: 'Avoid real-time biometric recognition in public spaces. If necessary, limit to exceptional cases. Document legal basis.',
    risk: 'Real-time biometric recognition in public spaces is prohibited. Fines up to €35M or 7% turnover.',
    example: 'Cameras that identify people in real-time at station: PROHIBITED except exceptional cases (terrorism).',
  },
  'Motore RAG': {
    simpleExplanation: 'RAG (Retrieval-Augmented Generation) uses documents to give better answers to AI. But those documents have copyright and licenses. Verify BEFORE indexing that you have the right to use them. Don\'t take random documents from the internet: respect licenses. Like when using citations in an essay: you must say where they come from.',
    question: 'Have you verified that indexed documents respect copyright and licenses?',
    regulation: {
      name: 'Copyright',
      article: 'Various',
      requirement: 'Respect copyright and licenses of documents used for RAG',
      url: 'https://creativecommons.org/licenses/'
    },
    bestPractice: 'Verify document licenses before indexing. Respect attribution if required. Consider only documents with appropriate license.',
    risk: 'Using copyright-protected documents without license can cause legal problems.',
  },
  'Sistema di Raccomandazione': {
    simpleExplanation: 'Systems that suggest things to users (products, content, etc.) can have biases. They might always show the same things, creating "bubbles" (filter bubbles), or discriminate against some groups. Test the system with different people and see if it works the same for everyone. Let users see and modify their preferences.',
    question: 'Have you tested the system for bias? Can it create "filter bubbles" or discrimination?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'Recommendation systems must avoid bias and discrimination',
      url: 'https://artificialintelligenceact.eu/'
    },
    bestPractice: 'Test with diverse datasets. Monitor for bias. Allow users to see and modify preferences. Avoid filter bubbles.',
    risk: 'Recommendations with bias can perpetuate discrimination or exclude groups.',
    example: 'Recommendation system that only suggests men\'s products to male users: may exclude women.',
  },
  'Rilevamento Anomalie': {
    simpleExplanation: 'When the system detects something strange (anomaly) and sends an alert, you must verify it\'s true before acting. Too many false alarms make everyone ignore alerts, even real ones. A person must check before making critical decisions. Like a burglar alarm: if it always goes off for nothing, no one pays attention anymore.',
    question: 'Have you validated that alerts are accurate? Is there human review before actions?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 14',
      requirement: 'High-risk systems require human oversight and validation',
      url: 'https://artificialintelligenceact.eu/'
    },
    bestPractice: 'Validate alerts before action. Human review for critical decisions. Monitor false positive rate.',
    risk: 'Too many false alarms reduce trust and may cause real threats to be ignored.',
    example: 'Anomaly detection that alerts on every minor deviation: users will ignore all alerts.',
  },
  'Computer Vision': {
    simpleExplanation: 'Systems that analyze images or videos (like recognizing objects, faces, or text) can make mistakes. They might confuse things or miss important details. Test them with different images and verify results. Don\'t trust them blindly.',
    question: 'Have you tested the system with diverse images? What is the error rate?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'High-risk systems must be tested for accuracy and bias',
      url: 'https://artificialintelligenceact.eu/'
    },
    bestPractice: 'Test with diverse datasets. Monitor accuracy. Document limitations. Human review for critical decisions.',
    risk: 'Computer vision errors can cause discrimination or safety issues.',
    example: 'Facial recognition that fails on certain ethnicities: discriminatory and may violate AI Act.',
  },
  'Elaborazione Audio': {
    simpleExplanation: 'Systems that process audio (speech recognition, voice analysis) can make mistakes or be biased. They might not understand accents well or misinterpret words. Test with different voices and accents.',
    question: 'Have you tested the system with diverse voices and accents? What is the accuracy?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 10',
      requirement: 'High-risk systems must be tested for accuracy and bias',
      url: 'https://artificialintelligenceact.eu/'
    },
    bestPractice: 'Test with diverse voices, accents, languages. Monitor accuracy. Document limitations.',
    risk: 'Audio processing errors can cause misunderstandings or discrimination.',
    example: 'Voice assistant that doesn\'t understand certain accents: excludes users and may be discriminatory.',
  },
  'Vault Dati (UE)': {
    simpleExplanation: 'Data stored on European servers is better protected by GDPR. European laws protect your rights better than those of other countries. But you must still verify that data is encrypted and only authorized people can access it.',
    question: 'Have you verified that data on European servers is encrypted? Who can access it?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Data must be encrypted and access limited, even on EU servers',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Always prefer European servers when possible. Verify data is encrypted. Control who has access.',
    risk: 'Even on EU servers, data must be protected with encryption and limited access.',
    example: 'European servers are safer, but data must still be encrypted and protected.',
  },
  'Cloud (USA)': {
    simpleExplanation: 'Data stored on US servers can be accessed by US authorities under US laws (like the Cloud Act). This is a problem for GDPR. If you use US cloud services, you must use encryption and additional safeguards.',
    question: 'Do you know that US authorities can access data on US servers? Have you implemented additional protections?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49 (Schrems II)',
      requirement: 'Transfers to USA require SCC + supplementary measures (encryption) or risk invalidation',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Use end-to-end encryption. Consider EU alternatives. Document supplementary measures.',
    risk: 'US cloud without supplementary measures violates Schrems II. Risk of transfer invalidation and fines.',
    example: 'AWS US region: data accessible to US authorities. Requires encryption + SCC or consider EU regions.',
  },
  'Decisione Automatica': {
    simpleExplanation: 'When the system makes decisions automatically (like approving or rejecting a loan), people have the right to contest them and ask a human to review. You can\'t say "it\'s the computer, I can\'t do anything".',
    question: 'If the system makes an important decision about you, can you contest it? Is there someone who can review it?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'Right not to be subject to decisions based solely on automated processing. Right to contest.',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Provide clear process for contesting decisions. Human review available. Document decision logic.',
    risk: 'Automatic decisions without possibility of contestation violate GDPR and may cause discrimination.',
    example: 'Loan system that automatically rejects without possibility of human review: violates GDPR Art. 22.',
  },
  'Interfaccia Chat': {
    simpleExplanation: 'Chat interfaces that use AI (like ChatGPT) may store conversations, use them for training, or share them with third parties. Check the privacy policy and terms of service. Prefer services that don\'t use conversations for training.',
    question: 'Do you know if your conversations are stored or used for training? Have you read the privacy policy?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Users must be informed about data processing, including training use',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Read privacy policy. Prefer services that don\'t use conversations for training. Use enterprise versions when available.',
    risk: 'Chat conversations may contain sensitive data. If used for training, data may be exposed.',
    example: 'ChatGPT uses conversations for training by default. Enterprise version doesn\'t use data for training.',
  },
  'Portale / API pubblica': {
    simpleExplanation: 'If you publish data publicly (website, API), verify it doesn\'t contain personal information. Anonymize data (remove names, IDs, etc.) or aggregate it (statistics, not individual data). If someone can trace back to a specific person, you\'re violating GDPR. Like when publishing statistics: you show totals, not people\'s names.',
    question: 'Have you verified that published data doesn\'t contain personal information?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 5(1)(f) & Art. 32',
      requirement: 'Integrity and confidentiality: public data must not expose personal data',
      url: 'https://gdpr-info.eu/art-5-gdpr/'
    },
    bestPractice: 'Anonymize or aggregate data before publishing. Verify public data doesn\'t allow re-identification.',
    risk: 'Publishing data with personal information violates GDPR. May expose individuals to risks.',
    example: 'API that exposes data with user ID and personal information: violates GDPR. Anonymization required.',
  },
  'Sistema di Notifiche': {
    simpleExplanation: 'Users must be able to control which notifications they receive and when. They must be able to easily disable them. Don\'t bombard users with notifications without control: they\'re perceived as spam. Like app settings: the user must be able to choose what they want to receive.',
    question: 'Can users control which notifications they receive? Can they disable them?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 7(3)',
      requirement: 'Right to withdraw consent and control data processing',
      url: 'https://gdpr-info.eu/art-7-gdpr/'
    },
    bestPractice: 'User dashboard to manage notification preferences. Option to disable. Respect user choices immediately.',
    risk: 'Notifications without user control may be perceived as spam or invasive.',
  },
  'Dashboard Analitica': {
    simpleExplanation: 'Dashboards with data should show aggregated statistics (totals, averages) when possible, not individual data. And only those who really need it can access. If you show individual data to too many people, you increase the risk that someone sees things they shouldn\'t. Like when showing sales statistics: totals, not customer names.',
    question: 'Is data in the dashboard aggregated or individual? Who can access it?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Limit access to those who need it. Aggregated data when possible',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Use aggregated data when possible. Individual access only if necessary. Strong authentication. Audit trail.',
    risk: 'Dashboard with individual data accessible to too many people increases risk of data breach.',
  },
  'Export Dati': {
    simpleExplanation: 'When you export data outside Europe (e.g. to US servers), you must verify it\'s legal. Requires a special contract (SCC) and encryption. Non-compliant transfers can be blocked and cause fines. Like when shipping something abroad: you must have the right documentation.',
    question: 'Have you verified that data transfers are compliant? Do you have SCC?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49',
      requirement: 'Export/extra-EU transfers require adequate safeguards (SCC, BCR, etc.)',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Verify data destination. Use SCC for transfers. End-to-end encryption. Document everything.',
    risk: 'Non-compliant exports can be invalidated, causing fines and service interruption.',
  },
  'Server Proprietari': {
    simpleExplanation: 'If servers are in your company, they must be physically protected. Who can enter the room? Is there access control? Is there monitoring (cameras, alarms)? And you must have regular backups. Like when protecting an office: you control who enters and when.',
    question: 'Are servers physically secure? Who has access? Do you have monitoring?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Technical and organizational measures for security: physical access, monitoring, backup',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Controlled physical access. Continuous monitoring. Regular backups. Disaster recovery plan.',
    risk: 'Unprotected servers or without monitoring are vulnerable to unauthorized access.',
  },
  'ChatGPT': {
    simpleExplanation: 'ChatGPT is an AI system by OpenAI that runs on servers in the United States. When you use ChatGPT, your data is sent to the USA, where laws allow their intelligence to access it. This can violate your GDPR rights. You must know that data is saved and used to improve the system.',
    question: 'Did you know ChatGPT saves your data on US servers? Have you checked privacy settings?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49 (Schrems II)',
      requirement: 'Data transfers to USA require special protections',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Check ChatGPT privacy settings. Avoid sharing sensitive data. Consider EU-hosted alternatives.',
    risk: 'Data shared with ChatGPT is saved in USA and may be accessible to US authorities.',
    example: 'If you ask ChatGPT to analyze a confidential business document, that document is saved on US servers.',
    whatYouCanDo: [
      'Check ChatGPT privacy settings: disable "Data training" if possible',
      'Don\'t share personal or sensitive business data with ChatGPT',
      'Ask your company if using ChatGPT for work data is allowed',
      'Consider alternatives with European servers (e.g. Mistral, local LLaMA)'
    ],
    redFlags: [
      'You don\'t know if ChatGPT is saving your conversations',
      'You share confidential business data without authorization',
      'You haven\'t read OpenAI\'s privacy policy',
      'You haven\'t disabled "Data training" in settings'
    ],
  },
  'Google Gemini': {
    simpleExplanation: 'Google Gemini is an AI system by Google. When you use it, your data is sent to Google and may be saved on US servers. Google can use your data to improve the system and for other purposes. You must know what you share and where it goes.',
    question: 'Did you know Gemini saves your data? Have you read the terms of use?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Google must inform you about how it uses your data',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Read terms of use. Check privacy settings. Avoid sensitive data.',
    risk: 'Data shared with Gemini may be used by Google for various purposes, including system improvements.',
    example: 'If you use Gemini to analyze work documents, those documents may be saved by Google.',
    whatYouCanDo: [
      'Read Google\'s terms of use and privacy policy',
      'Check your Google account privacy settings',
      'Don\'t share confidential business data without authorization',
      'Ask your company if using Gemini for work data is allowed'
    ],
    redFlags: [
      'You don\'t know if Google saves your data',
      'You share work data without authorization',
      'You haven\'t read Google\'s privacy policy',
      'You don\'t check your account privacy settings'
    ],
  },
  'Claude': {
    simpleExplanation: 'Claude is an AI system by Anthropic. When you use it, your data is sent to Anthropic and may be saved. Anthropic promises better privacy protection than others, but you must always know what you share. Check their privacy policies.',
    question: 'Have you read Claude\'s privacy policy? Did you know where your data is saved?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'You must be informed about how your data is used',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Read Anthropic\'s privacy policy. Check settings. Avoid very sensitive data.',
    risk: 'Even though Anthropic is more privacy-conscious, data is still sent and saved.',
    example: 'If you use Claude to work with confidential documents, those documents are still sent to Anthropic\'s servers.',
  },
  'I Miei Dati Personali': {
    simpleExplanation: 'Your personal data (name, email, address) is valuable and must be protected. When you share it with an AI system, you must know where it ends up and how it\'s used. You have the right to know and to request deletion.',
    question: 'Have you read how the system uses your personal data? Can you request deletion?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14 & Art. 17',
      requirement: 'You have the right to know how your data is used and to request deletion',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Always read privacy policy before sharing data. Only use services that allow you to delete your data when you want.',
    risk: 'If you share personal data without knowing how it\'s used, it may be sold or misused.',
    example: 'If you enter your name and email in ChatGPT, that data is saved and may be used by OpenAI.',
    whatYouCanDo: [
      'Always read privacy policy before sharing personal data',
      'Ask the service provider to delete your data if you no longer want to use it',
      'Only use services that allow you to control and delete your data',
      'Don\'t share more data than necessary: always evaluate if it\'s really necessary'
    ],
    redFlags: [
      'You haven\'t read privacy policy before sharing data',
      'The service doesn\'t allow you to delete your data',
      'You share personal data without knowing how it\'s used',
      'You don\'t know how to request data deletion'
    ],
  },
  'Dati di Lavoro': {
    simpleExplanation: 'Work data (business documents, customer information, etc.) is often confidential. When you share it with an AI system, you\'re potentially violating confidentiality. You must verify with your company if it\'s allowed. Work data often ends up on US servers, where it may be accessible to others.',
    question: 'Does your company allow you to share work data with AI systems? Have you checked company policies?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32 & Art. 28',
      requirement: 'Business data must be protected. Sharing with providers requires specific agreements',
      url: 'https://gdpr-info.eu/art-28-gdpr/'
    },
    bestPractice: 'Verify with your boss or company IT if you can use AI systems for work data. Only use company-approved tools.',
    risk: 'Sharing work data with unauthorized AI systems can violate confidentiality and cause legal problems.',
    example: 'If you share a document with customer information with ChatGPT, you\'re potentially violating data confidentiality.',
  },
  'Cloud Server (USA)': {
    simpleExplanation: 'Data saved on US servers (like AWS, Google Cloud in USA) may be accessible to US authorities without a court warrant. This violates your GDPR rights. If possible, prefer European servers.',
    question: 'Did you know data on US servers may be accessible to US authorities? Do you have alternatives with European servers?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 44-49 (Schrems II)',
      requirement: 'Data transfers to USA require special protections because US laws allow authority access',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Ask the service provider where data is saved. Prefer European servers when possible.',
    risk: 'Data on US servers may be accessible to US authorities (NSA, FBI) without you knowing.',
    example: 'ChatGPT saves data on US servers: if you share sensitive information, it may be accessible to US authorities.',
    whatYouCanDo: [
      'Ask the service provider where data is saved (check privacy policy)',
      'Prefer services with European servers when possible',
      'Avoid sharing very sensitive data with services using US servers',
      'Consider alternatives with European data residency'
    ],
    redFlags: [
      'The service doesn\'t clearly say where data is saved',
      'You save sensitive data on US services without knowing',
      'You don\'t have alternatives with European servers',
      'You don\'t know US authorities can access your data without a warrant'
    ],
  },
  'Sul Mio Computer': {
    simpleExplanation: 'If data is saved only on your computer, it\'s safer because it doesn\'t travel over the internet. But you must still protect it with passwords and backups. If the computer is stolen or breaks, data may be lost.',
    question: 'Do you have passwords and backups to protect data on your computer? What happens if the computer breaks?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Data must be protected even when on your device',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Use strong passwords on computer. Make regular backups. Encrypt sensitive data. Keep software updated.',
    risk: 'Data on computer without password or backup may be stolen or lost if computer breaks.',
    example: 'If you save work data on laptop without password, anyone can access it if laptop is stolen.',
  },
  'Storage Sconosciuto': {
    simpleExplanation: 'If you don\'t know where your data is saved, this is a risk. You don\'t know who can access it, which laws apply, or how it\'s protected. You should always know where your data ends up.',
    question: 'Have you ever asked the service provider where your data is saved? Why haven\'t you checked?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'You have the right to know where your data is saved',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Always read the service\'s privacy policy. Look for information on where data is saved. Ask support if unclear.',
    risk: 'Not knowing where data is saved means not knowing who can access it or how it\'s protected.',
    example: 'Many people don\'t know ChatGPT saves data on US servers. They should read it in the privacy policy.',
  },
  'Email Scritta': {
    simpleExplanation: 'When you use AI to write emails, the content you generate may contain personal or business information. This content is sent to the AI system and may be saved. You must know what you share.',
    question: 'When you use AI to write emails, do you share personal or business data? Do you know where that data goes?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'You have the right to know how your data is used',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Avoid sharing sensitive data when generating emails with AI. Check what you send to the system.',
    risk: 'Emails generated with AI may contain personal information that is saved by the system.',
    example: 'If you ask ChatGPT to write an email with customer information, that information is saved.',
  },
  'Documenti Analizzati': {
    simpleExplanation: 'When you use AI to analyze documents, you share the entire document content with the system. If the document contains personal, confidential or sensitive data, you\'re exposing that data. You must be aware of what you share.',
    question: 'Have you verified that documents you analyze don\'t contain sensitive or confidential data? Does your company allow it?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32 & Art. 28',
      requirement: 'Confidential data must be protected. Sharing with providers requires agreements',
      url: 'https://gdpr-info.eu/art-28-gdpr/'
    },
    bestPractice: 'Don\'t share documents with personal or confidential data with unauthorized AI systems. Verify with your company.',
    risk: 'Analyzing confidential documents with unauthorized AI may violate confidentiality and cause legal problems.',
    example: 'If you share a contract with customer data with Gemini, you\'re potentially violating confidentiality.',
  },
  'Codice Generato': {
    simpleExplanation: 'When you use AI to generate code, the code may contain errors or security vulnerabilities. Also, it might use copyright-protected code. You must always check generated code and verify it\'s secure.',
    question: 'Have you checked AI-generated code for errors or vulnerabilities? Have you verified it doesn\'t violate copyright?',
    regulation: {
      name: 'Copyright & Licenses',
      article: 'Various',
      requirement: 'Generated code may contain copyright-protected parts',
      url: 'https://opensource.org/licenses'
    },
    bestPractice: 'Always review and test AI-generated code. Verify it doesn\'t contain protected code. Test for vulnerabilities.',
    risk: 'AI-generated code may contain bugs, security vulnerabilities or violate copyright.',
    example: 'Code generated by Copilot might contain copyright-protected code parts or vulnerabilities.',
  },
  'Cloud Server (EU)': {
    simpleExplanation: 'Data saved on European servers is better protected by GDPR. European laws protect your rights better than those of other countries. But you must still verify that data is encrypted and only authorized people can access it.',
    question: 'Have you verified that data on European servers is encrypted? Who can access it?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32',
      requirement: 'Data must be encrypted and access limited, even on EU servers',
      url: 'https://gdpr-info.eu/art-32-gdpr/'
    },
    bestPractice: 'Always prefer European servers when possible. Verify data is encrypted. Check who has access.',
    risk: 'Even on EU servers, data must be protected with encryption and limited access.',
    example: 'European servers are safer, but data must still be encrypted and protected.',
  },
};

// Translations for type-based knowledge (designer mode)
export const TYPE_KNOWLEDGE_DESIGNER_EN: Record<string, Partial<KnowledgeTranslation>> = {
  input: {
    simpleExplanation: 'This is the data entering the system: where does it come from? Who collects it? Why? You must inform people BEFORE collecting it. Like when you knock on a door: you must say who you are and why you\'re there.',
    question: 'Where does this data come from? Who collects it and for what purpose?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'Obligation to inform the data subject BEFORE collection: who, what, why, for how long, rights',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Document data origin, purpose, legal basis. Verify that collection is necessary and proportionate. Clear and accessible information.',
    risk: 'Collecting data without information or valid legal basis is unlawful. Fines up to 4% of turnover.',
  },
  process: {
    simpleExplanation: 'Here AI processes data to make decisions or analysis. It\'s like a black box that takes data and returns results. You must be able to explain how it works, at least simply. People have the right to understand why a system made a certain decision about them.',
    question: 'How does this process work? Is it transparent and explainable?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'High-risk systems must be transparent: users must understand how they work',
      url: 'https://artificialintelligenceact.eu/'
    },
    bestPractice: 'Document algorithm, training data, system limits. Provide understandable explanations of decisions. Monitor performance and bias.',
    risk: 'Opaque processes can hide bias, errors or discrimination. Difficult to contest decisions if you don\'t understand how they work.',
  },
  storage: {
    simpleExplanation: 'Where do you store the data? On servers in Europe or other countries? It\'s important because laws change from country to country. If you put them on US servers, you must protect them particularly (encryption) because US laws allow their intelligence to access them.',
    question: 'Where is the data stored? Which jurisdictions apply?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32 & Art. 44-49',
      requirement: 'Data must be protected (encryption) and extra-EU transfers require adequate safeguards',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Choose data centers in EU when possible. For extra-EU transfers: SCC + encryption. Document location and security measures.',
    risk: 'Storage in countries without adequate protections can violate GDPR. Unencrypted data is vulnerable to data breaches.',
  },
  output: {
    simpleExplanation: 'This is what the end user sees: the system\'s decision, a report, a chat. If the decision is important (e.g. loan rejection), the person must be able to contest it and ask a human to review. You can\'t say "it\'s the computer, I can\'t do anything".',
    question: 'What does the user see? Can they contest or appeal decisions?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'You have the right not to be subject to decisions based solely on automated processing. Right to contest.',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Read the service terms to see if you can contest decisions. Ask the provider how to appeal. Don\'t accept automatic decisions without possibility of review.',
    risk: 'If you accept automatic decisions without being able to contest them, you may suffer discrimination or injustices without remedy.',
  },
};

// Translations for type-based knowledge (user mode)
export const TYPE_KNOWLEDGE_USER_EN: Record<string, Partial<KnowledgeTranslation>> = {
  input: {
    simpleExplanation: 'This is your data or data you share with the system. You have the right to know why it\'s collected, who uses it and how it\'s protected. Like when someone asks you something: you have the right to know why.',
    question: 'Do you know why this system collects this data? Did you give consent?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 13-14',
      requirement: 'You have the right to know why your data is collected BEFORE it\'s collected',
      url: 'https://gdpr-info.eu/art-13-gdpr/'
    },
    bestPractice: 'Always read the privacy notice before sharing data. Verify that collection is necessary. You can refuse if you don\'t want to.',
    risk: 'If you share data without knowing why or without valid consent, you may violate your privacy.',
    example: 'If an app asks you to access your contacts without explaining why, you shouldn\'t accept.',
  },
  process: {
    simpleExplanation: 'Here AI processes your data to make decisions or analysis. It\'s like a black box: you put data in and a result comes out. You have the right to understand how it works, at least simply. You have the right to know why the system made a certain decision about you.',
    question: 'Do you know how this system works? Do you understand why it makes certain decisions about you?',
    regulation: {
      name: 'AI Act',
      article: 'Art. 13',
      requirement: 'You have the right to understand how AI systems that use your data work',
      url: 'https://artificialintelligenceact.eu/'
    },
    bestPractice: 'Ask the service provider for explanations on how the system works. Read the terms of use. Check if there are limits or risks.',
    risk: 'If you don\'t understand how the system works, you may accept unfair or discriminatory decisions without knowing it.',
    example: 'If a loan system automatically rejects you without explaining why, you have the right to an explanation.',
  },
  storage: {
    simpleExplanation: 'Where is your data stored? On servers in Europe or other countries? It\'s important because laws change from country to country. If they\'re on US servers, US authorities can access them. You have the right to know where your data ends up.',
    question: 'Do you know where your data is stored? Is it in Europe or other countries?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 32 & Art. 44-49',
      requirement: 'You have the right to know where your data is stored. Extra-EU transfers require special protections',
      url: 'https://gdpr-info.eu/chapter-5/'
    },
    bestPractice: 'Ask the service provider where the data is stored. Prefer services with European servers. Verify that data is encrypted.',
    risk: 'Data on extra-EU servers (especially USA) can be accessible to authorities of those countries without you knowing.',
    example: 'ChatGPT stores data on US servers: if you share sensitive information, US authorities can access it.',
  },
  output: {
    simpleExplanation: 'This is what you see: the system\'s decision, a result, a response. If the decision is important (e.g. loan rejection, recommendation), you have the right to contest it and ask a human to review. You don\'t have to accept decisions without being able to discuss them.',
    question: 'If the system makes an important decision about you, can you contest it? Is there someone who can review it?',
    regulation: {
      name: 'GDPR',
      article: 'Art. 22',
      requirement: 'You have the right not to be subject to decisions based solely on automated processing. Right to contest.',
      url: 'https://gdpr-info.eu/art-22-gdpr/'
    },
    bestPractice: 'Read the service terms to see if you can contest decisions. Ask the provider how to appeal. Don\'t accept automatic decisions without possibility of review.',
    risk: 'If you accept automatic decisions without being able to contest them, you may suffer discrimination or injustices without remedy.',
    example: 'If a loan system automatically rejects you and you can\'t talk to anyone, you have the right to ask for human review.',
  },
};

/**
 * Translate block knowledge from Italian to English
 * Returns English translation if available, otherwise returns null (will use Italian fallback)
 */
export function translateBlockKnowledge(
  knowledge: any,
  blockLabel: string,
  blockType: string,
  userMode?: 'use' | 'design'
): any | null {
  // Try label-specific translation first
  const labelTranslation = BLOCK_KNOWLEDGE_EN[blockLabel];
  if (labelTranslation) {
    return {
      ...knowledge,
      ...labelTranslation,
      regulation: labelTranslation.regulation || knowledge.regulation,
    };
  }
  
  // Try type-based translation
  const typeTranslations = userMode === 'use' 
    ? TYPE_KNOWLEDGE_USER_EN[blockType]
    : TYPE_KNOWLEDGE_DESIGNER_EN[blockType];
    
  if (typeTranslations) {
    return {
      ...knowledge,
      ...typeTranslations,
      regulation: typeTranslations.regulation || knowledge.regulation,
    };
  }
  
  // No translation available, return null to use Italian fallback
  return null;
}

