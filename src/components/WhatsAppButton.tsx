'use client';

import { Button } from './ui/button';
import { FaWhatsapp } from 'react-icons/fa6';

export default function WhatsAppButton() {
  const phoneNumber = '27754304433'; // South African format
  const message = 'Hi! I\'m interested in your compliance services. Can you help me?';

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-green-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600"
      size="icon"
      aria-label="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="h-7 w-7" />
    </Button>
  );
}
