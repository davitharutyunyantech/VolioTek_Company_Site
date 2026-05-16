'use client';

import { useId, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

type InquiryFormMode = 'demo' | 'contact';

type FieldErrors = Record<string, string[] | undefined>;

type InquiryFormProps = {
  mode: InquiryFormMode;
  source: string;
};

const fieldLimits = {
  name: 120,
  email: 180,
  company: 160,
  interest: 500,
  preferredContactTime: 2_000,
  message: 2_000,
} as const;

const inputClassName =
  'mt-2 w-full rounded-lg border border-[#C8DFDF] bg-white px-4 py-3 text-[#071625] outline-none transition focus:border-[#07988D] focus:ring-4 focus:ring-[#18D6BD]/16';

const labelClassName = 'block text-sm font-semibold text-[#071625]';

function firstError(errors: FieldErrors, field: string) {
  return errors[field]?.[0];
}

function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) {
    return null;
  }

  return (
    <p id={id} className="mt-2 pl-1 text-sm font-medium text-red-700">
      {children}
    </p>
  );
}

function CharacterCounter({ current, max }: { current: number; max: number }) {
  return (
    <p className="mt-2 pl-1 text-xs text-gray-500">
      {current}/{max}
    </p>
  );
}

export function InquiryForm({ mode, source }: InquiryFormProps) {
  const formId = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState('');
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copy = useMemo(
    () =>
      mode === 'demo'
        ? {
            title: 'Request a focused demo',
            description:
              'Share the operating context your team wants to evaluate. We will use it to prepare a practical product conversation.',
            submit: 'Request Demo',
            successTitle: 'Demo request sent.',
            successBody: 'Thanks, we will contact you to schedule a demo.',
          }
        : {
            title: 'Send a message',
            description:
              'Use this form for general questions, partnerships, privacy requests, or implementation context.',
            submit: 'Send Message',
            successTitle: 'Message sent.',
            successBody: 'Thanks, we will review your note and route it to the right team.',
          },
    [mode],
  );

  async function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormError('');
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(true);

    const formData = new FormData(form);
    const payload =
      mode === 'demo'
        ? {
            type: 'demo_request',
            name: String(formData.get('name') ?? ''),
            email: String(formData.get('email') ?? ''),
            company: String(formData.get('company') ?? ''),
            role: String(formData.get('role') ?? ''),
            interest: String(formData.get('interest') ?? ''),
            preferredContactTime: String(formData.get('preferredContactTime') ?? ''),
            message: String(formData.get('message') ?? ''),
            source,
            honeypot: String(formData.get('website') ?? ''),
          }
        : {
            type: 'contact',
            name: String(formData.get('name') ?? ''),
            email: String(formData.get('email') ?? ''),
            subject: String(formData.get('subject') ?? ''),
            message: String(formData.get('message') ?? ''),
            source,
            honeypot: String(formData.get('website') ?? ''),
          };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        issues?: FieldErrors;
      };

      if (!response.ok) {
        setErrors(result.issues ?? {});
        setFormError(result.error ?? 'Unable to submit this request.');
        return;
      }

      form.reset();
      setFieldValues({});
      setIsSubmitted(true);
    } catch {
      setFormError('Unable to submit this request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function clearFieldError(field: string) {
    if (!errors[field] && !formError) {
      return;
    }

    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
    setFormError('');
  }

  function handleTextChange(field: string) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFieldValues((currentValues) => ({
        ...currentValues,
        [field]: event.target.value,
      }));
      clearFieldError(field);
    };
  }

  return (
    <form
      onSubmit={submitForm}
      className="rounded-lg border border-[#D7E8E8] bg-white p-5 shadow-xl shadow-[#071625]/8 sm:p-6 lg:p-8"
      noValidate
    >
      <div>
        <h2 className="text-2xl font-semibold text-[#071625]">{copy.title}</h2>
        <p className="mt-3 leading-relaxed text-gray-600">{copy.description}</p>
      </div>

      <div className="mt-6 hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input id={`${formId}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8 grid gap-5">
        <div>
          <label className={labelClassName} htmlFor={`${formId}-name`}>
            Full name
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={fieldLimits.name}
            className={inputClassName}
            aria-describedby={`${formId}-name-error`}
            onChange={handleTextChange('name')}
          />
          <CharacterCounter current={fieldValues.name?.length ?? 0} max={fieldLimits.name} />
          <ErrorText id={`${formId}-name-error`}>{firstError(errors, 'name')}</ErrorText>
        </div>

        <div>
          <label className={labelClassName} htmlFor={`${formId}-email`}>
            {mode === 'demo' ? 'Work email' : 'Email'}
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={fieldLimits.email}
            className={inputClassName}
            aria-describedby={`${formId}-email-error`}
            onChange={handleTextChange('email')}
          />
          <CharacterCounter current={fieldValues.email?.length ?? 0} max={fieldLimits.email} />
          <ErrorText id={`${formId}-email-error`}>{firstError(errors, 'email')}</ErrorText>
        </div>

        {mode === 'demo' ? (
          <>
            <div>
              <label className={labelClassName} htmlFor={`${formId}-company`}>
                Organization name
              </label>
              <input
                id={`${formId}-company`}
                name="company"
                type="text"
                autoComplete="organization"
                placeholder="Example: BrightCare Clinic"
                required
                maxLength={fieldLimits.company}
                className={inputClassName}
                aria-describedby={`${formId}-company-error`}
                onChange={handleTextChange('company')}
              />
              <CharacterCounter current={fieldValues.company?.length ?? 0} max={fieldLimits.company} />
              <ErrorText id={`${formId}-company-error`}>{firstError(errors, 'company')}</ErrorText>
            </div>

            <div>
              <label className={labelClassName} htmlFor={`${formId}-role`}>
                Role
              </label>
              <select
                id={`${formId}-role`}
                name="role"
                required
                className={inputClassName}
                aria-describedby={`${formId}-role-error`}
                defaultValue=""
                onChange={() => clearFieldError('role')}
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="Executive or owner">Executive or owner</option>
                <option value="Operations">Operations</option>
                <option value="Clinical">Clinical</option>
                <option value="Compliance or security">Compliance or security</option>
                <option value="IT or technical">IT or technical</option>
                <option value="Administrative">Administrative</option>
                <option value="Other">Other</option>
              </select>
              <ErrorText id={`${formId}-role-error`}>{firstError(errors, 'role')}</ErrorText>
            </div>

            <div>
              <label className={labelClassName} htmlFor={`${formId}-interest`}>
                What would you like to evaluate?
              </label>
              <textarea
                id={`${formId}-interest`}
                name="interest"
                rows={4}
                required
                maxLength={fieldLimits.interest}
                className={inputClassName}
                aria-describedby={`${formId}-interest-error`}
                onChange={handleTextChange('interest')}
              />
              <CharacterCounter current={fieldValues.interest?.length ?? 0} max={fieldLimits.interest} />
              <ErrorText id={`${formId}-interest-error`}>{firstError(errors, 'interest')}</ErrorText>
            </div>

            <div>
              <label className={labelClassName} htmlFor={`${formId}-preferredContactTime`}>
                Preferred contact time
              </label>
              <input
                id={`${formId}-preferredContactTime`}
                name="preferredContactTime"
                type="text"
                placeholder="Example: weekday mornings, Pacific time"
                maxLength={fieldLimits.preferredContactTime}
                className={inputClassName}
                aria-describedby={`${formId}-preferredContactTime-error`}
                onChange={handleTextChange('preferredContactTime')}
              />
              <CharacterCounter
                current={fieldValues.preferredContactTime?.length ?? 0}
                max={fieldLimits.preferredContactTime}
              />
              <ErrorText id={`${formId}-preferredContactTime-error`}>
                {firstError(errors, 'preferredContactTime')}
              </ErrorText>
            </div>
          </>
        ) : (
          <div>
            <label className={labelClassName} htmlFor={`${formId}-subject`}>
              Subject
            </label>
            <select
              id={`${formId}-subject`}
              name="subject"
              required
              className={inputClassName}
              aria-describedby={`${formId}-subject-error`}
              defaultValue=""
              onChange={() => clearFieldError('subject')}
            >
              <option value="" disabled>
                Select a topic
              </option>
              <option value="General inquiry">General inquiry</option>
              <option value="Partnership">Partnership</option>
              <option value="Support">Support</option>
              <option value="Privacy or legal">Privacy or legal</option>
              <option value="Security review">Security review</option>
              <option value="Other">Other</option>
            </select>
            <ErrorText id={`${formId}-subject-error`}>{firstError(errors, 'subject')}</ErrorText>
          </div>
        )}

        <div>
          <label className={labelClassName} htmlFor={`${formId}-message`}>
            {mode === 'demo' ? 'Additional context' : 'Message'}
          </label>
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            required={mode === 'contact'}
            maxLength={fieldLimits.message}
            className={inputClassName}
            aria-describedby={`${formId}-message-error`}
            onChange={handleTextChange('message')}
          />
          <CharacterCounter current={fieldValues.message?.length ?? 0} max={fieldLimits.message} />
          <ErrorText id={`${formId}-message-error`}>{firstError(errors, 'message')}</ErrorText>
        </div>
      </div>

      {formError ? (
        <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
          {formError}
        </p>
      ) : null}

      {isSubmitted ? (
        <div className="mt-5 rounded-lg border border-[#18D6BD]/30 bg-[#EDFAFA] px-4 py-3 text-[#071625]">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#07988D]" />
            <div>
              <p className="font-semibold">{copy.successTitle}</p>
              <p className="mt-1 text-sm text-gray-600">{copy.successBody}</p>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="premium-button mt-7 inline-flex w-full items-center justify-center rounded-lg bg-[#18D6BD] px-6 py-3.5 font-semibold text-[#071625] shadow-lg shadow-[#18D6BD]/24 transition hover:bg-[#35EAD0] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
        {copy.submit}
        {!isSubmitting ? <ArrowRight className="ml-2 h-5 w-5" /> : null}
      </button>
    </form>
  );
}
