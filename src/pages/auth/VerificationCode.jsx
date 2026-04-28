import bgImage from '../../assets/images/verificationImage.jpg';
import EmailSending from './verify/EmailSending';

const VerificationCode = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="w-full h-full bg-black/50 flex flex-col items-center justify-center px-12">
          <h1 className="text-white text-4xl font-bold mb-3">Welcome back</h1>
          <p className="text-white/70 text-lg text-center">
            Verify your email to continue securely
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full min-h-screen flex items-center justify-center lg:w-1/2 px-4 py-8">
        <EmailSending />
      </div>
    </div>
  );
};

export default VerificationCode;