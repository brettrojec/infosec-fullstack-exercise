const rootElement = document.getElementById('root');

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
                <div class="col-9">
                    <SearchBar required={props.required} placeholderText={props.placeholderText}
                        handleInput={props.handleInput} value={props.value}/>
                </div>
                <div class="col-3"><Submit value={props.submitButtonText} /></div>
            </div>  
        </form>    
    )
}

function Country(props){
    return(
        <div class="card p-2 m-3">
            <h3>{props.name}</h3>
            <div class="row">
                <div class="col-6">
                    <img src={props.flag} width="100%"/>
                </div>
                <div class="col-6">
                    <div><strong>population:</strong> {Number(props.population).toLocaleString()}</div>
                    <div><strong>region:</strong> {props.region}</div>
                    <div class="indent-1"><strong>subregion:</strong> {props.subregion}</div>
                    <div><strong>2 letter code</strong> {props.alpha2Code}</div>
                    <div><strong>3 letter code</strong> {props.alpha3Code}</div>
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
        this.state = {searchTerm:'', countries:[]};
    }
    handleInput(event){
        this.setState({searchTerm:event.target.value})
        this.handleSubmit(event);
    }
    handleSubmit(event){
        const formData = new FormData();
        formData.append('searchTerm',this.state.searchTerm);
        fetch('/api/',{
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
        let regionCounts={};
        this.state.countries.forEach((country)=> {
            if(!regionCounts[country.region]){
                regionCounts[country.region]={};
            }
            if(!regionCounts[country.region][country.subregion]){
                regionCounts[country.region][country.subregion]=0;
            }
            regionCounts[country.region][country.subregion]++;
        }
        );
        return(
            <div class="container">
                <Header value="Country Search" />
                <SearchForm {...formConfig} />
                <CountryList countries={this.state.countries} />
                <div class="card bg-light mb-5 p-1">
                    <h3><strong>Region totals</strong></h3>
                    <Region name="Americas" total={3} subRegions={[{name:"Northern America", value:2},{name:"Central America",value:1}]} />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />, 
    rootElement);