export default function Card( {price, retailer, link}) {
    return (
        <div className="card card-border bg-base-300 w-75 shadow">
            <div className="card-body">
                <h2 className="card-title">{retailer.charAt(0).toUpperCase() + retailer.slice(1)}</h2>
                <p>Current price: {price}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary"><a className="link link-hover" href={link} target="_blank">Buy Now</a></button>
                </div>
            </div>
        </div>
    )
}