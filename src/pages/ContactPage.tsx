import React, { useState, FormEvent, useCallback, useMemo } from 'react';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { MailIcon } from '../components/icons/MailIcon';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { useTranslation } from '../i18n/context';
import Map from '../components/Map';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const ContactPage: React.FC = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '', honey: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const [captchaError, setCaptchaError] = useState('');

    const siteKey = useMemo(() => process.env.HCAPTCHA_SITE_KEY || '', []);

    const handleHcaptchaVerify = useCallback((token: string) => {
        setCaptchaToken(token);
        setCaptchaError('');
    }, []);

    const handleHcaptchaExpire = useCallback(() => {
        setCaptchaToken(null);
        setCaptchaError(t('contactPage.form.captchaExpired'));
    }, [t]);

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = t('contactPage.form.errors.nameRequired');
        if (!formData.email) {
            newErrors.email = t('contactPage.form.errors.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('contactPage.form.errors.emailInvalid');
        }
        if (!formData.message) newErrors.message = t('contactPage.form.errors.messageRequired');
        if (!captchaToken) newErrors.captcha = t('contactPage.form.errors.captchaRequired');
        return newErrors;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (formData.honey) {
            return;
        }
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0 && captchaToken) {
            setIsSubmitted(true);
            console.log('Form submitted:', { ...formData, captchaToken });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="bg-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-primary-dark">{t('contactPage.title')}</h1>
                    <p className="mt-4 text-xl text-text-main max-w-3xl mx-auto">{t('contactPage.subtitle')}</p>
                </div>
            </div>

            <div className="py-16 sm:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        {/* Contact Form */}
                        <div className="bg-white p-8 rounded-lg shadow-lg transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-xl">
                            {isSubmitted ? (
                                <div className="text-center p-8">
                                    <h2 className="text-2xl font-bold font-heading text-accent">{t('contactPage.form.successTitle')}</h2>
                                    <p className="mt-2 text-text-main">{t('contactPage.form.successMessage')}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-text-main">{t('contactPage.form.nameLabel')}</label>
                                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark ${errors.name ? 'border-red-500' : 'border-gray-300'}`} />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-text-main">{t('contactPage.form.emailLabel')}</label>
                                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark ${errors.email ? 'border-red-500' : 'border-gray-300'}`} />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-text-main">{t('contactPage.form.phoneLabel')}</label>
                                            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark" />
                                        </div>
                                        <div className="hidden">
                                            <label htmlFor="honey">{t('contactPage.form.honeypotLabel')}</label>
                                            <input
                                                type="text"
                                                id="honey"
                                                name="honey"
                                                tabIndex={-1}
                                                autoComplete="off"
                                                value={formData.honey}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-text-main">{t('contactPage.form.messageLabel')}</label>
                                            <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleChange} className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-dark focus:border-primary-dark ${errors.message ? 'border-red-500' : 'border-gray-300'}`}></textarea>
                                            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                        </div>
                                        <div className="flex justify-center">
                                            <HCaptcha
                                                sitekey={siteKey}
                                                onVerify={handleHcaptchaVerify}
                                                onExpire={handleHcaptchaExpire}
                                                className=""
                                            />
                                            {(errors.captcha || captchaError) && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {errors.captcha || captchaError}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <button type="submit" className="w-full bg-accent text-white font-bold py-3 px-6 rounded-md hover:bg-[#14553a] transition-colors duration-300">
                                                {t('contactPage.form.submitButton')}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                        
                        {/* Contact Details & Map */}
                        <div className="space-y-8">
                             <div>
                                <h3 className="font-heading text-2xl font-bold text-primary-dark mb-4">{t('contactPage.details.title')}</h3>
                                <div className="space-y-4 text-lg">
                                    <p className="flex items-center"><MapPinIcon className="h-6 w-6 mr-3 text-primary-dark" /> {t('footer.address')}</p>
                                    <p className="flex items-center"><PhoneIcon className="h-6 w-6 mr-3 text-primary-dark" /> <a href={`tel:+47${t('footer.phone').replace(/\s/g, '')}`} className="hover:text-accent">{t('footer.phone')}</a></p>
                                    <p className="flex items-center"><MailIcon className="h-6 w-6 mr-3 text-primary-dark" /> <a href={`mailto:${t('footer.email')}`} className="hover:text-accent">{t('footer.email')}</a></p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-heading text-2xl font-bold text-primary-dark mb-4">{t('contactPage.details.findUs')}</h3>
                                <p className="text-lg text-text-main mb-4">{t('footer.address')}</p>
                                <div className="rounded-lg shadow-lg overflow-hidden h-96 w-full">
                                    <Map />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactPage;
