// users/:id
// \?id=([^&]+)
// \?id=([^&]+)

export function buildPath(url) {
    const regexUrl = new RegExp (/\?\id=([^\/]+)(\/([a-z_]+))?/)
    return url.match(regexUrl)
}

//REGEX VAI TER Q INTERAGIR COM A URL