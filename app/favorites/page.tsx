"use client"

import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "../context";
import styles from "../page.module.css";
import Image from "next/image";

export default function Favorites() {
    const { selected, setSelected } = useContext(SelectedContext)
    return <main className={styles.main}>
        <h1 className={styles.center}>Your Favorites</h1>
        {Object.entries(selected).map(([breed, subBreeds]) => {
            return <FavoriteBreed key={breed} breed={breed} subBreeds={subBreeds} />
        })}
    </main>
}

function FavoriteBreed({ breed, subBreeds }: {
    breed: string,
    subBreeds: string[],
}) {
    const [breedImages, setBreedImages] = useState<string[]>([])
    useEffect(() => {
        fetch(`http://localhost:3000/api/${breed}`).then(response => {
            response.json().then(data => {
                setBreedImages(data.message)
            })
        })
    }, [breed])

    if (subBreeds.length > 0) {

    } else {
        return <div>
            <h2>{breed}</h2>
            <div>
                {breedImages.map(image => {
                    return <Image
                    key={breed}
                    src={image}
                    alt={breed}
                    width={500}
                    height={300}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMTEqsBwAD9QGlWtP07gAAAABJRU5ErkJggg=="
                    placeholder="blur"
                    loading="lazy"
                    />
                })}
            </div>
        </div>
    }
}