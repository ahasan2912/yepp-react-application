import { Link } from "react-router-dom";
import Title from "./components/Title";
import Description from "./components/Description";
import SubTitle from "./components/SubTitle";
import { useEffect } from "react";

const PrivecyAndPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    return (
        <div className="bg-gray-50 px-4 pt-[220px] pb-12 sm:pt-56 sm:pb-16">
            <div className="max-w-4xl mx-auto rounded-lg border border-gray-100 bg-white px-5 py-8 shadow-sm sm:px-8 lg:px-10">
                <Title>Privacy Policy for Yepp Ads</Title>
                <p className="mb-8 text-sm font-semibold uppercase tracking-wide text-[#6B7280]">Effective Date: 10 April 2026</p>

                <Description>
                    At Yepp Ads (yeppads.com), we respect your privacy and are committed to protecting the personal information
                    you share with us. This Privacy Policy outlines the types of information we collect, how we use and protect
                    it, and your rights regarding your personal data.
                </Description>

                <SubTitle>1. Information We Collect</SubTitle>
                <Description>We collect the following types of personal information when you use our website and app:</Description>
                <ul className="mb-5 ml-5 list-disc space-y-2 text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
                    <li><strong className="text-[#111827]">Email Address:</strong> For communication purposes, including account management and notifications.</li>
                    <li><strong className="text-[#111827]">Name:</strong> To personalize your experience and communication.</li>
                    <li><strong className="text-[#111827]">Address:</strong> For registration purposes and to process any purchases or subscriptions.</li>
                    <li><strong className="text-[#111827]">Location:</strong> We use your location for product recommendations tailored to your area. However, <strong className="text-[#111827]">we do not store your location</strong>.</li>
                </ul>

                <SubTitle>2. How We Use Your Information</SubTitle>
                <Description>We use the information we collect to:</Description>
                <ul className="mb-5 ml-5 list-disc space-y-2 text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
                    <li>Provide and improve our services</li>
                    <li>Process purchases and subscriptions</li>
                    <li>Recommend products based on your location (without storing it)</li>
                    <li>Communicate with you regarding your account and transactions</li>
                </ul>

                <SubTitle>3. Google Analytics</SubTitle>
                <Description>
                    We use Google Analytics to analyze website traffic and improve user experience. Google Analytics collects
                    data such as your browser type, language preference, referring site, and the pages you visit. This
                    information is used in an aggregate form and does not personally identify you.
                </Description>
                <Description>
                    For more information about how Google Analytics collects and processes data, you can review their privacy
                    policy here:{" "}
                    <Link to="https://www.google.com/analytics/learn/privacy.html" className="font-semibold text-primary hover:underline">
                        Google Analytics Privacy Policy
                    </Link>.
                </Description>

                <SubTitle>4. Ads and Data Sharing</SubTitle>
                <Description>
                    We do <strong>not show third-party ads</strong> or sell your personal data to advertisers. Your personal
                    information is used solely for the purposes described in this policy and is not shared with any third
                    parties for advertising purposes.
                </Description>

                <SubTitle>5. Registered Users and Subscriptions</SubTitle>
                <Description>
                    If you choose to register as a user, you can purchase a subscription to post content on our platform.
                    Your personal information will be used to process your subscription, but will not be shared with third
                    parties for any other purposes.
                </Description>

                <SubTitle>6. Data Security</SubTitle>
                <Description>
                    We take the security of your personal information seriously and implement industry-standard security
                    measures to protect it. However, no data transmission over the internet can be guaranteed 100% secure,
                    and we cannot guarantee the security of the data you send to us.
                </Description>

                <SubTitle>7. Your Rights</SubTitle>
                <Description>You have the right to:</Description>
                <ul className="mb-5 ml-5 list-disc space-y-2 text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
                    <li>Access, update, or delete your personal information</li>
                    <li>Request information about how your personal data is being used</li>
                    <li>Contact us for any concerns regarding your personal data</li>
                </ul>
                <Description>
                    If you have any questions or concerns about this Privacy Policy or wish to exercise your rights, please
                    contact us at:<br />
                    <strong>Email:</strong>{" "}
                    <Link to="mailto:support@yeppads.com" className="font-semibold text-primary hover:underline">support@yeppads.com</Link>
                </Description>

                <SubTitle>8. Changes to This Privacy Policy</SubTitle>
                <Description>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other
                    operational, legal, or regulatory reasons. Any changes will be posted on this page, and the effective
                    date will be updated accordingly.
                </Description>

                <SubTitle>9. Contact Us</SubTitle>
                <Description>
                    If you have any questions or concerns about our privacy practices, feel free to reach out to us at:
                </Description>
                <Description>
                    <strong>Email:</strong>{" "}
                    <Link to="mailto:support@yeppads.com" className="font-semibold text-primary hover:underline">support@yeppads.com</Link>
                </Description>
                <Description>
                    <strong>Website:</strong>{" "}
                    <Link to="http://www.yeppads.com" className="font-semibold text-primary hover:underline">www.yeppads.com</Link>
                </Description>
            </div>
        </div>
    );
}

export default PrivecyAndPolicy;
