// /users/:id

export function buildRoutePath (path){
    const routeParametersRegex = /:([a-zA-Z]+)/g; //Pega o /:id
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)') //Pego o valor do ID  e substitui

    
    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)
    return pathRegex;    
}