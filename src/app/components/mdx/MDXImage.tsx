'use client'

import React from "react";
import {CldImage} from "next-cloudinary";

type MDXImageType = {
    src: string, alt?: string, width?: number, height?: number,
    className?: string
    style?: React.CSSProperties
}

export function MDXImage(
    {
        src, width, height, className, style = {objectFit: "cover", width: "100%", height: "100%"}
    }: MDXImageType) {
    return (
        <CldImage
            src={src}
            width={width ?? 1000}
            height={height ?? 1000}
            alt={''}
            crop={{
                type: 'fit',
                source: true
            }}
            style={className ? undefined : style}
            className={className}
        />
    );
}