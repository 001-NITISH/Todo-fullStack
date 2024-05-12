
export function Button({Label, onClick}:any){
    return<button onClick={onClick} type="button" className="bg-transparent hover text-blue-700 font-semibold hover:text-brown-text py-2 px-4 border border-blue-500 hover:border-transparent rounded">{Label}</button>
}