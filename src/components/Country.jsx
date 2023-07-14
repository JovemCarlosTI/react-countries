import Item from "./Item"

export default function Country({children: country = null, onCountryClick = null, isVisited = false}) {
    if (!country) {
        return <div>Impossível renderizar o país</div>
    }

    
    const demographicDensity = country.population / country.area
    const {flag, name, capital, region, population, area, id} = country
    function handleCountryClick() {
        if(onCountryClick) {
            onCountryClick(id)
        }
    }

    const isVisitedClassName = isVisited ? 'bg-green-100' : ''

    return (
        <div className={`border lg:justify-between p-2 m-2 flex flex-row lg:flex-col w-full lg:w-auto h-80 items-center space-x-2 cursor-pointer transition-all ${isVisitedClassName}`} onClick={handleCountryClick}>
            <img className="w-48" src={flag} alt={name}/>
            <ul className="mt-2">
                <li><Item label="Nome:">{name}</Item></li>
                <li><Item label="Capital:">{capital}</Item></li>
                <li><Item label="Região:">{region}</Item></li>
                <li><Item label="População:">{population} hab</Item></li>
                <li><Item label="Área:">{area} km<sup>2</sup></Item></li>
                <li><Item label="Densidade Demográfica:">{demographicDensity.toFixed(2)} hab/km<sup>2</sup></Item></li>
            </ul>
        </div>
    )
}