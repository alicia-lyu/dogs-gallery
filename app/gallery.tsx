"use client"

import { useContext, useEffect, useMemo, useState } from "react"
import pageStyles from "./page.module.css"
import galleryStyles from "./gallery.module.css"
import { BiSolidDog } from "react-icons/bi"
import Image from "next/image"
import { SelectedContext } from "./context"

export default function Gallery({ breeds }: { breeds: object }) {
    const { selected, setSelected } = useContext(SelectedContext)

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        const target = event.currentTarget as HTMLAnchorElement
        const breed = target.dataset.breed;
        if (breed) {
            if (selected.includes(breed)) {
                setSelected(selected.filter((selectedBreed) => selectedBreed !== breed))
            } else {
                setSelected([...selected, breed])
            }
        }
    }

    return <div className={pageStyles.grid}>
        {Object.entries(breeds).map(([breed, subBreeds]) => {
            return (
                <a key={breed} className={`${pageStyles.card} ${galleryStyles.breedCard}`} data-breed={breed} onClick={handleClick}>
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
        if (display) {
            fetch(`http://localhost:3000/api/${breed}`).then(response => {
                response.json().then(data => {
                    setBreedImages(data.message)
                })
            })
        }
    }, [breed, display])
    if (display && breedImage) {
        return <Image
            src={breedImage} 
            alt={`${breed} image`} 
            sizes="100vw"
            style={{
                width: '100%',
                height: 'auto',
            }}
            width={500}
            height={300}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMTEqsBwAD9QGlWtP07gAAAABJRU5ErkJggg=="
            placeholder="blur"
        />
        // width and height are only placeholders, the image will be resized to fit the container
    } else {
        return <></>
    }
}

function pickRandomImage(images: string[]) {
    return images[Math.floor(Math.random() * images.length)]
}