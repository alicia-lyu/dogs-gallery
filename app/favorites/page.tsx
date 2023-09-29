"use client"

import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "../context";
import appStyles from "../page.module.css";
import styles from "./page.module.css"
import Image from "next/image";
import { FiRefreshCcw } from 'react-icons/fi';
import { Container } from "react-bootstrap";

export default function Favorites() {
    const { selected, setSelected } = useContext(SelectedContext)
    return <main className={appStyles.main}>
        <h1 className={appStyles.center}>Your Favorites</h1>
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
    const [showingImageRange, setShowingImageRange] = useState<number[]>([0, 4])

    function handleLoadingError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
    }

    if (subBreeds.length > 0) {

    } else {
        return <div>
            <h2 className={`${styles.breed} ${appStyles.center}`}>
                <span>{breed}</span>
                <FiRefreshCcw />
            </h2>
            <div className={appStyles.grid}>
                {breedImages.slice(showingImageRange[0], showingImageRange[1]).map(image => {
                    return <div className={appStyles.card} key={breed}>
                        <Image
                            src={image}
                            alt={breed}
                            sizes="100vw"
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                            width={100}
                            height={100}
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMTEqsBwAD9QGlWtP07gAAAABJRU5ErkJggg=="
                            placeholder="blur"
                            loading="lazy"
                            onError={handleLoadingError}
                        />
                    </div>
                })}
            </div>
        </div>
    }
}