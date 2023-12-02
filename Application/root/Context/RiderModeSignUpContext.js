import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {ApiUrl} from "../Urls/ApiUrls";

const DriverSignUpData = new Object({
    email: "",
    password: "",
    phoneNo: "",
    city: "",
    name: "",
    vehicleType: "",
    vehicleYear: "",
    vehicleCompany: "",
    licensePlate: "",
    carColor: "",
    NationIdCardNo: "",
    DriversLicense: "",
    DriversLicenseExpiry: "",
    DriversLicenseImg: "",
    selfie: "",
    vehicalRegisterationDocs: "",
    vehicalPicture: "",
    isDriver: true,
})


const RiderModeSignUpContext = createContext({
    setUserData: () => {
    },
    DriverSignUpData: DriverSignUpData,
    addEntry: () => {
    },
    Validator: {},
    ClearForm: () => {
    },

});


export default function RiderModeSignUpContextProvider({children}) {
    const [userDat, setUserDat] = useState(DriverSignUpData);

    const Validator = {

        isCityValid: () => {
            return userDat.city.trim().length > 0
        },
        isNameValid: () => {
            return userDat.name.trim().length > 0
        },
        isEmailValid: () => {
            const emailRegis = "[a-zA-Z0-9.]+[@][a-zA-Z]*[.][a-zA-Z]+";
            return !!userDat.email.match(emailRegis);
        },
        isPasswordValid: () => {
            return userDat.password.trim().length >= 7;
        },
        isPhoneNoValid: () => {
            const PhoneNo = "[\+27][0-9]{10}";
            return !!userDat.phoneNo.match(PhoneNo);
        },
        isVehicleTypeValid: () => {
            return userDat.vehicleType.trim().length > 0;

        },
        isModelValid: () => {
            const vehicle = "[0-9]{4}";
            return !!userDat.vehicleYear.match(vehicle)
        },
        isLicensePlateValid: () => {
            return userDat.licensePlate.trim().length > 0;

        }, isCarColorValid: () => {
            return userDat.carColor.trim().length > 0;

        },
        isValid: (filed) => {
            return filed.trim().length > 0;
        }

    }

    function setData(data) {
        var dataCopy = Object.assign({}, data);
        setUserDat(dataCopy);
    }

    function addEntry(values) {
        var dataCopy = Object.assign({}, userDat);

        for (const [key, value] of Object.entries(values)) {
            dataCopy[key] = value;
        }
        console.log("Data - ",dataCopy)
        setUserDat(dataCopy);

    }

    function getFormData() {
        let data = new FormData();

        Object.keys(userDat).forEach((key) => {
            data.append(key, userDat[key]);
        });
        return data;
    }


    function ClearForm() {
        setUserDat(DriverSignUpData);
    }

    var value = {
        setUserData: setData,
        DriverSignUpData: userDat,
        addEntry: addEntry,
        Validator: Validator,
        ClearForm: ClearForm,
        getFormData: getFormData,
    }


    return (
        <RiderModeSignUpContext.Provider value={value}>
            {children}
        </RiderModeSignUpContext.Provider>

    )

}

export {
    RiderModeSignUpContext
}
