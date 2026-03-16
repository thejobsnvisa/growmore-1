import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReCAPTCHA from "react-google-recaptcha";

const Checklistgsm = () => {
  const recaptchaRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [dialCode, setDialCode] = useState("91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    location: "",
    age: "",
    qualification: "",
    occupation: "",
    skillsAssessment: "",
    overseasExperience: "",
    australiaExperience: "",
    englishTest: "",
    estimatedPoints: "",
    partnerSkills: "",
    studiedInAustralia: "",
    professionalYear: "",
    regionalWork: "",
    comments: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const captchaValue = recaptchaRef.current.getValue();
    if (!captchaValue) {
      alert("Please verify reCAPTCHA");
      return;
    }

    setLoading(true);

    const formPayload = new FormData();

    Object.keys(formData).forEach((key) => {
      formPayload.append(key, formData[key]);
    });

    formPayload.append("phone", `+${dialCode}${phoneNumber}`);

    try {
      const response = await fetch("/api/gsm", {
        method: "POST",
        body: formPayload,
      });

      const data = await response.json();

      if (data.success) {
        alert("Form submitted successfully!");

        setFormData({
          fullName: "",
          email: "",
          country: "",
          location: "",
          age: "",
          qualification: "",
          occupation: "",
          skillsAssessment: "",
          overseasExperience: "",
          australiaExperience: "",
          englishTest: "",
          estimatedPoints: "",
          partnerSkills: "",
          studiedInAustralia: "",
          professionalYear: "",
          regionalWork: "",
          comments: "",
          resume: null,
        });

        setPhoneNumber("");
        recaptchaRef.current.reset();
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-[#28535B] py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-15">
          <h1 className="text-3xl md:text-5xl font-semibold text-white mb-3">
            GSM Visa Eligibility Assessment Form
          </h1>
        </div>
      </section>

      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto p-8 md:p-10 rounded-2xl shadow-md bg-[#eff9fb]">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="input-style"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="input-style"
                required
              />
            </div>

            {/* Phone */}
            <div className="flex gap-3">
              <div className="w-32">
                <PhoneInput
                  country={"au"}
                  enableSearch
                  value={dialCode}
                  onChange={(value, data) => {
                    setDialCode(data.dialCode);
                  }}
                  inputProps={{ readOnly: true }}
                />
              </div>

              <input
                type="tel"
                placeholder="Contact Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full h-[46px] px-4 rounded-md border"
                required
              />
            </div>

            {/* Country */}
            <input
              type="text"
              name="country"
              placeholder="Country of Residence"
              value={formData.country}
              onChange={handleChange}
              className="input-style"
            />

            {/* Location */}
            <div>
              <p className="label">Are you currently in Australia?</p>
              <div className="flex gap-6 mt-2">
                {["Yes", "No"].map((item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="location"
                      value={item}
                      onChange={handleChange}
                    /> {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Age */}
            <select
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input-style"
            >
              <option value="">Select Age</option>
              <option>18-24</option>
              <option>25-32</option>
              <option>33-39</option>
              <option>40-44</option>
              <option>45+</option>
            </select>

            {/* Qualification */}
            <input
              type="text"
              name="qualification"
              placeholder="Highest Education Qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="input-style"
            />

            {/* Occupation */}
            <input
              type="text"
              name="occupation"
              placeholder="Field of Study / Nominated Occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="input-style"
            />

            {/* Skills Assessment */}
            <div>
              <p className="label">Do you have a valid Skills Assessment?</p>
              <div className="flex gap-6 mt-2">
                {["Yes", "No", "In Process"].map((item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="skillsAssessment"
                      value={item}
                      onChange={handleChange}
                    /> {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Overseas Experience */}
            <div>
              <p className="label">Overseas Experience</p>
              <div className="flex gap-6 mt-2">
                {["0-1", "1-3", "3-5", "5+"].map((item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="overseasExperience"
                      value={item}
                      onChange={handleChange}
                    /> {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Australia Experience */}
            <div>
              <p className="label">Australia Experience</p>
              <div className="flex gap-6 mt-2">
                {["0-1", "1-3", "3-5", "5+"].map((item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="australiaExperience"
                      value={item}
                      onChange={handleChange}
                    /> {item}
                  </label>
                ))}
              </div>
            </div>

            {/* English Test */}
            <div>
              <p className="label">English Test Taken?</p>
              <div className="flex gap-6 mt-2">
                {["Yes", "No"].map((item) => (
                  <label key={item}>
                    <input
                      type="radio"
                      name="englishTest"
                      value={item}
                      onChange={handleChange}
                    /> {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Estimated Points */}
            <input
              type="text"
              name="estimatedPoints"
              placeholder="Estimated Points Score"
              value={formData.estimatedPoints}
              onChange={handleChange}
              className="input-style"
            />

            {/* Resume */}
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              className="input-style"
            />

            {/* Comments */}
            <textarea
              name="comments"
              placeholder="Your Comments"
              value={formData.comments}
              onChange={handleChange}
              className="input-style h-24"
            />

            <ReCAPTCHA
              sitekey="6Lcb_HEsAAAAAJESdQwpfYltspCpspxJPbCyM58Z"
              ref={recaptchaRef}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#6dc7d1] px-8 py-2 text-white rounded-full"
            >
              {loading ? "Submitting..." : "Submit →"}
            </button>

          </form>
        </div>
      </section>
    </div>
  );
};

export default Checklistgsm;