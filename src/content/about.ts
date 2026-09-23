// About content. Source of truth: nytechtvrepair.com/about.html and job.html.

export const whyNyTech = [
  { id: "authorized", title: "Authorized by manufacturers", body: "We are authorized by manufacturers to repair most major brands." },
  { id: "warranty", title: "Warranty on all work", body: "Warranty on all work and parts that have been replaced by us." },
  { id: "response", title: "Under one hour online response", body: "Online response time is under one hour during business hours." },
  { id: "experience", title: "80+ years combined experience", body: "Qualified technicians with 80+ years of combined experience." },
  { id: "onsite", title: "The technician comes to you", body: "The technician comes to you and repairs most problems on site." },
  { id: "fast", title: "Fast and efficient", body: "Fast and efficient service for your convenience." },
  { id: "friendly", title: "Friendly service", body: "And most importantly, our friendly service and love for televisions." },
] as const;

export const aboutStory = [
  "New York Tech Television Repair is a professional repair service. Beside us are qualified professionals with the best prices and friendly service. We repair all major brands and models including Plasma, DLP/CRT Projection and LCD televisions.",
  "Our services branch throughout all of the five boroughs in New York. With highly qualified technicians at our side, along with an ever-growing library of technical service manuals, there is nothing that could stop us from successfully repairing your television.",
  "We come to you; the technician repairs most problems without the television ever leaving your home. With intricate damage cases, your television is safely transported to our service center, where it will go through a thorough diagnosis to determine the problem, directly and efficiently. The customer is then given an estimate, and can both accept and decline the charges. Your television is usually diagnosed within one to two business days.",
] as const;

export const warrantyPromises = ["All parts replaced carry a 90-day warranty.", "All labor is guaranteed for 30 days."] as const;

export const career = {
  status: "As of today the technician vacancy is available.",
  title: "Field Service - TV Technician",
  intro: "Do you enjoy working with electronics?",
  description: [
    "Repair plasma, LCD, DLP and big screen/projection TVs for customers in home or at a repair shop.",
    "Technicians work Monday through Friday and every other Saturday.",
    "NY Tech TV Repair offers a base pay and excellent incentive plan, as well as the use of a company van.",
  ],
  requirements: [
    { text: "Good communication and excellent customer service skills", required: true },
    { text: "Must have TV repair experience", required: true },
    { text: "Good driving record and the ability to lift TVs and move merchandise", required: true },
    { text: "Multi-language speaking is appreciated", required: false },
  ],
  apply: "Just send your CV with your contact info to",
} as const;
