const functions = require('@google-cloud/functions-framework');

functions.http('vehicleEvacuation', async (req, res) => {
    try
    {
        const payload = {
        "getLastGriraForRechev": 
            {
                "misparRechev": 1
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
        let json = await response.json();

        console.log("Performed")
        console.log(json)
        res.send(json);
    }
    catch(ex)
    {
        res.send(`Error: {ex.error}`)
    }
});
