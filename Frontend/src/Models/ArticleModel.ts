export interface FaqItem {
    question?: string;
    q?: string;
    answer?: string;
    a?: string;
}

export interface ArticleModel {
    slug: string;
    title: string;
    description?: string;
    excerpt?: string;
    image?: string;
    publishedAt?: string;
    schema?: string | Record<string, any>;
    faq?: string | FaqItem[] | Record<string, any>;
    html: string;
}
