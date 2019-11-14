export interface Meme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
}

export interface Data {
    memes: Meme[];
}

export interface Templates {
    success: boolean;
    data: Data;
}

export interface MemeGenerated {
    url: string;
    page_url: string;
}

export interface Response {
    success: boolean;
    data: MemeGenerated;
}