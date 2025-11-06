import React from 'react';

const CookiePolicyPage: React.FC = () => (
    <div className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h1 className="text-4xl font-extrabold font-heading text-primary-dark text-center">Cookie Policy</h1>
            <p className="mt-4 text-lg text-text-main text-center">
                We use cookies to make this website function properly and to improve your experience.
            </p>

            <div className="mt-10 space-y-8 text-text-main">
                <section>
                    <h2 className="text-2xl font-semibold text-primary-dark">Essential cookies</h2>
                    <p className="mt-2">
                        These cookies are necessary for the website to work and cannot be switched off. They support features such as remembering
                        your language choice, keeping forms functional, and maintaining basic security.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-primary-dark">Analytics cookies</h2>
                    <p className="mt-2">
                        We use analytics cookies to understand how visitors use the site so we can improve it. These cookies are only activated if
                        you give your consent.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-primary-dark">Map cookies</h2>
                    <p className="mt-2">
                        When you enable our location map, Google may set cookies to process your data. The map is only loaded after you allow
                        cookies.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-primary-dark">Change or withdraw consent</h2>
                    <p className="mt-2">
                        You can change or withdraw your consent at any time by clicking “Cookie Settings” at the bottom of the page.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-primary-dark">Questions?</h2>
                    <p className="mt-2">
                        For any privacy questions, contact us at{' '}
                        <a href="mailto:post@gipsgjenvinn.no" className="text-accent underline hover:text-green-600">
                            post@gipsgjenvinn.no
                        </a>
                        .
                    </p>
                </section>
            </div>
        </div>
    </div>
);

export default CookiePolicyPage;
