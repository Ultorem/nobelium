import { clientConfig } from '@/lib/server/config'

import Container from '@/components/Container'
import BlogPost from '@/components/BlogPost'
import Pagination from '@/components/Pagination'
import { getAllPosts } from '@/lib/notion'
import { useConfig } from '@/lib/config'

export async function getStaticProps () {
  const posts = await getAllPosts({ includePages: false })
  const postsToShow = posts.slice(0, clientConfig.postsPerPage)
  const totalPosts = posts.length
  const showNext = totalPosts > clientConfig.postsPerPage
  return {
    props: {
      page: 1, // current page is 1
      postsToShow,
      showNext
    },
    revalidate: 1
  }
}

export default function Blog ({ postsToShow, page, showNext }) {
  const { title, description } = useConfig()

  return (
<Container title={title} description={description}>
  <h1 class="w-full font-bold text-3xl text-black dark:text-white max-w-2xl px-4">Fiskja - Utforsk Verdenen av Fisk: Oppskrifter, Jaktutstyr, Helseprodukter og Mer</h1><br></br>
  <div> <img src="https://runescape.wiki/images/Leaping_trout_detail.png?384f6"></img></div><br></br>
  {postsToShow.map(post => (
    <BlogPost key={post.id} post={post} />
  ))}
  {showNext && <Pagination page={page} showNext={showNext} />}
</Container>

  )
}

