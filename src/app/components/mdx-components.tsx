import type {MDXComponents} from "mdx/types";
import Image from "next/image";
import React from "react";

type MDXImageType = {
    type: string, src: string, alt?: string, width?: number, height?: number,
    style?: React.CSSProperties
}

/*https://stackoverflow.com/a/65681762/23506904*/
export function MDXImage({type, src, alt = '', width = 100, height = 100, style}: MDXImageType) {
    const image = require(`../../data/image/${type}/${src}`);
    return <Image src={image.default} alt={alt} width={width} height={height} style={style}/>;
}

/*
 * https://stackoverflow.com/a/78454630/23506904
 * compileMDX 에서 가져오는 과정중 컴포넌트 설정
 * compileMDX({ components: userMDXComponents()})
 * 에서 () 으로 실행구문을 만들어주지 않고 참조형으로 던졌기에 제대로 '실행'되지 않음
 * 즉 일반적으로는 {} 같은 구문으로 정의를 하지만 이처럼 따로 함수로 빼둬서 정의 하는 경우에는 받아들이지 않고 있었음.
 * 그렇다면은 왜 오류가 발생하지 않았는가는 다음과 같은 특성 때문이였다.
 * components?: React.ComponentProps<typeof MDXProvider>['components'];
 * 인수로 받고 있는 components는 React.ComponentProps로 받고 있었기 때문에 컴포넌트의 props를 추출하려고 '시도' 할뿐이지 실행하는게 아니다.
 * 그렇기 때문에 fuction이라는 컴포넌트의 props를 추출하려고 시도하는것일뿐이였기 때문에 안되었었다.
 *
 * https://github.com/hashicorp/next-mdx-remote/blob/main/src/rsc.tsx#L64 을 확인해보자
 * const hydrateFn = Reflect.construct(
 Function,
 keys.concat(`${compiledSource}`)
 )

 const Content: React.ElementType = hydrateFn.apply(hydrateFn, values).default

 * 의 구문으로 새 '컴포넌트를' 생성하는 매개체를 준비하고 그 안에 그대로 넣고 있었기 때문에 fuction의 객체 그대로
 * 컴포넌트가 만들어진거뿐이였다.
 *
 * 즉 함수안에서 함수의 참조객체를 받은것이기 때문에 {} 타입과 달라도 일단은 작동하고 에러를 반환하지 않았던것이다.
 *
 * */
export function userMDXComponents(mdxComponents?: MDXComponents): MDXComponents {
    return {
        ...mdxComponents,
        MDXImage
    };
}