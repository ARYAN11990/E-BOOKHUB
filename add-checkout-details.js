const fs = require('fs');

let pageContent = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');

// Insert CheckCircle import if not exists
if (!pageContent.includes('CheckCircle')) {
  pageContent = pageContent.replace(/import \{ ShieldCheck, AlertCircle, Lock, Loader2 \} from 'lucide-react';/, "import { ShieldCheck, AlertCircle, Lock, Loader2, CheckCircle, BookOpen, Star, Clock } from 'lucide-react';");
} else {
  pageContent = pageContent.replace(/CheckCircle,/, 'CheckCircle, BookOpen, Star, Clock,');
}

const detailedSection = `
      {/* Course Detailed Info Section */}
      <div className="mt-12 bg-surface-main rounded-2xl p-6 md:p-10 border border-border-light shadow-sm">
        <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-8 border-b border-border-light pb-4">
          Everything You Need to Know
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-bold text-text-primary mb-5 flex items-center">
              <Star className="w-6 h-6 text-brand-purple mr-2" />
              What You Will Learn
            </h3>
            <ul className="space-y-4">
              {[
                "Complete step-by-step strategies designed for beginners.",
                "How to monetize and turn your skills into a profitable income stream.",
                "Proven frameworks used by top industry experts.",
                "Lifetime access to all future updates and additions.",
                "Instant digital download immediately after purchase."
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-text-secondary leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center">
                <BookOpen className="w-6 h-6 text-brand-purple mr-2" />
                Who is this for?
              </h3>
              <p className="text-text-secondary leading-relaxed">
                Whether you are a complete beginner looking to start your online journey, or an intermediate looking to scale your income, this E-book provides a clear, actionable roadmap without the fluff.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center">
                <Clock className="w-6 h-6 text-brand-purple mr-2" />
                Delivery & Format
              </h3>
              <p className="text-text-secondary leading-relaxed">
                This is a premium digital E-book (PDF format). You can read it on your phone, tablet, or computer. Your unique download link will be emailed to you instantly upon successful payment.
              </p>
            </div>
          </div>
        </div>
      </div>
`;

// Insert the new section just before the closing </div> of the container.
// The container ends at:
//       </div>
//     </div>
//   );
// }

// I will just replace the closing divs.
pageContent = pageContent.replace(/      <\/div>\n    <\/div>\n  \);\n\}/, `      ${detailedSection}\n    </div>\n  );\n}`);

fs.writeFileSync('src/app/checkout/page.tsx', pageContent);
