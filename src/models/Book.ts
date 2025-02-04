export interface Book {
    key: string
    author_name?: string[]
    title: string
    edition_count: number
    first_publish_year: number | null
}