import React from "react"

type Props = {
    title: string
    desciption: string
    date: string
    tag: string
    slug: string
}

const SinglePost = (props: Props) => {
    const { title, desciption, date, tag, slug } = props;
    return <div>{title}</div>
};

export default SinglePost;
