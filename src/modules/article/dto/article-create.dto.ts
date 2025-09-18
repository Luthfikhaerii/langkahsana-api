class ArticleContentCreateDto{
    content:string
}

export class ArticleCreateDto{
    title: string
    date: Date 
    description: string
    image: string
    contents: ArticleContentCreateDto[]
}