'use client'
import type { ButtonProps } from '@/components/ui/button'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import * as React from 'react'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    aria-label='pagination'
    className={cn('mx-auto flex w-full justify-center', className)}
    role='navigation'
    {...props}
  />
)

const PaginationContent: React.FC<
  { ref?: React.Ref<HTMLUListElement> } & React.HTMLAttributes<HTMLUListElement>
> = ({ className, ref, ...props }) => (
  <ul className={cn('flex flex-row items-center gap-1', className)} ref={ref} {...props} />
)

const PaginationItem: React.FC<
  { ref?: React.Ref<HTMLLIElement> } & React.HTMLAttributes<HTMLLIElement>
> = ({ className, ref, ...props }) => <li className={cn('', className)} ref={ref} {...props} />

type PaginationLinkProps = {
  isActive?: boolean
  url: string
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'button'>

const PaginationLink = ({
  className,
  isActive,
  url,
  size = 'icon',
  ...props
}: PaginationLinkProps) => {
  const router = useRouter()

  return (
    <button
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          size,
          variant: isActive ? 'outline' : 'ghost',
        }),
        className,
      )}
      onClick={() => {
        router.push(url)
      }}
      {...props}
    />
  )
}

const PaginationPrevious = ({
  className,
  url,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const t = useTranslations()

  return (
    <PaginationLink
      aria-label={t('previous-page')}
      className={cn('gap-1 pl-2.5', className)}
      url={url}
      size='default'
      {...props}
    >
      <ChevronLeft className='h-4 w-4' />
      <span>{t('previous')}</span>
    </PaginationLink>
  )
}

const PaginationNext = ({
  className,
  url,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const t = useTranslations()

  return (
    <PaginationLink
      aria-label={t('next-page')}
      className={cn('gap-1 pr-2.5', className)}
      url={url}
      size='default'
      {...props}
    >
      <span>{t('next')}</span>
      <ChevronRight className='h-4 w-4' />
    </PaginationLink>
  )
}

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => {
  const t = useTranslations()

  return (
    <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontal className='h-4 w-4' />
      <span className='sr-only'>{t('more-pages')}</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
