import React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Avatar } from '../../components/Avatar';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SsoButtons } from '../../components/auth/SsoButtons';
import { TextField } from '../../components/auth/TextField';
import { PasswordRules } from '../../components/auth/PasswordRules';
import { useSignInForm, type AuthMode } from '../../hooks/useSignInForm';
import type { AuthUser } from '../../types/auth';
import type { Member } from '../../types/chores';

interface SignInProps {
  invite: {householdName: string;inviter: Member;} | null;
  initialMode?: AuthMode;
  onAuthenticated: (user: AuthUser, mode: AuthMode) => void;
}

export function SignIn({ invite, initialMode = 'signup', onAuthenticated }: SignInProps) {
  const f = useSignInForm(onAuthenticated, initialMode);
  const signup = f.mode === 'signup';

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-10">
      <span className="block font-display text-[30px] font-bold leading-[1.1] tracking-tight text-cocoa">
        Together Living Together
      </span>

      {invite &&
      <div className="mt-6 flex items-center gap-3 rounded-[20px] bg-butter-soft py-3 pl-3 pr-4">
          <Avatar member={invite.inviter} size="lg" />
          <p className="text-[15px] font-semibold leading-snug text-ink">
            <strong className="font-extrabold">{invite.inviter.name}</strong> invited you to join{' '}
            <strong className="font-extrabold">{invite.householdName}</strong>
          </p>
        </div>
      }

      <h1 className="sr-only">{signup ? 'Create your Tolito account' : 'Sign in to Tolito'}</h1>
      <p className="mt-6 text-[15px] font-semibold text-muted">
        {signup ? 'Free for the whole family. Takes a few seconds.' : "Sign in to see what's on today."}
      </p>

      <div className="mt-6">
        <SsoButtons loading={f.loading} onSelect={f.signInWith} />
      </div>

      <div className="my-6 flex items-center gap-3 text-[13px] font-bold text-muted">
        <span className="h-0.5 flex-1 rounded-full bg-line" aria-hidden="true" />
        or use your email
        <span className="h-0.5 flex-1 rounded-full bg-line" aria-hidden="true" />
      </div>

      <form noValidate onSubmit={f.submit} className="flex flex-col gap-4">
        {f.errors.form &&
        <p role="alert" className="rounded-[16px] bg-blush-soft px-4 py-3 text-[14px] font-bold text-danger">
            {f.errors.form}
          </p>
        }

        {signup &&
        <TextField
          id="name"
          label="Your name"
          autoComplete="name"
          placeholder="e.g. Lotte Jansen"
          value={f.name}
          onChange={(e) => f.setName(e.target.value)}
          error={f.errors.name} />

        }

        <TextField
          id="email"
          type="email"
          inputMode="email"
          label="Email"
          autoComplete="email"
          placeholder="you@example.com"
          value={f.email}
          onChange={(e) => f.setEmail(e.target.value)}
          error={f.errors.email} />
        

        <div>
          <TextField
            id="password"
            type={f.showPassword ? 'text' : 'password'}
            label="Password"
            autoComplete={signup ? 'new-password' : 'current-password'}
            placeholder={signup ? 'Create a password' : 'Your password'}
            value={f.password}
            onChange={(e) => f.setPassword(e.target.value)}
            error={f.errors.password}
            trailing={
            <button
              type="button"
              onClick={() => f.setShowPassword((s) => !s)}
              aria-label={f.showPassword ? 'Hide password' : 'Show password'}
              className="mr-1.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted transition-colors duration-150 hover:text-ink">
              
                {f.showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            } />
          
          {signup && <PasswordRules password={f.password} />}
        </div>

        {!signup &&
        <button
          type="button"
          onClick={f.forgotPassword}
          className="-mt-1 self-end text-[14px] font-extrabold text-cocoa hover:underline">
          
            Forgot password?
          </button>
        }

        <PrimaryButton type="submit" loading={f.loading === 'password'} disabled={f.loading !== null} className="mt-2">
          {signup ? 'Create account' : 'Sign in'}
        </PrimaryButton>
      </form>

      <p className="mt-6 text-center text-[15px] font-semibold text-muted">
        {signup ? 'Already have an account?' : 'New to Tolito?'}{' '}
        <button type="button" onClick={f.switchMode} className="font-extrabold text-cocoa hover:underline">
          {signup ? 'Sign in' : 'Create an account'}
        </button>
      </p>

      {signup &&
      <p className="mt-auto pt-8 text-center text-[12px] font-semibold leading-relaxed text-muted">
          By continuing you agree to Tolito's Terms and Privacy Policy.
        </p>
      }
    </div>);

}