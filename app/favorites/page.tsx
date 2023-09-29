"use client"

import { useContext, useEffect, useMemo, useState } from "react";
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

function FavoriteBreed({ breed, subBreeds }: {
    breed: string,
    subBreeds: string[],
}) {
    if (subBreeds.length > 0) {
        return <Container>
            <h2 className={`${styles.breed}`}>
                <span>{breed}</span>
            </h2>
            {subBreeds.map(subBreed => {
                return <div key={subBreed} className={styles.subBreedBlock}>
                    <BreedImages
                        breed={breed}
                        subBreed={subBreed}
                    />
                </div>
            })}
        </Container>
    } else {
        return <Container>
            <BreedImages
                breed={breed}
            />
        </Container>
    }
}

function BreedImages({ breed, subBreed }: { breed: string, subBreed?: string }) {
    const [showingImageRange, setShowingImageRange] = useState<number[]>([0, 4])
    const [breedImages, setBreedImages] = useState<string[]>([])
    const showingImages = useMemo(() => {
        return breedImages.slice(showingImageRange[0], showingImageRange[1])
    }, [breedImages, showingImageRange])

    useEffect(() => {
        if (subBreed === undefined) {
            fetch(`http://localhost:3000/api/${breed}`).then(response => {
                response.json().then(data => {
                    setBreedImages(data.message)
                })
            })
        } else {
            fetch(`http://localhost:3000/api/${breed}/${subBreed}`).then(response => {
                response.json().then(data => {
                    setBreedImages(data.message)
                })
            })
        }
    }, [breed, subBreed])

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

    const Title = () => {
        if (subBreed) {
            return <h3 className={`${styles.subBreed}`}>
                <span>{subBreed}</span>
                <FiRefreshCcw />
            </h3>
        } else {
            return <h2 className={`${styles.breed}`}>
                <span>{breed}</span>
                <FiRefreshCcw />
            </h2>
        }
    }

    if (showingImages.length === 0) {
        return <p>No images available</p>
    } else {

        return (<>
            <Title />
            < Row className={styles.images} >
                {
                    showingImages.map((image, index) => {
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
            </Row >
        </>)
    }
}