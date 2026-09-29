const fs = require('fs');
let data = fs.readFileSync('src/app/checkout/page.tsx', 'utf-8');

// Replace state
data = data.replace(
  `  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    acceptTerms: false
  });`,
  `  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    acceptTerms: false
  });`
);

// Replace Razorpay prefill
data = data.replace(
  `        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobileNumber,
        },`,
  `        prefill: {
          name: formData.firstName + ' ' + formData.lastName,
          contact: formData.mobileNumber,
        },`
);

// Replace Alert Box
data = data.replace(
  `Your course access and receipt will be sent directly to this email address.`,
  `You will get instant access to download your E-book immediately after payment.`
);

// Replace Form Fields
const oldFields = `              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Full Name *</label>
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Mobile Number *</label>
                <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Email Address (Optional)</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
              </div>`;

const newFields = `              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">First Name *</label>
                  <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">Last Name *</label>
                  <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Mobile Number *</label>
                <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={handleChange} className="w-full px-4 py-3 bg-surface-soft border border-border-light rounded-lg text-text-primary focus:outline-none focus:border-brand-purple" />
              </div>`;

data = data.replace(oldFields, newFields);

fs.writeFileSync('src/app/checkout/page.tsx', data);
