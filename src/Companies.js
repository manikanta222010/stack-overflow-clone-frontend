import { useState, useEffect } from "react";

// Displays all the vacancies which are available
export function Companies() {

  const [companies, setCompanies] = useState([]);
  const getCompanies = () => {
    fetch("https://backend-stack-overflow-clone.herokuapp.com/companies")
      .then((data) => data.json())
      .then((company) => setCompanies(company));
  };
  useEffect(getCompanies, []);
  return (
    <div className="container">
      {companies.map((company) => (
        <div className="company-row">
          <div><img className="company-logo" src={company.company_logo} alt={company.name} /></div>
          <div>
            <p className="company-name">{company.name}</p>
            <p className="company-location"><i class="fas fa-map-marker-alt"></i> {company.location}</p>
            <p className="company-role">{company.role}</p>
            <p className="company-jd">{company.jd}</p>
            <div className="skills-container">
              {company.skills.map((skill) => (
                <div className="skill">{skill}</div>
              ))}
              <div className="vacancies">{company.vacancies}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
