//const url = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={"date":"date","newCases":"newCasesByPublishDate"}`
//const url = `https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=ltla;areaCode=E07000041&structure={"date":"date","newCases":"newCasesByPublishDate"}`
//const urlCumCasesExeter = `https://api.coronavirus.data.gov.uk/v2/data?areaType=ltla&areaCode=E07000041&metric=cumCasesBySpecimenDate`;
const url = `https://api.coronavirus.data.gov.uk/v2/data?areaType=ltla&areaCode=E07000041&metric=cumCasesBySpecimenDate&metric=cumDeaths28DaysByDeathDate&format=json`
const dateDiv = document.getElementById("date")
const casesDiv = document.getElementById("cumCases")
const newCasesDiv = document.getElementById("newCases")
const deathsDiv = document.getElementById("cumDeaths")
const newDeathsDiv = document.getElementById("newDeaths")


async function getData(url) {
    const rawData = await fetch(url)
    const dataJSON = await rawData.json()
    const latestData = dataJSON.body[0]
    const prevData = dataJSON.body[7]
    console.log(dataJSON.body[0])
    console.log(dataJSON.body[7])
    const date = new Date(latestData.date)
    const cumDeaths = latestData.cumDeaths28DaysByDeathDate
    const cumCases = latestData.cumCasesBySpecimenDate
    const cumDeathsPrev = prevData.cumDeaths28DaysByDeathDate
    const cumCasesPrev = prevData.cumCasesBySpecimenDate
    let newDeaths  = cumDeaths - cumDeathsPrev
    let newCases  = cumCases - cumCasesPrev
    dateDiv.innerText += ` ${date.toDateString()}`

    casesDiv.innerText += `${cumCases} `
    newCasesDiv.innerText += ` ${newCases}`

    deathsDiv.innerText += ` ${cumDeaths}`
    newDeathsDiv.innerText += ` ${newDeaths}`


    
    return dataJSON
}
getData(url)




