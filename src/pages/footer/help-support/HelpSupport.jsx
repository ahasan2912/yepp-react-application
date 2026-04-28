import { useEffect } from 'react';
import PeragraphContent from '../../../components/info/PeragraphContent';

const HelpSupport = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className='min-h-screen bg-gray-50 px-4 pt-55 pb-12 sm:pt-56 sm:pb-16'>
            <div className="mx-auto max-w-4xl rounded-lg border border-gray-100 bg-white px-5 py-8 shadow-sm sm:px-8 lg:px-10">
                <header className="mb-8">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">Support</p>
                    <h1 className="mb-4 text-3xl font-bold leading-tight text-[#111827] sm:text-4xl">Help & Support</h1>
                    <PeragraphContent>
                        We are here to assist you with any questions or issues you may have while using Yepp Ads.
                        Below are the available support options.
                    </PeragraphContent>
                </header>

                <div className="space-y-8">
                    <section>
                        <h2 className="mb-3 text-xl font-bold leading-snug text-[#1F2937]">Need Assistance?</h2>
                        <PeragraphContent>
                            If you have any questions or need support, you can reach us through the following:
                        </PeragraphContent>
                        <ul className="grid gap-4 md:grid-cols-1">
                            <li className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-4">
                                <span className="mb-2 block font-semibold text-[#111827]">Email Support</span>
                                <PeragraphContent>
                                    For detailed inquiries or assistance, email us at{' '}
                                    <a href="mailto:support@yeppads.com" className="font-semibold text-primary hover:underline">support@yeppads.com</a>.
                                    We strive to respond to all emails within 24 hours.
                                </PeragraphContent>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-bold leading-snug text-[#1F2937]">Report an Issue</h2>
                        <PeragraphContent>
                            If you're experiencing a technical issue or error with the app, please let us know by:
                        </PeragraphContent>
                        <ul className="ml-5 list-disc space-y-2 text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
                            <li>
                                Emailing <a href="mailto:support@yeppads.com" className="font-semibold text-primary hover:underline">support@yeppads.com</a> with a description of the problem.
                            </li>
                            <li>Calling us directly for immediate assistance.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-bold leading-snug text-[#1F2937]">Troubleshooting Tips</h2>
                        <PeragraphContent>
                            If you're facing issues with the app, here are some quick steps to try:
                        </PeragraphContent>
                        <ul className="ml-5 list-disc space-y-2 text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8">
                            <li><span className="font-semibold text-[#111827]">Check for Updates:</span> Make sure you have the latest version of the app installed.</li>
                            <li><span className="font-semibold text-[#111827]">Restart the App:</span> Close and reopen the app to see if the issue persists.</li>
                            <li><span className="font-semibold text-[#111827]">Check Your Connection:</span> Ensure your internet connection is stable.</li>
                            <li><span className="font-semibold text-[#111827]">Clear Cache (if applicable):</span> Try clearing the cache in your app settings for improved performance.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="mb-3 text-xl font-bold leading-snug text-[#1F2937]">Feedback & Suggestions</h2>
                        <PeragraphContent>
                            We value your input. If you have any feedback or suggestions for improving Yepp Ads,
                            feel free to send them to <a href="mailto:support@appname.com" className="font-semibold text-primary hover:underline">support@appname.com</a>.
                            Your suggestions help us enhance your experience.
                        </PeragraphContent>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default HelpSupport;
