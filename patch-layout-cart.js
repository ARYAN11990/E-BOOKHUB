const fs = require('fs');
let data = fs.readFileSync('src/app/layout.tsx', 'utf-8');

data = data.replace('import { CartProvider } from "@/context/CartContext";\n', '');
data = data.replace('<CartProvider>\n', '');
data = data.replace('</CartProvider>\n', '');
// Wait, there is indentation. Let's just remove `<CartProvider>` and `</CartProvider>` completely.
data = data.replace(/<CartProvider>/g, '');
data = data.replace(/<\/CartProvider>/g, '');

fs.writeFileSync('src/app/layout.tsx', data);
