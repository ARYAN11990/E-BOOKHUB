export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] dark:hidden">
      {/* Top Left Blob */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-brand-purple/20 mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
      
      {/* Top Right Blob */}
      <div className="absolute top-[-5%] right-[-10%] w-[35rem] h-[35rem] rounded-full bg-brand-pink/20 mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
      
      {/* Bottom Center Blob */}
      <div className="absolute bottom-[-15%] left-[20%] w-[45rem] h-[45rem] rounded-full bg-brand-accent/20 mix-blend-multiply filter blur-[100px] opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
    </div>
  );
}
