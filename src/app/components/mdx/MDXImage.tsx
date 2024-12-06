'use client'

import React from "react";
import {CldImage} from "next-cloudinary";

type MDXImageType = {
    src: string, alt?: string, width?: number, height?: number,
    className?: string
    style?: React.CSSProperties
    property?: boolean;
}

export function MDXImage(
    {
        src, width, height, className, style = {objectFit: "cover", width: "100%", height: "auto"},
        ...options
    }: MDXImageType) {
    return (
        <CldImage
            src={src}
            width={width ?? 1000}
            height={height ?? 1000}
            alt={options.alt ?? ''}
            crop={{
                type: 'fit',
                source: true
            }}
            property={'true'}
            style={(style && !className) ? style : undefined}
            className={className}
        />
    );
}