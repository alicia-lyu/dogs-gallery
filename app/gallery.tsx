"use client"

import { useContext } from "react"
import pageStyles from "./page.module.css"
import galleryStyles from "@/app/gallery.module.css"
import { SelectedContext } from "./context"
import BreedCard from "@/components/breedCard"

export default function Gallery({ breeds }: { breeds: { [breed: string]: string[] } }) {
    const { selected, setSelected } = useContext(SelectedContext)

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
        const target = event.currentTarget as HTMLAnchorElement
        const breed = target.dataset.breed;
        if (breed) {
            if (Object.keys(selected).includes(breed)) {
                const { [breed]: _, ...rest } = selected
                setSelected(rest)
            } else {
                setSelected({ ...selected, [breed]: breeds[breed] })
            }
            console.log(selected)
        }
    }

    return <div className={pageStyles.grid}>
        {Object.entries(breeds).map(([breed, subBreeds]) => {
            return <a key={breed} className={`${pageStyles.card} ${galleryStyles.breedCard}`} data-breed={breed} onClick={handleClick}>
                <BreedCard key={breed} breed={breed} subBreeds={subBreeds} display={Object.keys(selected).includes(breed)} />
            </a>
        })}
    </div>
}