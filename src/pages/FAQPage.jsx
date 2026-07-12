import React, { useState } from 'react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: "Foundation Basics",
      items: [
        {
          question: "What is onewholefuture?",
          answer: "onewholefuture is a global NGO dedicated to preserving human stories and fostering community development through technology and education."
        },
        {
          question: "Where are you located?",
          answer: "Our headquarters is in the US, with regional offices in Accra, London, and Tokyo."
        }
      ]
    },
    {
      category: "Programs & Impact",
      items: [
        {
          question: "How can I apply for a program?",
          answer: "You can apply through our Program Signup page. We announce new cohorts quarterly."
        },
        {
          question: "Who can participate in your initiatives?",
          answer: "Most of our programs are open to community leaders, educators, and technology enthusiasts who share our vision."
        }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-surface min-h-screen">
      <div className="max-w-[1200px] mx-auto px-8">
        <header className="mb-16">
          <h1 className="text-5xl font-bold text-primary font-headline mb-6 tracking-tight">Foundation FAQ</h1>
          <p className="text-xl text-on-surface-variant max-w-2xl font-body">
            Everything you need to know about our foundation, our work, and how we make an impact globally.
          </p>
        </header>

        <div className="space-y-12">
          {faqs.map((group, groupIdx) => (
            <section key={groupIdx}>
              <h2 className="text-2xl font-bold text-primary font-headline mb-6 pb-2 border-b border-outline-variant">
                {group.category}
              </h2>
              <div className="space-y-4">
                {group.items.map((faq, idx) => {
                  const globalIdx = `${groupIdx}-${idx}`;
                  const isOpen = openIndex === globalIdx;
                  return (
                    <div 
                      key={idx}
                      className="bg-white  rounded-2xl border border-outline-variant overflow-hidden transition-all duration-300 hover:shadow-md"
                    >
                      <button 
                        onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                        className="w-full flex justify-between items-center p-6 text-left"
                      >
                        <span className="text-lg font-semibold text-primary  font-headline">
                          {faq.question}
                        </span>
                        <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      <div className={`transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                        <div className="p-6 pt-0 text-on-surface-variant font-body leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
