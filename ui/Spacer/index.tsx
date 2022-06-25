import React from "react";
import { styled } from "@stitches/react";

const SpacerStitch = styled('div', {
    width: '100%',
    variants: {
        size: {
          "sm": { height: "10px" },
          "md": { height: "20px" },
          "lg": { height: "60px" }
        }
    }
});

type Props = { size: string } & React.ComponentProps<typeof SpacerStitch>

const Spacer = ({ size }: Props) => {
    return (
        <SpacerStitch size={size} />
    )
}

export default Spacer;