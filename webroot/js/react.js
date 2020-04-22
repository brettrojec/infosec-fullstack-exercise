const rootElement = document.getElementById('root');

function Header(props){
    return(
        <h1>{props.value}</h1>
    )
}

function SearchBar(props){
    return(
        <input type="text" placeholder={props.placeholder} required={props.required} />
    )
}

function Submit(props){
    return(
        <input type="submit" value={props.value} />
    )
}


function Region(props){
    //let total=0;
    const subRegions=props.subRegions.map((subRegion) => 
            <SubRegion key={subRegion.name} name={subRegion.name} value={subRegion.value} />
    );
    return(
        <div>
            <ul>
            <strong>{props.name}: {props.total}</strong>
                {subRegions}
            </ul>
        </div>
    )
}

function Country(props){
    return(
        <div class="card p-2 m-2">
            <h3>{props.name}</h3>
            <div class="row">
                <div class="col-6">
                    <img src={props.flag} width="100%"/>
                </div>
                <div class="col-6">
                    <div>population: {props.population}</div>
                    <div>region: {props.region}</div>
                    <div class="indent-1">subregion: {props.subregion}</div>
                    <div>2 letter code: {props.alpha2Code}</div>
                    <div>3 letter code: {props.alpha3Code}</div>
                </div>
            </div>
        </div>
    )
}

function SubRegion(props){
    return(
        <li><span>{props.name}: {props.value}</span></li>
    )
}

class App extends React.Component{
    render(){
        const countries=[
            {
                "flag": "https://restcountries.eu/data/umi.svg",
                "name": "United States Minor Outlying Islands",
                "alpha2Code": "UM",
                "alpha3Code": "UMI",
                "region": "Americas",
                "subregion": "Northern America",
                "population": 300
            },
            {
                "flag": "https://restcountries.eu/data/tza.svg",
                "name": "Tanzania, United Republic of",
                "alpha2Code": "TZ",
                "alpha3Code": "TZA",
                "region": "Africa",
                "subregion": "Eastern Africa",
                "population": 55155000
            },
            {
                "flag": "https://restcountries.eu/data/are.svg",
                "name": "United Arab Emirates",
                "alpha2Code": "AE",
                "alpha3Code": "ARE",
                "region": "Asia",
                "subregion": "Western Asia",
                "population": 9856000
            },
            {
                "flag": "https://restcountries.eu/data/gbr.svg",
                "name": "United Kingdom of Great Britain and Northern Ireland",
                "alpha2Code": "GB",
                "alpha3Code": "GBR",
                "region": "Europe",
                "subregion": "Northern Europe",
                "population": 65110000
            },
            {
                "flag": "https://restcountries.eu/data/usa.svg",
                "name": "United States of America",
                "alpha2Code": "US",
                "alpha3Code": "USA",
                "region": "Americas",
                "subregion": "Northern America",
                "population": 323947000
            },
            {
                "flag": "https://restcountries.eu/data/mex.svg",
                "name": "Mexico",
                "alpha2Code": "MX",
                "alpha3Code": "MEX",
                "region": "Americas",
                "subregion": "Central America",
                "population": 122273473
            }
        ]
        const countries_render = countries.map((country) => 
            <Country key={country.name} {...country} />
        );
        return(
            <div class="container-md">
                <Header value="Country Search (React)" />
                <div>{countries_render}</div>
                <Region name="Americas" total={3} subRegions={[{name:"Northern America", value:2},{name:"Central America",value:1}]} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />, 
    rootElement);