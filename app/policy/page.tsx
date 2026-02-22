"use client";

const EFFECTIVE_DATE = "February 22, 2026";
const COMPANY = "Lai Warehouse";
const EMAIL = "privacy@laiwarehouse.com";
const WEBSITE = "www.laiwarehouse.com";

const sections = [
  {
    id: 1,
    title: "Introduction",
    content: [
      {
        type: "text",
        value: `Welcome to ${COMPANY}. This Privacy Policy explains how ${COMPANY} ("we", "us", or "our") collects, uses, discloses, and safeguards your information when you use our mobile applications, web applications, and services (collectively, the "Services"). We are committed to protecting your personal data and your right to privacy.`,
      },
      {
        type: "text",
        value:
          "By using our Services, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Services.",
      },
    ],
  },
  {
    id: 2,
    title: "Services We Provide",
    content: [
      {
        type: "text",
        value: `${COMPANY} provides the following services:`,
      },
      {
        type: "bullets",
        items: [
          "Warehouse Management — Storage, inventory tracking, and logistics management solutions.",
          "Order Fulfillment — Picking, packing, and shipping services for businesses.",
          "Inventory Management Systems — Digital tools and platforms for real-time stock monitoring.",
          "Delivery Coordination — Last-mile delivery tracking and coordination services.",
        ],
      },
      {
        type: "text",
        value:
          "Our mobile applications may be available on Google Play Store and/or Apple App Store. This Privacy Policy applies to all applications and services developed and published by Lai Warehouse.",
      },
    ],
  },
  {
    id: 3,
    title: "Information We Collect",
    content: [
      {
        type: "subheading",
        value: "3.1 Information You Provide Directly",
      },
      {
        type: "text",
        value:
          "We may collect personal information that you voluntarily provide when using our Services, including:",
      },
      {
        type: "bullets",
        items: [
          "Name, email address, and contact details when registering an account or contacting us.",
          "Business information such as company name, warehouse location, and inventory details.",
          "Payment information (processed securely through third-party payment providers — we do not store card details).",
          "Communications you send to us, including support requests and feedback.",
        ],
      },
      {
        type: "subheading",
        value: "3.2 Information Collected Automatically",
      },
      {
        type: "text",
        value:
          "When you use our mobile or web applications, we may automatically collect:",
      },
      {
        type: "bullets",
        items: [
          "Device information (device type, operating system version, unique device identifiers).",
          "Usage data (features accessed, time spent, actions performed within the app).",
          "Log data (IP address, browser type, pages visited, crash reports, diagnostic data).",
          "Location data (only if you explicitly grant location permission; used solely for delivery and logistics functionality).",
        ],
      },
      {
        type: "subheading",
        value: "3.3 Information from Third-Party Services",
      },
      {
        type: "text",
        value:
          "Our applications may integrate with third-party services such as Google Sign-In, Firebase, analytics platforms, or payment processors. Information collected by these third parties is governed by their respective privacy policies.",
      },
    ],
  },
  {
    id: 4,
    title: "How We Use Your Information",
    content: [
      { type: "text", value: "We use the information we collect to:" },
      {
        type: "bullets",
        items: [
          "Provide, operate, and maintain our Services.",
          "Improve, personalize, and expand our Services.",
          "Respond to your inquiries, provide customer support, and communicate with you.",
          "Process transactions and send related information such as confirmations and invoices.",
          "Send administrative information, updates, security alerts, and support messages.",
          "Monitor and analyze usage patterns to enhance user experience.",
          "Detect, prevent, and address technical issues, fraud, and abuse.",
          "Comply with legal obligations and enforce our terms and policies.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Data Sharing and Disclosure",
    content: [
      {
        type: "text",
        value:
          "We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:",
      },
      {
        type: "bullets",
        items: [
          "Service Providers — With trusted third-party vendors who assist in operating our Services (e.g., cloud hosting, analytics, payment processing), bound by confidentiality agreements.",
          "Legal Requirements — When required by law, regulation, court order, or governmental authority.",
          "Business Transfers — In connection with a merger, acquisition, or sale of assets, with appropriate confidentiality protections.",
          "Protection of Rights — To protect the rights, property, or safety of Lai Warehouse, our users, or the public.",
          "With Your Consent — For any other purpose with your explicit consent.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Data Retention",
    content: [
      {
        type: "text",
        value: `We retain your personal information for as long as necessary to provide our Services, fulfill the purposes described in this policy, and comply with our legal obligations. When personal data is no longer needed, we securely delete or anonymize it. You may request deletion of your account and associated data at any time by contacting us at ${EMAIL}.`,
      },
    ],
  },
  {
    id: 7,
    title: "Data Security",
    content: [
      {
        type: "text",
        value:
          "We implement industry-standard technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:",
      },
      {
        type: "bullets",
        items: [
          "Encryption of data in transit (TLS/HTTPS) and at rest.",
          "Secure access controls and authentication mechanisms.",
          "Regular security assessments and vulnerability monitoring.",
          "Limited access to personal data on a need-to-know basis.",
        ],
      },
      {
        type: "text",
        value:
          "However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.",
      },
    ],
  },
  {
    id: 8,
    title: "Your Rights and Choices",
    content: [
      {
        type: "text",
        value:
          "Depending on your location and applicable law, you may have the following rights regarding your personal data:",
      },
      {
        type: "bullets",
        items: [
          "Access — Request a copy of the personal data we hold about you.",
          "Correction — Request correction of inaccurate or incomplete data.",
          "Deletion — Request deletion of your personal data (subject to legal obligations).",
          "Portability — Request transfer of your data in a machine-readable format.",
          "Objection — Object to processing of your data for certain purposes.",
          "Withdrawal of Consent — Withdraw consent at any time where processing is based on consent.",
        ],
      },
      {
        type: "text",
        value: `To exercise any of these rights, please contact us at ${EMAIL}. We will respond within 30 days.`,
      },
    ],
  },
  {
    id: 9,
    title: "Children's Privacy",
    content: [
      {
        type: "text",
        value:
          "Our Services are not directed to children under the age of 13 (or 16 in certain jurisdictions). We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. Upon verification, we will delete such information from our records.",
      },
    ],
  },
  {
    id: 10,
    title: "Third-Party Links and Services",
    content: [
      {
        type: "text",
        value:
          "Our applications and websites may contain links to third-party websites or services. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policy of every site you visit.",
      },
      {
        type: "text",
        value:
          "Third-party SDKs integrated into our apps (such as Google Analytics, Firebase, or payment gateways) may collect data independently per their own privacy policies.",
      },
    ],
  },
  {
    id: 11,
    title: "International Data Transfers",
    content: [
      {
        type: "text",
        value: `${COMPANY} is based in the Philippines. If you are accessing our Services from outside the Philippines, please be aware that your information may be transferred to, stored, and processed in the Philippines or other countries where our service providers operate. By using our Services, you consent to such transfers. We ensure appropriate safeguards are in place for cross-border data transfers.`,
      },
    ],
  },
  {
    id: 12,
    title: "Changes to This Privacy Policy",
    content: [
      {
        type: "text",
        value:
          'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by updating the "Effective Date" at the top of this policy and, where appropriate, by providing in-app notification or email notice. Your continued use of our Services after changes are posted constitutes your acceptance of the updated policy.',
      },
    ],
  },
  {
    id: 13,
    title: "Contact Us",
    content: [
      {
        type: "text",
        value:
          "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
      },
      {
        type: "contact",
        lines: [
          { label: "Company", value: COMPANY },
          { label: "Location", value: "Philippines" },
          { label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
          { label: "Website", value: WEBSITE, href: `https://${WEBSITE}` },
        ],
      },
    ],
  },
];

function renderContent(content, idx) {
  switch (content.type) {
    case "text":
      return (
        <p
          key={idx}
          className="text-slate-600 leading-relaxed mb-4 text-[15px]"
        >
          {content.value}
        </p>
      );
    case "subheading":
      return (
        <h3
          key={idx}
          className="text-slate-800 font-semibold text-base mt-6 mb-3"
        >
          {content.value}
        </h3>
      );
    case "bullets":
      return (
        <ul key={idx} className="mb-4 space-y-2">
          {content.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-slate-600 text-[15px]">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "contact":
      return (
        <div
          key={idx}
          className="mt-4 rounded-xl border border-slate-200 overflow-hidden"
        >
          {content.lines.map((line, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 px-5 py-3 ${
                i % 2 === 0 ? "bg-slate-50" : "bg-white"
              }`}
            >
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider w-20 shrink-0">
                {line.label}
              </span>
              {line.href ? (
                <a
                  href={line.href}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium transition-colors"
                >
                  {line.value}
                </a>
              ) : (
                <span className="text-slate-700 text-sm font-medium">
                  {line.value}
                </span>
              )}
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Warehouse icon */}
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M2 8.5L10 3l8 5.5V18H2V8.5z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <rect
                  x="7"
                  y="12"
                  width="6"
                  height="6"
                  rx="0.5"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">
              {COMPANY}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Legal</span>
        </div>
      </header>

      {/* Hero band */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 rounded-full px-3 py-1 mb-5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-amber-300 text-xs font-semibold tracking-wide uppercase">
              Legal Document
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-400 text-sm">
            Effective Date:{" "}
            <span className="text-slate-300 font-medium">{EFFECTIVE_DATE}</span>
          </p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-4xl mx-auto px-6 mt-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Table of Contents
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#section-${s.id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors group"
              >
                <span className="text-xs font-bold text-amber-500 w-5 shrink-0">
                  {s.id}.
                </span>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                  {s.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6 pb-16">
          {sections.map((section) => (
            <div
              key={section.id}
              id={`section-${section.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden scroll-mt-6"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">
                    {section.id}
                  </span>
                </div>
                <h2 className="text-slate-900 font-semibold text-lg">
                  {section.title}
                </h2>
              </div>

              {/* Section body */}
              <div className="px-6 py-5">
                {section.content.map((c, i) => renderContent(c, i))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 py-8 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} {COMPANY}. All rights reserved.
          </p>
          <p className="text-slate-400 text-xs mt-1">
            For questions, contact{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="text-amber-600 hover:underline"
            >
              {EMAIL}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
