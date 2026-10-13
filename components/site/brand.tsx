import { cn } from '@/lib/utils'

export function Logo({ className, tone = 'dark' }: { className?: string; tone?: 'dark' | 'light' }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <svg viewBox="0 0 40 36" className="h-7 w-auto shrink-0" aria-hidden="true">
        <path
          d="M20 32.5C13 27 4.5 21.5 4 13.2 3.6 7.6 7.5 4 12 4.2c3.6.2 6.2 2.6 7.9 6 1.6-3.6 4.4-6.2 8.3-6.3 4.7-.1 8.2 3.6 7.8 9-.6 7.6-8 13.4-15.2 19.2"
          fill="none"
          stroke="var(--coral)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M18.6 30.4c-1.4 1.6-1.2 3.2.6 3.9" fill="none" stroke="var(--coral)" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span
        className={cn(
          'font-serif text-2xl font-bold uppercase leading-none tracking-[0.08em]',
          tone === 'dark' ? 'text-carbon' : 'text-white',
        )}
      >
        Ropelato
      </span>
    </span>
  )
}

type IconProps = { className?: string }

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3z" />
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z" />
    </svg>
  )
}

export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6.9 8.8H3.6V20h3.3V8.8zM5.2 3.6a1.9 1.9 0 1 0 0 3.9 1.9 1.9 0 0 0 0-3.9zM20.4 13.6c0-3-1.6-5-4.3-5-1.4 0-2.4.7-2.9 1.5V8.8H10V20h3.3v-5.6c0-1.5.6-2.6 2-2.6s1.8 1 1.8 2.6V20h3.3v-6.4z" />
    </svg>
  )
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.2 21.8l5.1-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3z" />
    </svg>
  )
}

export const socialIcons = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
  LinkedIn: LinkedinIcon,
} as const
