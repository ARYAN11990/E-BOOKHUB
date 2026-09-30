const fs = require('fs');

let data = fs.readFileSync('src/components/ui/CourseCard.tsx', 'utf-8');

// 1. Remove PDF E-book span
data = data.replace(
  /<span className="bg-brand-lavender text-brand-purple text-\[10px\] font-bold px-2\.5 py-1 rounded-md uppercase tracking-wider">\s*PDF E-book\s*<\/span>/g,
  ''
);

// 2. Update Discount calculation
data = data.replace(
  /\{course\.discountPercentage > 0 && \([\s\S]*?\{course\.discountPercentage\}% OFF[\s\S]*?\)\}/g,
  `{course.originalPrice > course.currentPrice && (
              <span className="bg-brand-pink text-brand-pinkDark text-xs font-bold px-2 py-1 rounded-md">
                {Math.round(((course.originalPrice - course.currentPrice) / course.originalPrice) * 100)}% OFF
              </span>
            )}`
);

// 3. Fix strange currency symbols
// Let's replace any non-ascii characters before `{course.currentPrice}` and `{course.originalPrice}` with a standard `₹`
data = data.replace(/[^\x00-\x7F]+\{course\.currentPrice\}/g, '₹{course.currentPrice}');
data = data.replace(/[^\x00-\x7F]+\{course\.originalPrice\}/g, '₹{course.originalPrice}');

fs.writeFileSync('src/components/ui/CourseCard.tsx', data);
console.log("CourseCard updated");
