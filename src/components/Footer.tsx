
import React from 'react';

const Footer = () => {
    return (
        <footer className="p-4 text-center text-xs text-gray-500 border-t border-white/10 flex-shrink-0">
            <p>&copy; {new Date().getFullYear()} SaguroDev. All rights reserved. | Made with ❤️ in 🇨🇴</p>
        </footer>
    );
};

export default Footer;
