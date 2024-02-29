'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

const Carousel = () => {
  const carouselRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const carousel = carouselRef.current
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % carousel.children.length)
    }, 6000) // Adjust the interval as needed (5000 milliseconds = 5 seconds)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <div
      className="carousel carousel-vertical mb-4 h-96 rounded-box md:mx-4 md:mb-0"
      ref={carouselRef}
    >
      <div className="carousel-item h-full">
        <Image
          style={{
            overflowY: 'scroll',
            transform: `translateY(-${currentIndex * 105}%)`,
            transition: 'transform 6s',
          }}
          className="h-full w-full rounded-box object-cover"
          src="https://res.cloudinary.com/dbzorthz8/image/upload/v1708292446/jo-szczepanska-5aiRb5f464A-unsplash_u2nbum.jpg"
          width={500}
          quality={100}
          height={300}
          loading="lazy"
          alt="sticker tags on brown board"
        />
      </div>
      <div className="carousel-item h-full">
        <Image
          style={{
            overflowY: 'scroll',
            transform: `translateY(-${currentIndex * 105}%)`,
            transition: 'transform 6s',
          }}
          className="mt-1 h-full w-full rounded-box object-cover shadow-sm shadow-primary"
          src="https://res.cloudinary.com/dbzorthz8/image/upload/v1708687246/in1_ol7iqb.jpg"
          width={500}
          quality={100}
          height={300}
          loading="lazy"
          alt="in with the new and out with the old"
        />
      </div>
      <div className="carousel-item h-full">
        <Image
          style={{
            overflowY: 'scroll',
            transform: `translateY(-${currentIndex * 100}%)`,
            transition: 'transform 6s',
          }}
          className="mt-1 h-full w-full rounded-box object-cover"
          src="https://res.cloudinary.com/dbzorthz8/image/upload/v1708292465/lukas-blazek-mcSDtbWXUZU-unsplash_phvfdi.jpg"
          width={500}
          quality={100}
          height={300}
          loading="lazy"
          alt="gantt chart on laptop screen"
        />
      </div>
    </div>
  )
}

export default Carousel
