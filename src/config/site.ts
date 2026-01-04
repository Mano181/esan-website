export const siteConfig = {
    name: 'ESAN',
    contact: {
        whatsappNumber: '917200523519', // Format: CountryCode + Number
        whatsappDisplay: '+91 72005 23519',
        address: '123, Electric Market, Main Road, City - 600001',
        email: 'support@esan.com',
    },
    defaultWhatsappMessage: 'Hi, I would like to know more about ESAN products.',
};

/**
 * Generates a WhatsApp link with an optional message.
 * If no message is provided, uses the default message.
 */
export const getWhatsappUrl = (message?: string) => {
    const text = encodeURIComponent(message || siteConfig.defaultWhatsappMessage);
    return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`;
};
