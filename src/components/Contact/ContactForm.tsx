import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { FormInput } from './FormInput';
import { FormTextarea } from './FormTextarea';
import { useContactForm } from './useContactForm';

export function ContactForm() {
  const { formData, errors, isSubmitting, handleSubmit, handleChange, handleCaptchaChange } = useContactForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        id="name"
        label="Nome"
        value={formData.name}
        error={errors.name}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      
      <FormInput
        id="email"
        type="email"
        label="Email"
        value={formData.email}
        error={errors.email}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      
      <FormTextarea
        id="message"
        label="Messaggio"
        value={formData.message}
        error={errors.message}
        onChange={handleChange}
        disabled={isSubmitting}
      />

      <div className="flex justify-center">
        <ReCAPTCHA
          sitekey="6LdA5q8qAAAAAIalLALCL46paJh4y_qDEFbyBX_h"
          onChange={handleCaptchaChange}
          theme="dark"
        />
      </div>
      {errors.captcha && (
        <p className="text-center text-sm text-red-500">{errors.captcha}</p>
      )}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-orange-500 text-black font-semibold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sto inviando' : 'Invia il tuo messaggio'}
      </button>
    </form>
  );
}