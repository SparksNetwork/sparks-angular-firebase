export function GetKeyFromUrl(url: string, tokenIndex: number) {
    let splittedUrl = url.split('/');
    return splittedUrl[splittedUrl.length - tokenIndex];
}