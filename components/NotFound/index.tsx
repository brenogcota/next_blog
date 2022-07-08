import { styled } from "@stitches/react";
import Spacer from "ui/Spacer";
import Text from "ui/Text";

const Wrapper = styled("section", {
  padding: "$1 $4",
  maxWidth: "max(60vw, 920px)",
  margin: "auto",
  paddingTop: "10vh",

  "@bp1": {
    padding: "$2 $8",
    maxWidth: "max(60vw, 920px)",
    margin: "auto",
    paddingTop: "5vh",
  },
});

const NotFound = () => {
  return (
    <Wrapper>
      <div className="icon icon-generic"></div>
      <Spacer size="sm" />
      <Text as="h2" size="xlg">
        This site can’t be reached
      </Text>
      <Text>
        <strong>localhost</strong> refused to connect.
      </Text>
      <Spacer size="sm" />
      Try:
      <ul>
        <li>Drink a coffee</li>
        <li>Go for a walk with your pet</li>
      </ul>
      <Spacer size="sm" />
      <Text size="sm">ERR_CONNECTION_REFUSED</Text>
    </Wrapper>
  );
};

export default NotFound;
