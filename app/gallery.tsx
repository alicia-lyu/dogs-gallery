"use client"

import { useEffect, useMemo, useState } from "react"
import pageStyles from "./page.module.css"
import galleryStyles from "./gallery.module.css"
import { BiSolidDog } from "react-icons/bi"
import Image from "next/image"

export default function Gallery({ breeds }: { breeds: object }) {
    const [selected, setSelected] = useState<string[]>([""])
    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        const target = event.currentTarget as HTMLAnchorElement
        const breed = target.dataset.breed;
        breed && setSelected(previous => [...previous, breed])
    }
    return <div className={pageStyles.grid}>
        {Object.entries(breeds).map(([breed, subBreeds]) => {
            return (
                <a key={breed} className={`${pageStyles.card} ${galleryStyles.breed}`} data-breed={breed} onClick={handleClick}>
                    <h2><BiSolidDog />{breed}</h2>
                    <DogImage breed={breed} display={selected.includes(breed)} />
                    {subBreeds && <ul>
                        {subBreeds.map((subBreed: string) => {
                            return (
                                <li key={subBreed} className={galleryStyles.subBreed}>{subBreed}</li>
                            )
                        })}
                    </ul>}
                </a>
            )
        })}
    </div>
}

function DogImage({ breed, display }: { breed: string, display: boolean }) {
    const [breedImages, setBreedImages] = useState<string[]>([])
    const breedImage = useMemo(() => pickRandomImage(breedImages), [breedImages])
    useEffect(() => {
        fetch(`http://localhost:3000/api/${breed}`).then(response => {
            response.json().then(data => {
                setBreedImages(data.message)
            })
        })
    }, [breed, display])
    return display && <Image src={breedImage} alt={`${breed} image`} sizes="100vw"
        style={{
            width: '100%',
            height: 'auto',
        }}
        width={500}
        height={300} />
}

function pickRandomImage(images: string[]) {
    return images[Math.floor(Math.random() * images.length)]
}