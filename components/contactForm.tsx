"use client";

import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

const ContactForm = ({
  name_pro, mail_pro
}) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleNameChange = (e: any) => {
    setName(e.target.value);
  };

  const handleMailChange = (e: any) => {
    setMail(e.target.value);
  };

  const handlePhoneChange = (e: any) => {
    setPhone(e.target.value);
  };

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handlecontact = () => {
    console.log('Name:', name);
    console.log('Address:', mail);
    console.log('Phone:', phone);
    console.log('Message:', message);
    // Vous pouvez maintenant utiliser les valeurs query et address
  };

  return (
    <div>
      <span className='font-medium'>Contacter {name_pro}</span>
      <div className="m-2">
        
        <div className="flex relative mb-2">
          <Input
            type="text"
            className="rounded-lg border-gray-300"
            placeholder="Entrer votre nom"
            value={name}
            size={25}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex relative  mb-2">
          <Input
            type="text"
            className="rounded-lg border-gray-300"
            placeholder="monadresse@fagar.com"
            value={mail}
            onChange={handleMailChange}
          />
        </div>
        <div className="flex relative  mb-2">
          <Input
            type="text"
            className="rounded-lg border-gray-300"
            placeholder="06 06 06 06 06"
            value={phone}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="flex relative  mb-2">
          <Textarea
            className="rounded-lg border-gray-300"
            placeholder="Laisser un message"
            value={message}
            onChange={handleMessageChange}
          />
        </div>
        <Button className='w-full'>
          Envoyer
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
