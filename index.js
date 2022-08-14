const csv = require('csv-parse');
const fs = require('fs'); 

const result = [];
const parser = csv.parse({
    comment : '#',
    columns : true
})

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
 .pipe(parser)
 .on('data',(data) => {
    if(isHabitablePlanet(data)){
    result.push(data);
 }})
 .on('error', (err)=>{
    console.log(err);
 })
 .on('end', ()=>{
   
    console.log(result.map(planet => {
        return planet['kepler_name'];
    }))
    console.log(`${result.length} habitable planets found!!!`);
 })