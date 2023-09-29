import styles from './page.module.css'
import BreedCard from '@/app/breedCard'

export default async function Home() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all")
  // server-side fetching
  const data = await response.json()
  const message = data.message ?? {}
  const breeds = message as { [breed: string]: string[] }

  return (
    <main className={styles.main}>
      <h1 className={styles.center}>Find your favorite breeds!</h1>
      <div className={styles.grid}>
        {Object.entries(breeds).map(([breed, subBreeds]) => {
            return <BreedCard
                key={breed}
                breed={breed}
                subBreeds={subBreeds}
            />
        })}
    </div>
    </main>
  )
}
