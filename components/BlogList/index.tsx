import Link from "next/link";
import Text from "ui/Text";
import { Post, Posts, Tag } from "./stitches";

const textCustomStyle = {
    '&:hover': {
        color: '$primary'
    }
}

type Props = {
    posts?: string[]
}

const BlogList = ({ posts }: Props) => {
  
  return (
    <Posts>
        {
            posts?.map(post => (
                <Post key={post}>
                    <Link href="/blog/the-css-grid-minmax-function-explained">
                        <Text 
                            size="lg"
                            css={textCustomStyle}
                        >
                            The CSS grid minmax() function explained
                        </Text>
                    </Link>
                    <Tag>CSS</Tag>
                </Post>
            ))
        }
        
    </Posts>
  );
}

export default BlogList;