"use client"

import { useContext, useEffect, useState } from "react";
import { SelectedContext } from "../context";
import appStyles from "../page.module.css";
import styles from "./page.module.css"
import Image from "next/image";
import { FiRefreshCcw } from 'react-icons/fi';
import { Col, Container, Row } from "react-bootstrap";

export default function Favorites() {
    const { selected, setSelected } = useContext(SelectedContext)
    return <main className={appStyles.main}>
        <h1 className={appStyles.center}>Your Favorites</h1>
        {Object.entries(selected).map(([breed, subBreeds]) => {
            return <FavoriteBreed key={breed} breed={breed} subBreeds={subBreeds} />
        })}
    </main>
}

interface SubBreedsImages {
    [subBreed: string]: string[]
}

function FavoriteBreed({ breed, subBreeds }: {
    breed: string,
    subBreeds: string[],
}) {
    const [breedImages, setBreedImages] = useState<string[]>([])
    const [subBreedsImages, setSubBreedImages] = useState<SubBreedsImages>({})

    useEffect(() => {
        fetch(`http://localhost:3000/api/${breed}`).then(response => {
            response.json().then(data => {
                setBreedImages(data.message)
            })
        })
    }, [breed])
    const [showingImageRange, setShowingImageRange] = useState<number[]>([0, 4])

    function handleLoadingError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
        const target = event.target as HTMLImageElement
        if (target.dataset.index) {
            const index = parseInt(target.dataset.index)
            console.log("Loading error in favorites page with image", breed, index + showingImageRange[0], "Igoring...")
            setBreedImages(prev => {
                return prev.filter((image, i) => i !== index + showingImageRange[0])
            })
        }
    }

    if (subBreeds.length > 0) {
        return <Container>
            <h2 className={`${styles.breed}`}>
                <span>{breed}</span>
            </h2>
            {subBreeds.map(subBreed => {
                return <h3 className={`${styles.breed}`} key={subBreed}>
                    <span>{subBreed}</span>
                    <FiRefreshCcw />
                </h3>
            })}
        </Container>
    } else {
        return <Container>
            <h2 className={`${styles.breed}`}>
                <span>{breed}</span>
                <FiRefreshCcw />
            </h2>
            <Row>
                <BreedImages
                    images={breedImages.slice(showingImageRange[0], showingImageRange[1])}
                    breed={breed}
                    handleLoadingError={handleLoadingError}
                />
            </Row>
        </Container>
    }
}

function BreedImages({ images, breed, handleLoadingError }: { images: string[], breed: string, handleLoadingError: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void }) {
    return (<>
        {
            images.map((image, index) => {
                return <Col sm={6} lg={3} key={image} className={styles.image}>
                    <Image
                        src={image}
                        alt={`${breed} image`}
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
                        data-index={index}
                        onError={handleLoadingError}
                    />
                </Col>
            })
        }
    </>)
}