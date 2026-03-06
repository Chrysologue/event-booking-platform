const basePath = `http://localhost:5500/api`

export async function makeHttpRequest(endpoint, method='GET', data=null) {

    const options = {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    }

    if(data){
        options.body = JSON.stringify(data)
    }

    try{
        const response = await fetch(`${basePath}${endpoint}`, options)
        const result = await response.json()
        if(!response.ok){
            throw new Error(result.error)
        }
        return result
    }
    catch(e){
        throw new Error(e.message)
    }
    
}

