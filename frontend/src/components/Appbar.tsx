
export const Appbar = ({label}:{label:string}) => {
    return <div className="shadow h-14 flex justify-between bg bg-brown-text">
        <div className="flex flex-col justify-center h-full ml-4 text-lg font-bold">
            My Todo App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4 font-semibold text-lg">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-3xl font-bold border-2 rounded-full px-3">
                    {label.length>0?label[0]:'U'}
                </div>
            </div>
        </div>
    </div>
}