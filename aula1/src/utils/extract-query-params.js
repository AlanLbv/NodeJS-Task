//?search=Alan&page=2
//substr(1) => search=Alan&page2
//split('&') => [search=Alan], [page=2]
//reduce() =>

export function extractQueryParams(query){
    return query.substr(1).split('&').reduce((queryparams, param) => {
        const [ key, value ] = param.split('=')
        queryparams[key] = value

        return queryparams
    }, {})
}