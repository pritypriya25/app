const presto = require('@dalongrong/trino-client');

async function getQueryResult (req, res) {
    try{

        let response_data = await presto_query_execute('show catalogs;');

        res.json(response_data)
        
    }
    catch(error){
        console.log(error);
        res.status(400).send({error: error.message});
    }
}

async function presto_query_execute(query) {

    let client = new presto.Client({
        user: 'trino:trino',
        host: '172.20.0.1',
        Hostname: 'trino-coordinator',
        port: 8080,
        // catalog: 'mongo',
        // schema: 'information_schema',
        basic_auth: null
    })

    let queryResult = {
        error : false
    };

    return new Promise((res, rej) => {
        client.execute({
            query:   query,
            // catalog: 'mongo',
            // schema:  'information_schema',
            source:  'nodejs-client',
            info:    false,
            state:   function(error, query_id, stats){
                queryResult["id"] = query_id;
            },
            columns: function(error, data){
                queryResult["columns"] = data 
            },
            data:    function(error, data, columns, stats){ 
                
                queryResult["response"] = data;
                console.log(data);
                res(queryResult);
    
            },
            success: function(error, stats){
            },
            error:   function(error){
                queryResult[error] = error
                rej(queryResult);
            }
        });
    }) 

}

module.exports =  getQueryResult;