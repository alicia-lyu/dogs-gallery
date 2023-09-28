"use client"

import { useContext } from "react"
import pageStyles from "./page.module.css"
import { SelectedContext } from "./context"
import BreedCard from "@/components/breedCard"

export default function Gallery({ breeds }: { breeds: { [breed: string]: string[] } }) {
    const { selected, setSelected } = useContext(SelectedContext)

    function handleClick(event: React.MouseEvent<HTMLDivElement>) {
        console.log("handleClick Gallery")
        const target = event.currentTarget as HTMLDivElement
        const breed = target.dataset.breed;
        if (breed) {
            if (Object.keys(selected).includes(breed)) {
                setSelected(prev => {
                    const { [breed]: _, ...rest } = prev
                    return rest
                })
            } else {
                setSelected(prev => {
                    return {
                        ...prev,
                        [breed]: breeds[breed]
                    }
                })
            }
            console.log(selected)
        }
    }

    return <div className={pageStyles.grid}>
        {Object.entries(breeds).map(([breed, subBreeds]) => {
            return <BreedCard
                key={breed}
                breed={breed}
                subBreeds={subBreeds}
                checked={Object.keys(selected).includes(breed)}
                handleClick={handleClick}
            />
        })}
    </div>
}