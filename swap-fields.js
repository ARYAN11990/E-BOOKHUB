const fs = require('fs');

let data = fs.readFileSync('src/app/checkout/page.tsx', 'utf8');

const emailField = `              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Email Address (Optional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
              </div>`;

const mobileField = `              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Mobile Number *</label>
                <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
              </div>`;

const combinedOld = `${emailField}
              
${mobileField}`;

const combinedNew = `${mobileField}
              
${emailField}`;

data = data.replace(combinedOld, combinedNew);

fs.writeFileSync('src/app/checkout/page.tsx', data);
