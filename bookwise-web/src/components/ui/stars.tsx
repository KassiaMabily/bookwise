import {Rating} from "react-simple-star-rating";

export function Stars({value = 0}: { value?: number }) {
    return (
        <Rating
            size={20}
            SVGclassName={"inline-block"}
            SVGstorkeWidth={1}
            onClick={function noRefCheck() {
            }}
            readonly
            initialValue={value}
            fillColor={"#8381D9"}
            emptyColor={"#181C2A"}
            SVGstrokeColor={"#8381D9"}
        />
    )
}

export function StarsRate({onClick}: {
    onClick: (value: number, index: number, event?: React.MouseEvent<HTMLSpanElement>) => void
}) {
    return (
        <Rating
            size={20}
            SVGclassName={"inline-block"}
            SVGstorkeWidth={1}
            onClick={onClick}
            fillColor={"#8381D9"}
            emptyColor={"#181C2A"}
            SVGstrokeColor={"#8381D9"}
        />
    )
}