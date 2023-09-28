import styles from './page.module.css'
import Gallery from './gallery'

export default async function Home() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all")
  const data = await response.json()
  const breeds = data.message ?? {}
  console.log(breeds)

  return (
    <main className={styles.main}>
      <h1 className={styles.center}>Find your favorite breeds!</h1>
      <Gallery breeds={breeds} />
    </main>
  )
}
