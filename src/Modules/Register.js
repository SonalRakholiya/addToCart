import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import "./css/App.css";
import csc from 'country-state-city'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    // const [CountryName, setCountryName] = useState(['India', 'USA', 'UAE', 'Nepal'])
    // const [StateName, setStateName] = useState(['Gujarat', 'Maharashtra', 'Uttar pradesh', 'New Gerccy', 'Sarjaha'])
    // const [CityName, setCityName] = useState(['Surat', 'Ahemdabad', 'Vadodara', 'Mumbai', 'Valsad', 'Navsari'])
    const [CustmerData, setCustmerData] = useState([]);
    const [Hobbies, setHobbies] = useState(
        [{ name: "Reading", value: true },
        { name: "Singing", value: false },
        { name: "Playing", value: false },
        { name: "Swimming", value: false }]
    )
    const [formData, setFormData] = useState({
        id: 0,
        name: "",
        phoneCountry: "",
        phoneCode: "",
        phoneNumber: "",
        Email: "",
        BOD: "",
        age: "",
        password: "",
        cnfrmpassword: "",
        hobbies: "",
        country: "",
        countryCode: "",
        state: "",
        stateCode: "",
        city: "",
        gender: ""
    })
    const [formError, setformError] = useState({})
    const [isError, setIsError] = useState(false)
    // console.log("formData", formData);


    const handleSelectHobbies = e => {
        debugger
        const arr = Hobbies;
        var i = arr.findIndex(x => x.name === e.target.value)
        arr[i]['name'] = e.target.value
        arr[i]['value'] = e.target.checked
        setHobbies([...arr])

    }
    const handleOnChange = e => {
        console.log(e.target.key)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }
    const handleOnCountry = e => {
        console.log(e.target.key)
        csc.getAllCountries()
            .map( item => {
                if (item.name === e.target.value) {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        countryCode: item.isoCode
                    });
                }
            })
        // console.log("formData", formData);

    }
    const handleOnPhoneCode = e => {
        console.log(e.target.key)
        csc.getAllCountries()
            .map(item => {
                if (item.name == e.target.value) {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        phoneCode: item.phonecode
                    });
                }
            })


    }
    // console.log("formData", formData);
    const handleOnState = e => {
        csc.getStatesOfCountry(formData.countryCode)
            .map(item => {
                if (item.name == e.target.value) {
                    setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                        stateCode: item.isoCode
                    });
                }
            })
        // console.log("formData", formData);

    }
    const ValidateData = () => {
        debugger;
        setformError({})
        if (formData.name === "") {
            setIsError(true)
            setformError(...formError, { name: "Please Enter Name" })
        }
        if (formData.phoneCountry === "") {
            setIsError(true)
            setformError(...formError, { name: "Select Phone Country" })

        }
        if (formData.phoneNumber === "") {
            setIsError(true)
            setformError(...formError, { name: "Select Phone number" })

        }
        if (formData.Email === "") {
            setIsError(true)
            setformError(...formError, { name: " Enter Email" })

        }
        if (formData.BOD === "") {
            setIsError(true)
            setformError(...formError, { name: "  Enter Birth of date" })
        }
        if (formData.password === "") {
            setIsError(true)
            setformError(...formError, { name: " Enter Password" })

        }
        if (formData.cnfrmpassword === "") {
            setIsError(true)
            setformError(...formError, { name: " Enter Confirm Password" })

        }
        if (formData.password !== "" && formData.cnfrmpassword !== "" && formData.password !== formData.cnfrmpassword) {
            setIsError(true)
            setformError(...formError, { name: " Password and Confirm Password not match" })

        }
        if (formData.country === "") {
            setIsError(true)
            setformError(...formError, { name: " please Select Country" })
        }
        if (formData.state === "") {
            setIsError(true)
            setformError(...formError, { name: " please Select State" })

        }
        if (formData.city === "") {
            setIsError(true)
            setformError(...formError, { name: " please Select City" })
        }
        if (formData.hobbies === "") {
            setIsError(true)
            setformError(...formError, { name: "  please Select at least hobbies" })
        }

        return isError;
    }
    const getAge = (dateString) => {
        debugger;
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        debugger;
        formData.hobbies = Hobbies && Hobbies.length > 0 ? Hobbies.filter(x => x.value === true).map(i => i.name).join(',') : null

        if (!ValidateData()) {
            const stNewVal = CustmerData;
            const data = {}

            if (formData.id === 0) {
                debugger;
                setFormData({
                    ...formData,
                    ["id"]: Math.random().toString().substr(9, 4)
                });
                localStorage.setItem("id", formData.id);
                localStorage.setItem("name", formData.name);
                localStorage.setItem("phoneCountry", formData.phoneCountry);
                localStorage.setItem("phoneCode", formData.phoneCode);
                localStorage.setItem("phoneNumber", formData.phoneNumber);
                localStorage.setItem("Email", formData.Email);
                localStorage.setItem("BOD", formData.BOD);
                localStorage.setItem("age", getAge(formData.BOD));
                localStorage.setItem("password", formData.password);
                localStorage.setItem("gender", formData.gender);
                localStorage.setItem("state", formData.state);
                localStorage.setItem("stateCode", formData.stateCode);
                localStorage.setItem("country", formData.country);
                localStorage.setItem("countryCode", formData.countryCode);
                localStorage.setItem("city", formData.city);
                localStorage.setItem("hobbies", formData.hobbies);
                // console.log("SelectHobbies", SelectHobbies));

                stNewVal.push(data);
            }
            setCustmerData(stNewVal)
            console.log("CustmerData", CustmerData)
            setFormData({
                id: 0,
                name: "",
                phoneCountry: "India",
                phoneNumber: "",
                Email: "",
                BOD: "",
                age: "",
                password: "",
                cnfrmpassword: "",
                hobbies: "",
                country: "India",
                state: "Gujarat",
                city: "",
                gender: "Female"
            })
            debugger;
            let data1 = Hobbies.map(item => (
                { ...item, value: false }
            ))
            setHobbies(data1);
            setformError([])
            toast.success("Date Save Successfully")

        }
        else {
            e.stopPropagation();
            toast.error(formError.toString())
        }

    }
    return (
        <Container>
            <div className="mainDiv col-md-12">

                <Form onSubmit={handleSubmit}>
                    <div >  <h1 className="text-center">Register</h1></div>
                    <Row>
                        <Col md={6}  >
                            <Form.Control className="txtInput"
                                controlId="name"
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => handleOnChange(e)} >
                            </Form.Control>
                            {isError && !formData.name && <div className="errorMsg">Please Enter UserName</div>}
                        </Col>
                        <Col md={2} sm={2} >
                            <Form.Control as='select' onChange={(e) => handleOnPhoneCode(e)} className="txtInput" as="select" name="phoneCountry" id="phoneCountry" >
                                <option selected>Country</option>
                                {csc.getAllCountries()
                                    .map(item => {
                                        return <option>{item.name}</option>
                                    })
                                }
                            </Form.Control>
                        </Col>
                        <Col md={4} sm={4} >
                            <Form.Control className=" txtInput"
                                controlId="phoneNumber"
                                type="text"
                                placeholder="Enter Phone Number"
                                formField id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={(e) => handleOnChange(e)}
                            ></Form.Control>
                            {isError && !formData.phoneNumber && <div className="errorMsg">Please Enter phoneNumber</div>}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={6} className="mt-1">
                            <Form.Control className="txtInput"
                                controlId="Email"
                                type="text"
                                placeholder="Enter Email"
                                name="Email"
                                value={formData.Email}
                                onChange={(e) => handleOnChange(e)}
                            >
                            </Form.Control>
                            {isError && !formData.Email && <div className="errorMsg">Please Enter Email</div>}
                        </Col>
                        <Col md={6} sm={6} className="mt-1">
                            <Form.Control
                                formate="dd-MM-yyyy"
                                className="txtInput"
                                onChange={(e) => handleOnChange(e)}
                                value={formData.BOD}
                                type="date"
                                name="BOD"
                                controlId="BOD"
                                placeholder="dd-MM-yyyy" />
                            {isError && !formData.BOD && <div className="errorMsg">Please Enter Birth Of date</div>}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={6} className="mt-1">
                            <Form.Control className=" txtInput"
                                controlId="password"
                                type="password"
                                placeholder="Enter Passward"
                                formField id="password"
                                name="password"
                                value={formData.password}
                                onChange={(e) => handleOnChange(e)}
                            ></Form.Control>
                            {isError && !formData.password && <div className="errorMsg">Please Enter password</div>}
                        </Col>
                        <Col md={6} sm={6} className="mt-1" >

                            <Form.Control className=" txtInput" as="select" name="country" key="countryCode"
                                id="country" onChange={(e) => handleOnCountry(e)} >
                                <option selected>Select Country</option>
                                {csc.getAllCountries()
                                    .map(item => {
                                        return <option
                                        >{item.name}</option>
                                    })
                                }
                            </Form.Control>
                            {isError && !formData.country && <div className="errorMsg">Please Select Country</div>}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} sm={6} className="mt-1">
                            <Form.Control className=" txtInput"
                                controlId="cnfrmpassword"
                                type="password"
                                placeholder="Enter Confirm Passward"
                                formField id="cnfrmpassword"
                                name="cnfrmpassword"
                                value={formData.cnfrmpassword}
                                onChange={(e) => handleOnChange(e)}
                            ></Form.Control>
                            {isError && !formData.cnfrmpassword && <div className="errorMsg">Please Enter Confirm Password</div>}    </Col>
                        <Col md={6} sm={6} className="mt-1">
                            <Form.Control
                                className="txtInput "
                                as="select"
                                name="state"
                                id="state"
                                onChange={(e) => handleOnState(e)} >
                                <option selected>Select State</option>
                                {
                                    csc.getStatesOfCountry(formData.countryCode)
                                        .map(item => {
                                            return <option>{item.name}</option>
                                        })
                                }
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2} sm={2} className="mt-1 radioLable"><Form.Label>Gender:</Form.Label>
                            {isError && !formData.gender && <div className="errorMsg">Please Select Gender</div>}
                        </Col>
                        <Col md={4} sm={4} className="mt-1 radioLable">
                            <Form.Check
                                label="Male"
                                checked={formData.gender === "Female"
                                    ? false
                                    : true}
                                onChange={(e) => handleOnChange(e)}
                                type="radio"

                                id="gender"
                                name="gender"
                                value="Male" />
                            <Form.Check
                                label="Female"
                                checked={formData.gender === "Female"
                                    ? true
                                    : false}
                                onChange={(e) => handleOnChange(e)}
                                type="radio"
                                id="gender"
                                name="gender"
                                value="Female" />
                        </Col>
                        <Col md={6} sm={6} className="mt-1">
                            <Form.Control
                                className="txtInput"
                                as="select"
                                name="city"
                                id="city"
                                onChange={(e) => handleOnChange(e)} >
                                <option selected>Select City</option>
                                {csc.getCitiesOfState(formData.countryCode, formData.stateCode)
                                    .map(item => {
                                        return <option>{item.name}</option>
                                    })
                                }
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row >
                        <Col md={3} sm={3} className="mt-1">
                            <Form.Label className="ChkBoxLbl">Hobbies:</Form.Label>
                            {isError && !formData.hobbies && <div className="errorMsg">Please Select Hobbies</div>}
                        </Col>
                        <Col md={9} sm={9} className="mt-1 HobbieChkBox">
                            {
                                Hobbies.map(item => {
                                    return (
                                        <Form.Check
                                            label={item.name}
                                            onChange={(e) => handleSelectHobbies(e)}
                                            className="ChkBoxLbl"
                                            type="checkbox"
                                            id="hobbies"
                                            name="hobbies"
                                            checked={item.value}
                                            value={item.name} />
                                    )
                                })
                            }
                        </Col>
                    </Row>
                    <Row className="mt-1 ">
                        <Col md={12} sm={12} className='lbl'>
                            <Button type="submit" className="btnSubmit"> Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>


    )
}
export default Register
