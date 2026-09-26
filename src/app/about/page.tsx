export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface-main py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-8 text-center">About Learnora</h1>
        
        <div className="bg-surface-main rounded-2xl p-8 md:p-12 border border-border-light shadow-sm">
          <h2 className="text-2xl font-bold text-brand-purple mb-6">Practical Digital Education at an Affordable Price</h2>
          
          <div className="prose prose-slate max-w-none text-text-secondary space-y-6">
            <p>
              Learnora is a digital learning platform created to make useful online skills easier and more affordable for Indian learners. Our e-books cover digital marketing, freelancing, web development, affiliate marketing, e-commerce, content creation, AI tools, and online business fundamentals.
            </p>
            <p>
              Our goal is to provide structured educational resources that learners can access anytime and study at their own pace. We believe that access to high-quality, practical knowledge should not require expensive degrees or overpriced courses.
            </p>
            
            <h3 className="text-xl font-semibold text-text-primary mt-8 mb-4">Our Contact Details</h3>
            <ul className="list-none space-y-3 p-0">
              <li className="flex items-start">
                <span className="font-semibold w-24 text-text-muted">Email:</span>
                <span>manthandhameliya1511@gmail.com</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold w-24 text-text-muted">Phone:</span>
                <span>+91 90161 04141</span>
              </li>
              <li className="flex items-start">
                <span className="font-semibold w-24 text-text-muted">Location:</span>
                <span>Bengaluru, Karnataka, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
