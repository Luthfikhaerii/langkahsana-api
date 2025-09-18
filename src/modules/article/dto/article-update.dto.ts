class ArticleContentUpdateDto{
    content:string
}

export class ArticleUpdateDto{
    title: string
    date: Date 
    description: string
    image: string
    contents: ArticleContentUpdateDto[]
}