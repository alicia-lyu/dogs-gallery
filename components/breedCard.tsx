"use client"
import galleryStyles from "@/app/gallery.module.css"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { BiSolidDog } from "react-icons/bi"

export default function BreedCard({ breed, subBreeds, display }: { breed: string, subBreeds: string[], display: boolean }) {
    return <>
        <h2><BiSolidDog />{breed}</h2>
        <DogImage breed={breed} display={display} />
        {subBreeds && <ul>
            {subBreeds.map((subBreed: string) => {
                return (
                    <li key={subBreed} className={galleryStyles.subBreed}>{subBreed}</li>
                )
            })}
        </ul>}
    </>
}

function DogImage({ breed, display }: { breed: string, display: boolean }) {
    const [breedImages, setBreedImages] = useState<string[]>([])
    const breedImage = useMemo(() => breedImages[0], [breedImages])
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