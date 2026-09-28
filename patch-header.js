const fs = require('fs');
let data = fs.readFileSync('src/components/layout/Header.tsx', 'utf-8');

// Remove Learnora text
data = data.replace(/<span className="text-xl font-extrabold text-text-primary hidden sm:inline-block tracking-tight">\s*Learnora\s*<\/span>/, '');

// Remove ShoppingCart icon from imports
data = data.replace('ShoppingCart, ', '');

// Remove useCart import
data = data.replace("import { useCart } from '@/context/CartContext';\n", "");

// Remove useCart hook
data = data.replace("  const { cartCount, isMounted } = useCart();\n", "");

// Remove Desktop cart link
data = data.replace(/<Link href="\/cart"[\s\S]*?<\/Link>\s*/, '');

// Remove Mobile cart link block
data = data.replace(/<Link href="\/cart" className="flex items-center space-x-2 text-text-secondary font-semibold" onClick=\{\(\) => setIsMenuOpen\(false\)\}>\s*<ShoppingCart className="w-5 h-5" \/>\s*<span>Cart \{isMounted \? `\(\$\{cartCount\}\)` : ''\}<\/span>\s*<\/Link>/, '');

fs.writeFileSync('src/components/layout/Header.tsx', data);
