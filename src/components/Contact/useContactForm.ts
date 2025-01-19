import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
  captchaToken?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  captcha?: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Il nome è obbligatorio';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Inserisci un\'email valida';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Il messaggio è obbligatorio';
    }

    if (!formData.captchaToken) {
      newErrors.captcha = 'Completa il reCAPTCHA';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/private/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Errore nell\'invio del messaggio');
      }
      
      setFormData({ name: '', email: '', message: '' });
      alert('Messaggio inviato con successo!');
      
    } catch (error) {
      alert('Errore nell\'invio del messaggio. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setFormData(prev => ({ ...prev, captchaToken: token || undefined }));
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: undefined }));
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleCaptchaChange,
  };
}