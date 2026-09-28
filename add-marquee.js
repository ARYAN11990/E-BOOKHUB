const fs = require('fs');

let tw = fs.readFileSync('tailwind.config.ts', 'utf-8');
tw = tw.replace("'blob': 'blob 7s infinite',", "'blob': 'blob 7s infinite',\n        'marquee': 'marquee 25s linear infinite',");
tw = tw.replace("'100%': { transform: 'translate(0px, 0px) scale(1)' },\n        }", "'100%': { transform: 'translate(0px, 0px) scale(1)' },\n        },\n        marquee: {\n          '0%': { transform: 'translateX(0%)' },\n          '100%': { transform: 'translateX(-50%)' },\n        }");
fs.writeFileSync('tailwind.config.ts', tw);

let page = fs.readFileSync('src/app/page.tsx', 'utf-8');

const marqueeSection = `
      {/* Trust Badges Marquee */}
      <section className="py-10 bg-surface-main border-b border-border-light overflow-hidden relative">
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-main to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-main to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex w-[200%] animate-marquee">
          {/* First set */}
          <div className="flex-1 flex justify-around text-text-primary font-bold text-lg px-4 space-x-8 md:space-x-0">
            <div className="flex items-center whitespace-nowrap"><Users className="w-8 h-8 mr-3 text-brand-purple" /> 10,000+ Students</div>
            <div className="flex items-center whitespace-nowrap"><Star className="w-8 h-8 mr-3 text-brand-pink" /> 4.9/5 Average Rating</div>
            <div className="flex items-center whitespace-nowrap"><BookOpen className="w-8 h-8 mr-3 text-brand-purple" /> Premium E-books</div>
            <div className="flex items-center whitespace-nowrap"><TrendingUp className="w-8 h-8 mr-3 text-brand-pink" /> Lifetime Access</div>
          </div>
          {/* Second set (duplicate for seamless loop) */}
          <div className="flex-1 flex justify-around text-text-primary font-bold text-lg px-4 space-x-8 md:space-x-0">
            <div className="flex items-center whitespace-nowrap"><Users className="w-8 h-8 mr-3 text-brand-purple" /> 10,000+ Students</div>
            <div className="flex items-center whitespace-nowrap"><Star className="w-8 h-8 mr-3 text-brand-pink" /> 4.9/5 Average Rating</div>
            <div className="flex items-center whitespace-nowrap"><BookOpen className="w-8 h-8 mr-3 text-brand-purple" /> Premium E-books</div>
            <div className="flex items-center whitespace-nowrap"><TrendingUp className="w-8 h-8 mr-3 text-brand-pink" /> Lifetime Access</div>
          </div>
        </div>
      </section>
`;

page = page.replace(/\{\/\* Trust Badges \*\/\}[\s\S]*?<\/section>/, marqueeSection.trim());
fs.writeFileSync('src/app/page.tsx', page);
