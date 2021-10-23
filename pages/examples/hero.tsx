import { Hero, Layout } from '@components'

const HeroPage = (): JSX.Element => {
  return (
    <Layout scrollHeight={100}>
      <Hero
        title="Welcome to this website"
        description="Ipsum esse cupidatat ex magna labore aliquip non aliqua. Minim mollit magna irure deserunt ex irure et ad ad ea culpa ad eu. Labore labore pariatur mollit culpa cupidatat consequat quis amet ut et eiusmod amet ad. Exercitation aute dolore ipsum qui amet aliqua nisi. Id dolore dolore aliquip eiusmod proident nostrud laboris aliqua dolor. Fugiat occaecat incididunt non sunt adipisicing adipisicing amet sit eu mollit aliqua incididunt exercitation exercitation."
        image="https://picsum.photos/seed/picsum/900"
      />
    </Layout>
  )
}

export default HeroPage
