import React, { useState } from "react";
import "./Form.css";
import { BsFillMicFill } from "react-icons/bs";

function Form() {
  const [data, setData] = useState({
    FirstName: "",
    LastName: "",
    State: "",
    District: "",
    Village: "",
    PANNumber: "",
    AadhaarNumber: "",
  });

  if ("webkitSpeechRecognition" in window) {
    console.log("Congratulations");
  } else {
    console.log("Speech recognition is not supported in this browser.");
  }

  const handleVoiceInput = (inputField) => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      inputField.value = transcript;
    };

    recognition.start();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const isFormValid = validateForm(data);

    if (isFormValid) {
      let existingData = JSON.parse(localStorage.getItem("formData")) || [];

      if (!Array.isArray(existingData)) {
        existingData = [];
      }

      existingData.push(data);

      localStorage.setItem("formData", JSON.stringify(existingData));
      console.log("Data submitted:", data);
    }
  }

  const validateForm = (formData) => {
    let isValid = true;

    const namePattern = /^[A-Za-z\s]+$/;
    const statePattern = /^[A-Za-z\s]+$/;
    const districtPattern = /^[A-Za-z\s]+$/;
    const villagePattern = /^[A-Za-z\s]+$/;
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const aadhaarPattern = /^[0-9]{12}$/;

    if (!namePattern.test(formData.FirstName)) {
      isValid = false;
      alert(
        "First Name is not valid. It should contain only letters and spaces."
      );
    }

    if (!namePattern.test(formData.LastName)) {
      isValid = false;
      alert(
        "Last Name is not valid. It should contain only letters and spaces."
      );
    }

    if (!statePattern.test(formData.State)) {
      isValid = false;
      alert("State is not valid. It should contain only letters and spaces.");
    }

    if (!districtPattern.test(formData.District)) {
      isValid = false;
      alert(
        "District is not valid. It should contain only letters and spaces."
      );
    }

    if (!villagePattern.test(formData.Village)) {
      isValid = false;
      alert("Village is not valid. It should contain only letters and spaces.");
    }

    if (!panPattern.test(formData.PANNumber)) {
      isValid = false;
      alert(
        "PAN Number is not valid. It should match the pattern: AAAAA9999A."
      );
    }

    if (!aadhaarPattern.test(formData.AadhaarNumber)) {
      isValid = false;
      alert("Aadhaar Number is not valid. It should be a 12-digit number.");
    }

    return isValid;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <h4>Address details</h4>

        {Object.keys(data).map((fieldName, index) => (
          <div className="form-group" key={index}>
            <div className="input-with-label">
              <label htmlFor={fieldName} className="impressive-label">
                {fieldName}
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  placeholder={`Enter ${fieldName}`}
                  id={fieldName}
                  name={fieldName}
                  value={data[fieldName]}
                  onChange={handleInput}
                  required
                />
                <button
                  className="voice-button"
                  onClick={() =>
                    handleVoiceInput(document.getElementById(fieldName))
                  }
                >
                  <BsFillMicFill />
                </button>
              </div>
            </div>
          </div>
        ))}

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
