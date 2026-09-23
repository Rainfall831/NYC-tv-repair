// Terms, warranty and service notices. Source of truth: nytechtvrepair.com/tos.html
// Wording is kept close to the original, with spelling and grammar corrected.

export const repairTimeline = {
  title: "Repair & parts",
  body: "Most work is done the same day, in the customer's home. If the television has to be taken to the service center for further diagnostics, please allow 1-2 business days to be provided the estimate. If part(s) are required to complete the repair, it may take between 3-5 business days depending on parts availability.",
} as const;

export const warranty = {
  summary: "30-day labor and 90-day parts warranty.",
  intro: "N.Y. Tech TV Repair Inc. provides a 30-day labor and a 90-day parts warranty.",
  parts:
    "NY Tech TV Repair will replace any malfunctioning parts that were placed inside the television unit. Only parts that have been replaced by us have a 90-day warranty. The warranty only applies if parts which NY Tech TV Repair replaced are the cause of the malfunction.",
  labor: "NY Tech TV Repair provides a 30-day labor warranty only for part(s) that were replaced by NY Tech TV Repair.",
  exclusionsIntro: "Our warranty does not apply in the following cases:",
  exclusions: [
    "If the TV has been damaged or tampered with outside of our possession, in cases such as: water damage, physical damage, increased voltage in the socket, above room temperature (71°F to 82°F), humidity, etc.",
    "If the TV has been opened by non-qualified personnel.",
    "If there are foreign objects inside the TV, including but not limited to insects or rodents and their traces.",
  ],
} as const;

export const paymentInfo = "We do not share the customer's personal information with anyone else. We pride ourselves in being very confidential.";

export const homeServiceFeeRules = [
  "All service calls are scheduled at mutual convenience.",
  "There is a home service fee charge depending on the television size.",
  "The home service fee must be paid upfront, before any diagnostics are made.",
  "NY Tech TV Repair handles all pick up and delivery when necessary.",
  "Upon cancellation of any repairs, the home service fee charge will not be refunded. Home service and part shipping costs are non-refundable.",
  "All cancellations of appointments must be made two hours before the scheduled appointment window*. If the customer fails to cancel within that time, the home service fee charge is not refunded.",
  "If the customer needs to reschedule an appointment, they must call a minimum of two (2) hours before the appointment window*.",
  "If the customer decides to reschedule the appointment after missing the previous appointment, the additional charge will be the minimum rate of $30 along with the previous home service fee charge.",
  "NY Tech TV Repair will issue a full refund for the home service fee charge only if the cancellation or reschedule is made a minimum of two (2) hours before the appointment time*.",
] as const;

export const cancellationExample =
  "*Example: the appointment is 1:00PM until 5:00PM. The customer must call by 11:00AM to cancel or reschedule in order to not be charged the additional $30, or to be issued a refund.";

export const confirmationCall =
  "A technician or representative may call the customer to confirm the home service fee and give an estimated time of arrival. If the technician or representative is not able to reach the customer, they will assume the customer is not home and the appointment will be canceled. The additional trip will be charged only if the technician or company representative doesn't reach the customer during the appointment window. Please remember that we may or may not call.";

export const homeServiceIncludes = [
  "A home service visit to your home",
  "Pick up and delivery, based on the technician's decision",
  "If we need parts, we will come back to you as many times as needed with no extra charge",
] as const;

export const termsClosing = "If you have any questions, please feel free to call us. We will be glad to help.";

/** Short, scannable notices used on the home page "Service notice" section. */
export const serviceNotices = [
  {
    id: "area",
    title: "Five boroughs only",
    body: "We strictly service Brooklyn, Bronx, Queens, Manhattan and Staten Island.",
  },
  {
    id: "advance",
    title: "Home service fee is paid in advance",
    body: "Upon the technician's arrival, the home service fee must be paid in advance, before any diagnostics. Customer covers tolls when applicable.",
  },
  {
    id: "cancel",
    title: "Cancel or reschedule 2 hours ahead",
    body: "Cancellations and reschedules must be made at least two hours before the appointment window, or the home service fee is not refunded. Rescheduling after a missed appointment adds a minimum $30.",
  },
  {
    id: "dismount",
    title: "Dismounting is up to you",
    body: 'Dismounting the TV is the customer\'s responsibility and not included in labor. For TVs over 38", an extra technician ($75 each) may apply if we cannot access or move the set.',
  },
  {
    id: "timeline",
    title: "Timelines",
    body: "Most repairs are done the same day in your home. Shop diagnostics take 1-2 business days; parts can take 3-5 business days.",
  },
  {
    id: "warranty",
    title: "What the warranty excludes",
    body: "Water, physical or voltage damage, heat and humidity, sets opened by non-qualified personnel, and foreign objects such as insects or rodents.",
  },
] as const;
