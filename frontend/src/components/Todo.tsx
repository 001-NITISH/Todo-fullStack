interface props{
    title:string,
    description:string;
    done:boolean;
}

export function Todo({title, description, done}:props) {
    return (
        <div className="pb-2">
                <div className="pb-1 flex justify-between">
                    <div className=" pl-2 font-semibold ">
                        {title}
                    </div>
                    <div className="flex">
                        <div className="pr-1">
                            comlete
                        </div>
                        <div className="pl-1">
                            delete
                        </div>
                    </div>
                </div>
                <div className="pt-1">
                {description}
                </div>
          </div>
)
}