import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PeragraphContent from '../../../components/info/PeragraphContent';

const ContactUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-[calc(100vh-50px)] bg-gray-50 px-4 pt-55 pb-12 sm:pt-56 sm:pb-16" data-animate="fade-up">
            <div className="mx-auto max-w-4xl rounded-lg border border-gray-100 bg-white px-5 py-8 shadow-sm sm:px-8 lg:px-10" data-animate="stagger">
                <header className="mb-8">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Contact</p>
                    <h1 className="mb-4 text-3xl font-bold leading-tight text-[#111827] sm:text-4xl">
                        We would love to hear from you
                    </h1>
                    <PeragraphContent>
                        Whether you have questions, need assistance, or want to share feedback about Yepp Ads, our team is here to help.
                    </PeragraphContent>
                </header>

                <section>
                    <h2 className="mb-3 text-xl font-bold leading-snug text-[#1F2937]">How to Reach Us</h2>
                    <ul className="mb-8 grid gap-4 md:grid-cols-1">
                        <li className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-4">
                            <span className="mb-2 block font-semibold text-[#111827]">Email</span>
                            <PeragraphContent>
                                For general inquiries or support, feel free to email us at
                                <span className="font-semibold text-primary"> support@yeppads.com</span>.
                                We aim to respond within 24 hours.
                            </PeragraphContent>
                        </li>
                    </ul>
                </section>
            </div>
        </main>
    );
};

export default ContactUs;
