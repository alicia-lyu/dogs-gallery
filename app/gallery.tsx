"use client"

import { useState } from "react"
import pageStyles from "./page.module.css"
import galleryStyles from "./gallery.module.css"
import { BiSolidDog } from "react-icons/bi"

export default function Gallery({ breeds }: { breeds: object }) {
    const [selected, setSelected] = useState<string[]>([""])
    return <div className={pageStyles.grid}>
        {Object.entries(breeds).map(([breed, subBreeds]) => {
            return (
                <div key={breed} className={pageStyles.card}>
                    <h2><BiSolidDog/>{breed}</h2>
                    <ul>
                        {subBreeds.map((subBreed: string) => {
                            return (
                                <li key={subBreed} className={galleryStyles.subBreed}>{subBreed}</li>
                            )
                        })}
                    </ul>
                </div>
            )
        })}
    </div>
}