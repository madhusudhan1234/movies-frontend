"use client"

import { Image } from "@mantine/core"
import React, { type CSSProperties, useMemo, useState } from "react"
import type { Media } from "../types"

interface Props {
  image?: Media
  alt?: string
  width?: number
  height?: number
}

const ImageComponent = React.forwardRef<HTMLImageElement, Props>(
  ({ image, alt, ...props }, ref) => {
    const [loaded, setLoaded] = useState(false)

    const imageStyle = useMemo(() => {
      const updatedStyle: CSSProperties = {
        visibility: loaded ? "visible" : "hidden",
      }

      if (!loaded) {
        updatedStyle.height = 0
        updatedStyle.width = "auto"
      }

      return updatedStyle
    }, [loaded])

    if (!image) {
      return (<Image key={"placeholder"}
                     sizes="100vw"
                     {...props}
                     ref={ref}
                     src="https://placehold.co/300x450?text=No+Poster"
                     alt={alt ?? "No Poster"}/>)
    }

    if (!image.responsive.thumb) {
      return (
        <Image key={`${image.id}-original`}
               sizes="100vw"
               {...props}
               ref={ref}
               src={image.url}
               alt={alt ?? image.file_name}/>
      )
    }

    return (
      <>
        <Image key={`${image.id}-thumbnail`}
               data-img="thumbnail"
               sizes="100vw"
               {...props}
               ref={ref}
               src={image.responsive.thumb}
               alt={alt ?? image.file_name}
               style={{
                 display: loaded ? "none" : "block",
               }}/>

        <Image key={`${image.id}-original`}
               data-img="original"
               {...props}
               ref={ref}
               src={image.responsive.large}
               alt={alt ?? image.file_name}
               onLoad={() => {
                 setLoaded(true)
               }}
               style={imageStyle}/>
      </>
    )
  })
ImageComponent.displayName = "ImageComponent"

export default ImageComponent
