const functions = require('@google-cloud/functions-framework');

functions.http('vehicleEvacuation', async (req, res) => {

    try
    {
        const _plateNumber = req.body.licenseplatenumber;
        const plateNumber = _plateNumber.split('-').join('')
        
        const payload = {
        "getLastGriraForRechev": 
            {
                "misparRechev": plateNumber
            }
        };

        const response = await fetch("https://apimtlvppr.tel-aviv.gov.il/ppr/Grirot/GetLastGriraForRechev", {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": "7699269b2d6a40348a26387744f61f39",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if( !response.ok ) {
            const responseBody = await response.json();
            throw new Error(`${responseBody.error.message}`)
        } else {

            let json = await response.json();

            // console.log("Performed")
            // console.log(json)
            res.send(json);
        }
    }
    catch(ex)
    {
        console.error(ex)
        res.status(500).send(ex.message);

    }
});
