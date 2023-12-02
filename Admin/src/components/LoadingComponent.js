import "./loading.css"

export default function LoadingComponent(props) {


    return (
        <div  className={"flex w-full justify-center h-full  "}>
            <div className={"mt-auto mb-auto"}>
                    <div className={"loader"}></div>
            </div>
        </div>
    )


}