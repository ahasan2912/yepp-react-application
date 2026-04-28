import { useEffect } from "react";
import PeragraphContent from "../../../components/info/PeragraphContent";

const AboutUs = () => {
    const appName = "Yepp Ads";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-[calc(100vh-50px)] bg-gray-50 px-4 pt-[220px] pb-12 sm:pt-56 sm:pb-16" data-animate="fade-up">
            <div className="mx-auto max-w-4xl rounded-lg border border-gray-100 bg-white px-5 py-8 shadow-sm sm:px-8 lg:px-10" data-animate="stagger">
                <header className="mb-8">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">About Yepp Ads</p>
                    <h1 className="mb-4 text-3xl font-bold leading-tight text-[#111827] sm:text-4xl">
                        Local deals made easier to discover
                    </h1>
                    <PeragraphContent>
                        Welcome to <strong className="font-semibold text-[#111827]">{appName}</strong>, your go-to platform for discovering
                        the best local deals, exclusive offers, and exciting experiences. Our mission is to bring you the
                        best discounts and unique opportunities, tailored specifically to your interests and location.
                    </PeragraphContent>
                    <PeragraphContent>
                        At <strong className="font-semibold text-[#111827]">{appName}</strong>, we believe that saving money should be simple
                        and rewarding. Whether you're looking for a delicious meal at your favorite restaurant, a relaxing
                        spa day, or an adventure-packed experience, we've got you covered. Our platform is designed to help
                        you find the best deals near you with just a few clicks.
                    </PeragraphContent>
                </header>

                <section>
                    <h2 className="mb-3 text-xl font-bold leading-snug text-[#1F2937]">Our Vision</h2>
                    <PeragraphContent>
                        To revolutionize how people discover and enjoy local deals, by providing an intuitive,
                        user-friendly platform that connects consumers with businesses offering valuable
                        experiences and services.
                    </PeragraphContent>
                </section>

                <section className="mt-8">
                    <h2 className="mb-3 text-xl font-bold leading-snug text-[#1F2937]">What We Offer</h2>
                    <ul className="ml-5 list-disc space-y-3 text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
                        <li>
                            <strong className="text-[#111827]">Exclusive Deals:</strong> Save on dining, wellness, fitness, and entertainment with exclusive offers from top-rated merchants.
                        </li>
                        <li>
                            <strong className="text-[#111827]">Personalized Recommendations:</strong> Browse curated deals based on your preferences and location.
                        </li>
                        <li>
                            <strong className="text-[#111827]">Seamless Redemption:</strong> Redeem deals with ease through QR codes or manual codes at participating merchants.
                        </li>
                        <li>
                            <strong className="text-[#111827]">Loyalty & Rewards:</strong> Enjoy our loyalty program and earn rewards for every deal you redeem.
                        </li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h2 className="mb-3 text-xl font-bold leading-snug text-[#1F2937]">Our Promise</h2>
                    <PeragraphContent>
                        At <strong className="font-semibold text-[#111827]">{appName}</strong>, we are committed to providing a seamless
                        experience, where discovering great deals is easy and rewarding. We work closely with local
                        businesses to bring you the best offers, ensuring that every deal on our platform is a
                        valuable opportunity to save and enjoy.
                    </PeragraphContent>
                </section>

                <footer className="mt-8 border-t border-gray-100 pt-6">
                    <PeragraphContent>
                        Thank you for choosing {appName}. We are excited to help you discover, redeem, and enjoy the best local deals near you.
                    </PeragraphContent>
                </footer>
            </div>
        </main>
    );
};

export default AboutUs;
