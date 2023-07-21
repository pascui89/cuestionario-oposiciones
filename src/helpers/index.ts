import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

export const generateUniqueKey = (): string => {
    return Math.random().toString(36).substr(2, 9);
}

export const getRandomNumber = (): number => {
    return Math.floor(Math.random() * 86) + 1;
}

export const sendMessageByEmail = (message: string): Promise<EmailJSResponseStatus> => {
    return emailjs.send( 
        import.meta.env.VITE_SERVICE_ID ?? '', 
        import.meta.env.VITE_TEMPLATE_ID ?? '', 
        {
          message: message
        } as Record<string, unknown>,
        import.meta.env.VITE_PUBLIC_KEY ?? ''
      );
}