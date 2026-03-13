import React, { useRef } from 'react';

const ResumePage = () => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 print:bg-white print:py-0">
      {/* Control Panel - Hidden during print */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center px-4 print:hidden">
        <p className="text-sm text-gray-600">
          Tip: You can click and edit any text directly.
        </p>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save as PDF
        </button>
      </div>

      {/* Resume Container */}
      <div 
        ref={resumeRef}
        className="max-w-4xl mx-auto bg-white shadow-2xl p-12 print:shadow-none print:p-8 min-h-[29.7cm]"
      >
        {/* Header */}
        <header className="border-b-2 border-gray-800 pb-6 mb-8">
          <h1 
            contentEditable 
            className="text-4xl font-bold text-gray-900 uppercase tracking-tight focus:outline-none focus:ring-2 ring-blue-200 rounded"
          >
            Breno Gonçalves Cota
          </h1>
          <div className="mt-4 grid grid-cols-2 gap-2 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <span contentEditable>Belo Horizonte, MG</span>
            </div>
            <div className="flex items-center gap-2">
              <span contentEditable>(31) 99988-2630</span>
            </div>
            <div className="flex items-center gap-2">
              <span contentEditable>brenocota4@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span contentEditable>linkedin.com/in/breno-cota</span>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <p contentEditable className="text-gray-700 leading-relaxed italic">
            I&apos;m a Software Engineer passionate about learning and creating solutions that help digital content creators realize your dreams. Currently at Hotmart, developing critical and high availability systems.
          </p>
        </section>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content (Experience) */}
          <div className="col-span-2 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 uppercase border-b mb-4">Career Experience</h2>
              
              {/* Job 1 */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 contentEditable className="font-bold text-lg">Hotmart - Software Engineer</h3>
                  <span contentEditable className="text-sm text-gray-500">05/2022 - Present</span>
                </div>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700 text-sm">
                  <li contentEditable>Contribute to development of critical and highly available systems.</li>
                  <li contentEditable>Apply monitoring techniques (Kibana, New Relic) to ensure performance.</li>
                  <li contentEditable>Collaborate with DevOps and QA for efficient solution delivery.</li>
                  <li contentEditable>Evolution of frontend testing structures and best practices.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 contentEditable className="font-bold text-lg">Cia. Hering - Software Engineer</h3>
                  <span contentEditable className="text-sm text-gray-500">03/2022 - 05/2023</span>
                </div>
                <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700 text-sm">
                  <li contentEditable>Developed new features for the brand&apos;s online store using React and GraphQL.</li>
                  <li contentEditable>Worked closely with product teams to translate user needs into technical solutions.</li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar (Skills & Education) */}
          <div className="col-span-1 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 uppercase border-b mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {['React JS', 'TypeScript', 'GraphQL', 'Node JS', 'Jest', 'Docker', 'AWS', 'K8s', 'NextJS'].map((skill) => (
                  <span 
                    key={skill} 
                    contentEditable 
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 uppercase border-b mb-4">Education</h2>
              <div className="text-sm">
                <p contentEditable className="font-bold">IFNMG</p>
                <p contentEditable className="text-gray-600">Systems Analysis and Development</p>
                <p contentEditable className="text-gray-500 italic">2018 - 2020</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 uppercase border-b mb-4">Certifications</h2>
              <div className="text-xs space-y-2">
                <p contentEditable>React: Testing and Debugging (Dan Abramov)</p>
                <p contentEditable>React: SSR (Egghead)</p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body { background: none; }
          .print\:hidden { display: none !important; }
          @page { margin: 0; }
        }
      `}</style>
    </div>
  );
};

export default ResumePage;