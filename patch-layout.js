const fs = require('fs');
let data = fs.readFileSync('src/app/layout.tsx', 'utf-8');

data = data.replace('import { ThemeProvider } from "@/components/ThemeProvider";', 'import { ThemeProvider } from "@/components/ThemeProvider";\nimport AmbientBackground from "@/components/ui/AmbientBackground";');
data = data.replace('defaultTheme="system"', 'defaultTheme="light"');
data = data.replace('<Header />', '<AmbientBackground />\n            <Header />');

fs.writeFileSync('src/app/layout.tsx', data);
