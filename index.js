const urlExeter = `https://api.coronavirus.data.gov.uk/v2/data?areaType=ltla&areaCode=E07000041&metric=cumCasesBySpecimenDate&metric=cumDeaths28DaysByDeathDate&format=json`
//const urlRDE = `https://api.coronavirus.data.gov.uk/v2/data?areaType=nhsTrust&areaCode=RH8&metric=cumAdmissions&metric=newAdmissions&metric=newAdmissionsRollingSum&format=json`
const urlNightingale=`https://api.coronavirus.data.gov.uk/v2/data?areaType=nhsTrust&areaCode=NRH8&metric=cumAdmissions&metric=newAdmissions&metric=newAdmissionsRollingSum&format=json`
const urlUK= `https://api.coronavirus.data.gov.uk/v2/data?areaType=overview&metric=cumPeopleVaccinatedFirstDoseByVaccinationDate&metric=cumPeopleVaccinatedSecondDoseByVaccinationDate&format=json`

const exeterDate = document.getElementById("exeterDate")
const casesDiv = document.getElementById("cumCases")
const newCasesDiv = document.getElementById("newCases")
const deathsDiv = document.getElementById("cumDeaths")
const newDeathsDiv = document.getElementById("newDeaths")
const nightingaleDate = document.getElementById("nightingaleDate")
const nightingale = document.getElementById("nightingale")
const nightingaleChange = document.getElementById("nightingaleChange")
const ukDate = document.getElementById("ukDate")
const ukFirstVaccine = document.getElementById("ukFirstVaccine")
const ukSecondVaccine = document.getElementById("ukSecondVaccine")


//maybe 1 function, loads of if it exists statements to render data to right place
// default values


///refresh every twenty mins

async function getDataExeter(url) {
    const rawData = await fetch(url)
    const dataJSON = await rawData.json()
    const latestData = dataJSON.body[0]
    const prevData = dataJSON.body[7]
    const date = new Date(latestData.date)
    const cumDeaths = latestData.cumDeaths28DaysByDeathDate
    const cumCases = latestData.cumCasesBySpecimenDate
    const cumDeathsPrev = prevData.cumDeaths28DaysByDeathDate
    const cumCasesPrev = prevData.cumCasesBySpecimenDate
    let newDeaths  = cumDeaths - cumDeathsPrev
    let newCases  = cumCases - cumCasesPrev
    exeterDate.innerText += ` ${date.toDateString()}`
    casesDiv.innerText += `${cumCases} `
    newCasesDiv.innerText += ` ${newCases}`
    deathsDiv.innerText += ` ${cumDeaths}`
    newDeathsDiv.innerText += ` ${newDeaths}`
    return dataJSON
}

async function getDataNightinggale(url) {
    const rawData = await fetch(url)
    const dataJSON = await rawData.json()
    if(dataJSON.body[0]){
    const dateNight = new Date(await dataJSON.body[0].date)
    nightingaleDate.innerHTML = ` ${dateNight.toDateString()}`
    nightingale.innerHTML = await dataJSON.body[0].cumAdmissions
    nightingaleChange.innerHTML = await dataJSON.body[0].cumAdmissions - await dataJSON.body[7].cumAdmissions
    console.log(dataJSON.body[0])
    console.log(dataJSON.body)
    }

}

async function getDataUK(url) {
    const rawData = await fetch(url)
    const dataJSON = await rawData.json()
    if(dataJSON.body[0]){
    const dateUK = new Date(await dataJSON.body[0].date)
    ukDate.innerHTML = ` ${dateUK.toDateString()}`
    ukFirstVaccine.innerHTML = await dataJSON.body[0].cumPeopleVaccinatedFirstDoseByVaccinationDate
    ukSecondVaccine.innerHTML = await dataJSON.body[0].cumPeopleVaccinatedSecondDoseByVaccinationDate
    console.log(dataJSON.body[0])
    }
}

getDataExeter(urlExeter)
getDataNightinggale(urlNightingale)
getDataUK(urlUK)




