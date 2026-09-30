const fs = require('fs');

let data = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');

// 1. Update initial state
data = data.replace(
  `const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    acceptTerms: false
  });`,
  `const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    acceptTerms: false
  });`
);

// 2. Update Razorpay options name
data = data.replace(
  `name: formData.firstName + ' ' + formData.lastName,`,
  `name: formData.fullName,`
);

// 3. Update the UI form fields
const oldFields = `<div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">First Name *</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">Last Name (Optional)</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                </div>
              </div>`;

const newFields = `<div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Full Name *</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
              </div>`;

data = data.replace(oldFields, newFields);

fs.writeFileSync('src/app/checkout/page.tsx', data);
