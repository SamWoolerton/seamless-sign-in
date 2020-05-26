export default function Logo({ svgProps, pathProps }) {
    return (
        <svg
            width="64"
            height="68"
            viewBox="0 0 64 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...svgProps}
        >
            <path
                d="M64 2H39.7711C28.1561 2 18.7403 10.8764 18.7403 21.8259V44.6667M45.2597 23.3333V46.1762C45.2597 57.1258 35.8462 66 24.2312 66H0"
                stroke="currentColor"
                stroke-width="4"
                {...svgProps}
            />
        </svg>
    )
}
