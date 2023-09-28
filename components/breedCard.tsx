"use client"

import { SelectedContext } from "@/app/context"
import galleryStyles from "@/app/gallery.module.css"
import Image from "next/image"
import { useContext, useEffect, useMemo, useState } from "react"
import { Card } from "react-bootstrap"

export default function BreedCard({ breed, subBreeds, checked, handleClick }: { breed: string, subBreeds: string[], checked: boolean, handleClick: (event: React.MouseEvent<HTMLDivElement>) => void }) {
    
    function handleCardClick(event: React.MouseEvent<HTMLDivElement>) {
        subBreeds.length === 0 && handleClick(event)
    }

    return <Card className={`${galleryStyles.breedCard}`} onClick={handleCardClick} data-breed={breed}>
        <DogImage breed={breed} />
        <Card.Body>
            <Card.Title className={galleryStyles.cardTitle} onClick={handleClick} data-breed={breed}>
                <input type="checkbox" checked={checked} readOnly/>
                {breed}
            </Card.Title>
            <SubBreeds breed={breed} subBreeds={subBreeds} />
        </Card.Body>
    </Card>
}

function DogImage({ breed }: { breed: string }) {
    const [breedImages, setBreedImages] = useState<string[]>([])
    const breedImage = useMemo(() => breedImages[0], [breedImages])
    useEffect(() => {
        fetch(`http://localhost:3000/api/${breed}`).then(response => {
            response.json().then(data => {
                setBreedImages(data.message)
            })
        })
    }, [breed])
    if (breedImage) {
        return <Card.Img
            as={Image}
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

function SubBreeds({ breed, subBreeds }: { breed: string, subBreeds: string[] }) {
    if (subBreeds.length > 0) {
        return <ul>
            {subBreeds.map(subBreed => {
                return <SubBreed key={subBreed} breed={breed} subBreed={subBreed} />
            })}
        </ul>
    } else {
        return <></>
    }
}

function SubBreed({ breed, subBreed }: { breed: string, subBreed: string }) {
    const { selected, setSelected } = useContext(SelectedContext)
    const [checked, setChecked] = useState(selected[breed]?.includes(subBreed) ?? false)

    useEffect(() => {
        setChecked(selected[breed]?.includes(subBreed) ?? false)
    }, [selected, breed, subBreed])

    useEffect(() => {
        // console.log("Context re-rendered", selected)
    }, [selected])

    function handleCheckedChange(event: React.ChangeEvent<HTMLInputElement>) {
        setChecked(event.target.checked)
    }

    function handleClick(event: React.MouseEvent<HTMLInputElement>) {
        if (checked) {
            setSelected(prev => {
                console.log("setSelected, new state: ", {
                    ...prev,
                    [breed]: prev[breed].filter(sub => sub !== subBreed)
                })
                return {
                    ...prev,
                    [breed]: prev[breed].filter(sub => sub !== subBreed)
                }
            })
        } else {
            setSelected(prev => {
                console.log("setSelected", prev)
                return {
                    ...prev,
                    [breed]: [...(prev[breed] || []), subBreed]
                }
            })
        }
        console.log("handleClick", selected)
    }
    return <li className={galleryStyles.subBreed}>
        <input type="checkbox" checked={checked} onChange={handleCheckedChange} onClick={handleClick} />
        {subBreed}
    </li>
}