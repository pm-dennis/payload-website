import type { Metadata } from 'next/types'

import { CardPostData } from '@/components/Card'
import { CollectionArchive } from '@/components/CollectionArchive'
import { Search } from '@/search/Component'
import configPromise from '@payload-config'
import { getTranslations } from 'next-intl/server'
import { getPayload, TypedLocale } from 'payload'
import PageClient from './page.client'

type Args = {
  searchParams: Promise<{
    q: string
  }>
  params: Promise<{
    locale: TypedLocale
  }>
}
export default async function Page({
  searchParams: searchParamsPromise,
  params: paramsPromise,
}: Args) {
  const { q: query } = await searchParamsPromise
  const { locale } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const t = await getTranslations()

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    locale,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return (
    <div className='pt-24 pb-24'>
      <PageClient />
      <div className='container mb-16'>
        <div className='prose dark:prose-invert max-w-none text-center'>
          <h1 className='mb-8 lg:mb-16'>{t('search')}</h1>

          <div className='mx-auto max-w-[50rem]'>
            <Search />
          </div>
        </div>
      </div>

      {posts.totalDocs > 0 ? (
        <CollectionArchive posts={posts.docs as CardPostData[]} />
      ) : (
        <div className='container'>No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Search`,
  }
}
