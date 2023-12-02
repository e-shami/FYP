import React from "react";
import "./loading.css"

export default function TransLoading(props) {



    return <div style={{position: "absolute", width: "50%", opacity: 0.5, top: 0, zIndex: 1}}
                className="flex w-full justify-center h-full bg-white  ">
        <div className={"mt-auto mb-auto"}>
            <div className={"loader"}></div>
        </div>
    </div>

}