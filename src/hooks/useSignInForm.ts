import { useState } from 'react';
import { toast } from 'sonner';
import { demoNewUser } from '../data/households';
import { isValidEmail, nameFromEmail, passwordScore, passwordRules } from '../utils/password';
import type { AuthProvider, AuthUser } from '../types/auth';

export type AuthMode = 'signup' | 'signin';

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
}

const ssoEmails: Record<Exclude<AuthProvider, 'password'>, string> = {
  google: 'lotte.jansen@gmail.com',
  apple: 'lotte.jansen@icloud.com',
  microsoft: 'lotte.jansen@outlook.com'
};

export function useSignInForm(onAuthenticated: (user: AuthUser, mode: AuthMode) => void, initialMode: AuthMode) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState<AuthProvider | null>(null);

  function switchMode() {
    setMode((m) => m === 'signup' ? 'signin' : 'signup');
    setErrors({});
  }

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (mode === 'signup' && !name.trim()) next.name = 'Tell us what to call you.';
    if (!email.trim()) next.email = 'Enter your email address.';else
    if (!isValidEmail(email)) next.email = "That doesn't look like an email address.";
    if (!password) next.password = 'Enter a password.';else
    if (mode === 'signup' && passwordScore(password) < passwordRules.length)
    next.password = 'Your password needs to tick all the boxes below.';
    return next;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading('password');
    window.setTimeout(() => {
      // Prototype: short passwords on sign-in simulate a wrong password
      if (mode === 'signin' && password.length < 8) {
        setLoading(null);
        setErrors({ form: "That email and password don't match. Try again or reset your password." });
        return;
      }
      onAuthenticated(
        { name: mode === 'signup' ? name.trim() : nameFromEmail(email), email: email.trim(), provider: 'password' },
        mode
      );
    }, 800);
  }

  function signInWith(provider: Exclude<AuthProvider, 'password'>) {
    setErrors({});
    setLoading(provider);
    window.setTimeout(() => {
      onAuthenticated({ ...demoNewUser, email: ssoEmails[provider], provider }, mode);
    }, 900);
  }

  function forgotPassword() {
    toast(`We've sent a reset link to ${isValidEmail(email) ? email.trim() : 'your email'}.`);
  }

  return {
    mode,
    switchMode,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    errors,
    loading,
    submit,
    signInWith,
    forgotPassword
  };
}