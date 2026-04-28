import { Link } from "react-router-dom";
import Description from "../privecy-police/components/Description";
import SubTitle from "../privecy-police/components/SubTitle";
import Title from "../privecy-police/components/Title";
import { useEffect } from "react";

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className="bg-gray-50 px-4 pt-[220px] pb-12 sm:pt-56 sm:pb-16">
            <div className="max-w-4xl mx-auto rounded-lg border border-gray-100 bg-white px-5 py-8 shadow-sm sm:px-8 lg:px-10">
                <Title>Terms and Conditions for Yepp Ads</Title>
                <p className="mb-8 text-sm font-semibold uppercase tracking-wide text-[#6B7280]">Effective Date: 10 April 2026</p>

                <Description>
                    Welcome to Yepp Ads (yeppads.com), a platform that connects shop owners with users to share and discover exclusive deals, discounts, and coupons. By using our website and app, you agree to comply with and be bound by the following Terms and Conditions. Please read these terms carefully before accessing or using Yepp Ads. If you do not agree with these terms, you should not use our platform.
                </Description>

                <SubTitle>1. Acceptance of Terms</SubTitle>
                <Description>
                    By accessing or using Yepp Ads, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree to these terms, please refrain from using our platform.
                </Description>

                <SubTitle>2. Services Provided</SubTitle>
                <Description>
                    Yepp Ads allows shop owners to post coupons and deals on our platform for users to view. Users can access and browse these deals without the need for authentication or registration. To post deals, shop owners must purchase a subscription, which grants them the ability to upload and manage their deals on the platform.
                </Description>

                <SubTitle>3. Eligibility</SubTitle>
                <Description>
                    To use Yepp Ads, you must be at least 18 years old or the age of majority in your jurisdiction, whichever is greater. If you are under the required age, you must have the consent of a parent or legal guardian to use our platform.
                </Description>

                <SubTitle>4. User Registration and Subscription</SubTitle>
                <Description>
                    <strong>Shop Owners:</strong> Shop owners who wish to share deals and coupons must create an account on Yepp Ads and purchase a subscription plan. By purchasing a subscription, the shop owner agrees to adhere to the terms of the subscription and the platform's rules.
                </Description>
                <Description>
                    <strong>Users:</strong> Users do not need to create an account or register to access and view the available deals and coupons. However, users may choose to register for additional features, such as saving deals or subscribing to updates.
                </Description>

                <SubTitle>5. Posting Coupons and Deals</SubTitle>
                <Description>
                    <ul className="mb-5 ml-5 list-disc space-y-2 text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
                        <li>Only shop owners who have purchased a valid subscription may post coupons or deals on Yepp Ads.</li>
                        <li>All deals and coupons posted must be truthful, accurate, and compliant with applicable laws. Yepp Ads reserves the right to review and remove any posted content that violates these Terms and Conditions.</li>
                        <li>Yepp Ads does not guarantee the availability or validity of any coupons or deals. Shop owners are responsible for updating and removing expired or invalid deals.</li>
                    </ul>
                </Description>

                <SubTitle>6. Prohibited Content</SubTitle>
                <Description>
                    You agree not to post, share, or distribute any content that:
                </Description>
                <ul className="mb-5 ml-5 list-disc space-y-2 text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
                    <li>Is false, misleading, or deceptive</li>
                    <li>Violates any intellectual property rights or privacy rights of others</li>
                    <li>Is discriminatory, harmful, abusive, or offensive</li>
                    <li>Promotes illegal activities or violates any local, national, or international laws</li>
                </ul>

                <SubTitle>7. Payment and Subscription</SubTitle>
                <Description>
                    <ul className="mb-5 ml-5 list-disc space-y-2 text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
                        <li>Shop owners must pay the subscription fee to post deals on Yepp Ads. The subscription fee is non-refundable and will be charged according to the selected plan.</li>
                        <li>Subscription plans are subject to change, and Yepp Ads will provide notice of any pricing or policy updates. Shop owners will be notified before any subscription changes are implemented.</li>
                    </ul>
                </Description>

                <SubTitle>8. No Guarantee of Deal Availability</SubTitle>
                <Description>
                    While Yepp Ads strives to ensure that the deals and coupons listed on our platform are valid, we do not guarantee that the deals will be available, usable, or as described. Users should verify details directly with the shop owner or merchant before making any purchase.
                </Description>

                <SubTitle>9. Use of Google Analytics</SubTitle>
                <Description>
                    Yepp Ads uses Google Analytics to analyze traffic and improve the user experience. Google Analytics collects information about your interactions with the website, which may include your IP address, browser type, and referring pages. For more information on how Google Analytics uses data, please refer to their Privacy Policy.
                </Description>
                <Description>
                    For more information about how Google Analytics collects and processes data, you can review their privacy policy here:{" "}
                    <Link to="https://www.google.com/analytics/learn/privacy.html" className="font-semibold text-primary hover:underline">
                        Google Analytics Privacy Policy
                    </Link>.
                </Description>

                <SubTitle>10. Privacy</SubTitle>
                <Description>
                    By using Yepp Ads, you acknowledge and agree to our Privacy Policy, which governs the collection and use of your personal information. We are committed to protecting your privacy and ensuring your data is handled responsibly.
                </Description>

                <SubTitle>11. Termination of Access</SubTitle>
                <Description>
                    Yepp Ads reserves the right to suspend or terminate your access to the platform at any time, for any reason, including but not limited to violation of these Terms and Conditions. In case of termination, any fees paid for subscription services will not be refunded.
                </Description>

                <SubTitle>12. Limitation of Liability</SubTitle>
                <Description>
                    Yepp Ads shall not be liable for any damages, losses, or expenses incurred by users or shop owners in connection with the use of the platform, including but not limited to:
                </Description>
                <ul className="mb-5 ml-5 list-disc space-y-2 text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
                    <li>The inability to access or use the platform</li>
                    <li>Errors or inaccuracies in the posted deals or coupons</li>
                    <li>Disputes between users and shop owners</li>
                </ul>

                <SubTitle>13. Indemnification</SubTitle>
                <Description>
                    You agree to indemnify and hold harmless Yepp Ads, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, liabilities, or expenses arising out of your use of the platform, including any violation of these Terms and Conditions.
                </Description>

                <SubTitle>14. Modifications to the Terms</SubTitle>
                <Description>
                    Yepp Ads reserves the right to modify these Terms and Conditions at any time. Any changes will be posted on this page with an updated effective date. By continuing to use the platform after such changes, you agree to be bound by the modified terms.
                </Description>

                <SubTitle>15. Governing Law</SubTitle>
                <Description>
                    These Terms and Conditions shall be governed by and construed in accordance with the laws of [Insert Country/State]. Any disputes arising out of or in connection with these terms shall be resolved in the competent courts of [Insert Country/State].
                </Description>

                <SubTitle>16. Contact Information</SubTitle>
                <Description>
                    If you have any questions regarding these Terms and Conditions, please contact us at:
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

export default TermsAndConditions;
