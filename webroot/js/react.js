const rootElement = document.getElementById("root");

function Header(props){
    return(
        <h1>{props.value}</h1>
    )
}

function SearchBar(props){
    return(
        <input class="form-control" type="text" placeholder={props.placeholderText} value={props.value} onChange={props.handleInput}
            required={props.required} />
    )
}

function Submit(props){
    return(
        <input class="form-control" type="submit" value={props.value} />
    )
}

function SearchForm(props){
    return(
        <form onSubmit={props.handleSubmit}>
            <div class="mx-1 row">
                <div class="col-md-9">
                    <SearchBar required={props.required} placeholderText={props.placeholderText}
                        handleInput={props.handleInput} value={props.value}/>
                </div>
                <div class="col-md-3"><Submit value={props.submitButtonText} /></div>
            </div>  
        </form>    
    )
}

function Country(props){
    let langStr="";
    for(let i=0;i<props.languages.length;i++){
        let lang=props.languages[i];
        langStr+=lang.nativeName;
        if(lang.nativeName!=lang.name){
            langStr+=" ("+lang.name+")";
        }
        if(i<props.languages.length-1){
            langStr+=", ";
        }
    }
    return(
        <div class="card p-2 m-3 bg-light">
            <h3>{props.name}</h3>
            <div class="row">
                <div class="col-sm">
                    <img src={props.flag} width="100%"/>
                </div>
                <div class="col-sm">
                    <div><strong>population:</strong> {Number(props.population).toLocaleString()}</div>
                    <div><strong>{props.languages.length>1 ? "languages:":"language:"}</strong> {langStr}</div>
                    <div><strong>region:</strong> {props.region}</div>
                    <div class="indent-1"><strong>subregion:</strong> {props.subregion}</div>
                    <div><strong>2 letter code:</strong> {props.alpha2Code}</div>
                    <div><strong>3 letter code:</strong> {props.alpha3Code}</div>
                </div>
            </div>
        </div>
    )
}

function CountryList(props){
    const country_list=props.countries.map((country)=>
        <Country key={country.name} {...country} />
    );
    return country_list;
}

function Region(props){
    const sum_func = (total, current) => total+current[1];
    let total=props.subRegions.reduce(sum_func,0);
    const subRegions=props.subRegions.map((subRegion) => 
        <SubRegion key={subRegion[0]} name={subRegion[0]} value={subRegion[1]} />
    );
    return(
        <div>
            <ul>
            <strong>{props.name}: {total}</strong>
                {subRegions}
            </ul>
        </div>
    )
}

function RegionInfo(props){
    let regionCounts={};
    let header = "Region details";
    switch(props.countries.length){
        case 0:
            header="No results";
            break;
        case 1:
            header+=" (1 country total)";
            break;
        default:
            header+=" ("+props.countries.length+" countries total)";

    }
    for(const country of props.countries){
        if(!regionCounts[country.region]){
            regionCounts[country.region]={};
        }
        if(!regionCounts[country.region][country.subregion]){
            regionCounts[country.region][country.subregion]=0;
        }
        regionCounts[country.region][country.subregion]++;
    }
    let regions=Object.keys(regionCounts).map((region)=>
        <div class="col-sm-3">
            <Region key={region} name={region} subRegions={Object.entries(regionCounts[region])} />
        </div>
    )
    return (
        <div class="card bg-light mb-5 mt-2 p-1">
            <h3><strong>{header}</strong></h3>
            <div class="row">{regions}</div>
        </div>
    )
}

function SubRegion(props){
    return(
        <li><span>{props.name}: {props.value}</span></li>
    )
}

class App extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.state = {searchTerm:"", countries:[]};
    }
    handleInput(event){
        this.setState({searchTerm:event.target.value})
        //this.handleSubmit(event); //this causes the page to send requests as the user types, updating real(ish) time.  It's pretty cool, but as you might expect, causes one or two errors, and a lot more network traffic
    }
    handleSubmit(event){
        const formData = new FormData();
        formData.append("searchTerm",this.state.searchTerm);
        fetch("/api/",{
            method: "POST",
            body: formData
        }).then((response)=> response.json()).then((data)=>{
            this.setState({countries: data.response});
        })
        event.preventDefault();
    }
    render(){
        const formConfig={
            placeholderText: "Enter country name (full or partial), or 2 or 3 letter ISO-3166 code",
            submitButtonText: "Search",
            required: true,
            handleSubmit: this.handleSubmit,
            handleInput: this.handleInput,
            value: this.state.value
        }
        return(
            <div class="container">
                <Header value="Country Search" />
                <SearchForm {...formConfig} />
                <CountryList countries={this.state.countries} />
                <RegionInfo countries={this.state.countries} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />, 
    rootElement);