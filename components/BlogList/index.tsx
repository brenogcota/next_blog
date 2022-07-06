import Link from "next/link";
import { useRouter } from "next/router";
import Text from "ui/Text";
import { Post, Posts, Tag } from "./stitches";

const textCustomStyle = {
    '&:hover': {
        color: '$primary'
    }
}

export type Props = {
    posts?: Post[]
}
type Post = {
    data: {
        title: string,
        publishedOn: string,
        tags: string[]
    },
    slug: string,
    preview: string
}

const BlogList = ({ posts }: Props) => {
  const { locale } = useRouter()
  const localePath = locale ?? ''
  
  return (
    <Posts>
        {
            posts?.map(post => {
                
                return (
                    <Post key={post.slug}>
                        <Link href={`${localePath}/blog/${post.slug}`}>
                            <Text 
                                size="lg"
                                css={textCustomStyle}
                            >
                                {post.data.title}
                            </Text>
                        </Link>

                        <Text size="sm">{post.preview}...</Text>

                        {
                            post.data.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)
                        }
                        {' - '} <Text as="span" size="sm">{post.data.publishedOn}</Text>
                    </Post>
                )
            })
        }
        
    </Posts>
  );
}

export default BlogList;