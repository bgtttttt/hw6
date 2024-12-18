let inputs = [...document.getElementsByClassName('input')];

async function f(i,val) {
    let pr = await fetch('https://api.nbrb.by/exrates/currencies');
    let a = await pr.json();

    let usd = a[a.map(function(o) { return o.Cur_Abbreviation; }).lastIndexOf("USD")];
    let usd_pr = await fetch(`https://api.nbrb.by/exrates/rates/${usd.Cur_ID}`);
    let usd_byn = (await usd_pr.json()).Cur_OfficialRate;
    
    let eur = a[a.map(function(o) { return o.Cur_Abbreviation; }).lastIndexOf("EUR")];
    let eur_pr = await fetch(`https://api.nbrb.by/exrates/rates/${eur.Cur_ID}`);
    let eur_byn = (await eur_pr.json()).Cur_OfficialRate;
    
    let rub = a[a.map(function(o) { return o.Cur_Abbreviation; }).lastIndexOf("RUB")];
    let rub_pr = await fetch(`https://api.nbrb.by/exrates/rates/${rub.Cur_ID}`);
    let rub_byn = (await rub_pr.json()).Cur_OfficialRate;
    
    //console.log(Math.floor(usd_byn*100)/100)
    //console.log(Math.floor(eur_byn*100)/100)
    //console.log(Math.floor(rub_byn)/100)
    //console.log(Math.floor(usd_byn/eur_byn*100)/100)
    //console.log(Math.floor(eur_byn/usd_byn*100)/100)
    //console.log(Math.floor(eur_byn/rub_byn*100)/100)
    //console.log(Math.floor(rub_byn/eur_byn*100)/100)
    if (i === 0) {
        inputs[1].value = (val / usd_byn).toFixed(3);
        inputs[2].value = (val / eur_byn).toFixed(3);
        inputs[3].value = (val / rub_byn).toFixed(3);
    }
    if (i === 1) {
        inputs[0].value = (val * usd_byn).toFixed(3);
        inputs[2].value = (val * (usd_byn / eur_byn)).toFixed(3);
        inputs[3].value = (val * (usd_byn / rub_byn)).toFixed(3);
    }
    if (i === 2) {
        inputs[0].value = (val * eur_byn).toFixed(3);
        inputs[1].value = (val * (eur_byn / usd_byn)).toFixed(3);
        inputs[3].value = (val * (eur_byn / rub_byn)).toFixed(3);
    }
    if (i === 3) {
        inputs[0].value = (val * rub_byn).toFixed(3);
        inputs[1].value = (val * (rub_byn / usd_byn)).toFixed(3);
        inputs[2].value = (val * (rub_byn / eur_byn)).toFixed(3);
    }
    
}



inputs.forEach((e,i) => {
    e.addEventListener('input', (x) => f(i,e.value))
});