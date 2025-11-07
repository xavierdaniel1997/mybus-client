"use client";

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How can I book a bus ticket on MyBus?",
    answer:
      "Simply search for your route, choose your preferred bus and seat, and proceed to secure payment. Your ticket will be sent to your registered email and phone number.",
  },
  {
    question: "Can I cancel or reschedule my bus ticket?",
    answer:
      "Yes, you can cancel or reschedule your ticket from the 'My Bookings' section. Refund policies may vary depending on the bus operator.",
  },
  {
    question: "Are online payments secure on MyBus?",
    answer:
      "Absolutely! All transactions on MyBus are processed through secure and encrypted payment gateways to ensure your safety.",
  },
  {
    question: "Do I need to print my ticket before boarding?",
    answer:
      "No, a digital ticket is enough. Just show your e-ticket or booking ID along with a valid ID proof at the boarding point.",
  },
  {
    question: "What should I do if I face issues with my booking?",
    answer:
      "You can reach out to our customer support team via chat or email at support@mybus.com for quick assistance.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 px-6 sm:px-10 lg:px-96 py-12  text-gray-800">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-900">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-md border-gray-300  overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center px-4 py-3 transition"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-left font-medium text-gray-900">{faq.question}</span>
              <FaChevronDown
                className={`text-gray-600 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`transition-all duration-300 ${
                openIndex === index ? "max-h-40 px-4 py-3" : "max-h-0 overflow-hidden"
              }`}
            >
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
